import React, { Fragment } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import TableActionsComp from '../components/TableActionsComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from '../components/ErrorMessage';
import { useForm } from "react-hook-form";

const DynamicTableComp = props => {
    
    const theme = useSelector(state => state.ThemeReducer);
    
    const { register, handleSubmit, errors } = useForm({
        mode: 'onChange',
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();
        props.onUpdate(data, props.editId);
    };

    const renderTd = (id, tdMap) => {
        let render = [];
        let elements = 0;
        let tableActions = {
            "id": id,
            "update": false, 
            "delete": false,
            "emptyPass": false
        };
       
        for(let[key, val] of Object.entries(tdMap)) {
            if(key !== 'id') {
                if(id === props.editId) {
                    if(!tableActions.hasOwnProperty(key)) {
                        render.push(
                            <td key={`td_${id}_${key}`}>
                                <Form.Control 
                                    name={key}
                                    type="text"
                                    defaultValue={val}
                                    ref={register({ required: true })} 
                                />
                                {errors[key] && <ErrorMessage message={`${key} no puede ser vacio`} />}
                            </td>
                        );
                        elements--;
                    }
                }else {
                    switch(key) {
                        case "update":
                            tableActions.update = true;
                            break;
                        case "delete":
                            tableActions.delete = true;
                            break;
                        case "emptyPass": 
                            tableActions.emptyPass = true;
                            break;
                        default:
                            render.push(<td key={`td_${id}_${key}`}>{val}</td>);
                    }
                }
            }
            elements++;
        };

        if(id === props.editId) {
            render.push(
                <td colSpan={elements} key={`td_update_${id}`}>
                    <Button variant={theme.style.btnCancel} onClick={ () => props.updateCancel()}>
                        <FontAwesomeIcon icon={faWindowClose} size="lg" />
                    </Button>
                    {' '}
                    <Button variant={theme.style.btnSuccess} type="submit">
                        <FontAwesomeIcon icon={faCheckCircle} size="lg" />
                    </Button>
                </td>
            );
        }else {
            render.push(
                <TableActionsComp 
                    key={`table_action_comp_${id}`} 
                    tableActions={tableActions} 
                    handleDelete={props.handleDelete} 
                    handleUpdate={props.handleUpdate} 
                    handleEmptyPass={props.handleEmptyPass}                 
                />
            );
        }
        return render;
    };

    return (
        <Fragment>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Table striped responsive borderless className={theme.style.tableColor}>
                    <thead className={theme.style.tableHead}>
                        <tr>
                            {(props.thead) ? props.thead.map((val) => {
                                return <th key={`thead_${val}`}> {val} </th>
                            }) : null}
                        </tr>
                    </thead>
                    <tbody>
                        {(props.tbody) ? 
                            props.tbody.map(tdMap => {
                                let id = tdMap.id;
                                return (
                                    <tr key={id}>
                                        {renderTd(id, tdMap)}
                                    </tr>
                                )
                            })
                        : null }
                    </tbody>                
                </Table>
            </Form>
        </Fragment>
    );
}

export default DynamicTableComp;