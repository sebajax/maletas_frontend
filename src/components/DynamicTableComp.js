import React, { Fragment } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import TableActionsComp from '../components/TableActionsComp';

const DynamicTableComp = (props) => {
    const theme = useSelector(state => state.ThemeReducer);

    const renderTd = (_id, tdMap) => {
        let render = [];
        let tableActions = {
            "_id": _id,
            "update": false, 
            "delete": false,
            "emptyPass": false
        };
        for(let[key, val] of Object.entries(tdMap)) {
            if(key !== '_id') {
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
                        render.push(<td key={`td_${_id}_${key}`}>{val}</td>);
                }
            }
        };
        render.push(<TableActionsComp key={`table_action_comp_${_id}`} tableActions={tableActions} />);
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
                            let _id = tdMap._id;
                            return (
                                <tr key={_id}>
                                    {renderTd(_id, tdMap)}
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