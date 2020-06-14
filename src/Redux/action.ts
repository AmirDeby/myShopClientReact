import axios from 'axios';
import { Dispatch } from 'react';
import { IAction, ActionType } from './reducer';

export const getProductsAction = () => {
    return async (dispatch: Dispatch<IAction>) => {
        const token = localStorage.getItem('token');
        const result = await axios.get('http://localhost:5000/products',
            { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: ActionType.GetProducts,
            payload: result.data
        })
    }
}

export const loginAction = (email: string, password: string) => {
    return async (dispatch: Dispatch<IAction>) => {
        try {
            const response = await axios.post('http://localhost:5000/users/login',
                { email, password });
            const token = response.data;
            localStorage.setItem('token', token);
            dispatch({
                type: ActionType.LoginSuccess,
                payload: token
            })
        }
        catch (e) {
            dispatch({
                type: ActionType.LoginFail,
                payload: e.message
            })
        }
    }
}

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

export const resetErrorMessageAction = () => {
    return {
        type: ActionType.ResetErrorMessage,
        payload: {}
    }
}

