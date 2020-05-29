import { SET_PERMISOS } from '../types/PermisosTypes';

const PermisosReducer = (state = null, action) => {
    switch(action.type) {
        case SET_PERMISOS:
            return state = action.payload;
        default:
            return state;
    };
};

export default PermisosReducer;