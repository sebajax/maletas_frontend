import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUnlock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const TableActionsComp = props => {

    const theme = useSelector(state => state.ThemeReducer);

    return (
        <Fragment>
            {(props.tableActions.delete) &&
                <td key={`td_delete_${props.tableActions._id}`}>
                    <Button variant={theme.style.btnCancel}>
                        <FontAwesomeIcon icon={faTrash} size="lg" />
                    </Button>
                </td>
            }
            {(props.tableActions.update) &&
                <td key={`td_update_${props.tableActions._id}`}>
                    <Button variant={theme.style.btnSuccess}>
                        <FontAwesomeIcon icon={faSave} size="lg" />
                    </Button>
                </td>
            }
            {(props.tableActions.emptyPass) &&                   
                <td key={`td_emptyPass_${props.tableActions._id}`}>
                    <Button variant={theme.style.btnSuccess}>
                        <FontAwesomeIcon icon={faUnlock} size="lg" />
                    </Button>
                </td>
            }
        </Fragment>
    );
};

export default TableActionsComp;