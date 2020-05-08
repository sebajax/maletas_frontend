import { SET_VALIDATE_MESSAGE } from '../types/HeaderTypes';

const HeaderReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_VALIDATE_MESSAGE: 
            return action.payload;
        default: 
            return state;
    }
};

export default HeaderReducer;