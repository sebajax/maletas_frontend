import { SET_PERMISOS } from '../types/PermisosTypes';

export const setPermisosReducer = permisos => {
    return {
        type: SET_PERMISOS,
        payload: permisos
    };
};