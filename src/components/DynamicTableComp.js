import React, { Fragment } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import TableActionsComp from '../components/TableActionsComp';

const DynamicTableComp = (props) => {
    
    const theme = useSelector(state => state.ThemeReducer);

    const renderTd = (id, tdMap) => {
        let render = [];
        let tableActions = {
            "id": id,
            "update": false, 
            "delete": false,
            "emptyPass": false
        };
        for(let[key, val] of Object.entries(tdMap)) {
            if(key !== 'id') {
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
        };
        render.push(
            <TableActionsComp 
                key={`table_action_comp_${id}`} 
                tableActions={tableActions} 
                handleDelete={props.handleDelete} 
                handleUpdate={props.handleUpdate} 
                handleEmptyPass={props.handleEmptyPass}                 
            />
        );
        return render;
    };

    return (
        <Fragment>
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
        </Fragment>
    );
}

export default DynamicTableComp;