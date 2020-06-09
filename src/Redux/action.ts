import axios from 'axios';
import { Dispatch } from 'react';
import { IAction, ActionType } from './reducer';

export const registerAction = (firstName: string, lastName: string, email: string, password: string) => {
    return async (dispatch: Dispatch<IAction>) => {
        try {
            const response = await axios.post('http://localhost:5000/users/register',
                { firstName, lastName, email, password });
            const token = response.data;
            localStorage.setItem('token', token)
            dispatch({
                type: ActionType.RegisterSuccess,
                payload: token
            })
        }
        catch (e) {
            dispatch({
                type: ActionType.RegisterFail,
                payload: e.message
            })
        }
    }
}

