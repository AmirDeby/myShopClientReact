import axios from 'axios';
import { Dispatch } from 'react';
import { IAction, ActionType } from './reducer';

export const sendCreditCardDetailsAction = (cardName: string, cardNumber: string, cvv: string, expDate: string) => {
    return async (disptach: Dispatch<IAction>) => {
        const token = localStorage.getItem('token')
        const result = await axios.post('http://localhost:5000/creditcard/', { cardName, cardNumber, cvv, expDate },
            { headers: { Authorization: `Bearer ${token}` } });
        console.log(result);
    }
}
export const searchProductAction = (keyword: string) => {
    return async (dispatch: Dispatch<IAction>) => {
        try {
            const token = localStorage.getItem('token');
            const result = await axios.post('http://localhost:5000/products/search', { keyword },
                { headers: { Authorization: `Bearer ${token}` } });
            dispatch({
                type: ActionType.SearchItem,
                payload: { products: result.data },
            })
        }
        catch (e) {
            dispatch({
                type: ActionType.SearchItemFail,
                payload: { msg: e.message },
            })
        }
    }
}

export const getUserCartAction = () => {
    return async (dispatch: Dispatch<IAction>) => {
        const token = localStorage.getItem('token');
        const result = await axios.get('http://localhost:5000/cart',
            { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: ActionType.GetUserCart,
            payload: { userCart: result.data }
        })
    }
}

export const deleteItemFromCartAction = (id: number) => {
    return async (dispatch: Dispatch<IAction>) => {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/cart/${id}`,
            { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: ActionType.DeleteItemFromCart,
            payload: { id }
        })
    }
}
export const insertItemToCartAction = (id: number, quantity: number) => {
    return async (dispatch: Dispatch<IAction>) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5000/cart/${id}`, { quantity },
                { headers: { Authorization: `Bearer ${token}` } });
            dispatch({
                type: ActionType.InsertItemToCart,
                payload: { id, quantity }
            })
        }
        catch (e) {
            dispatch({
                type: ActionType.InsertItemError,
                payload: { msg: e.message }
            })
        }
    }
}

export const getProductsAction = () => {
    return async (dispatch: Dispatch<IAction>) => {
        const token = localStorage.getItem('token');
        const { data: products } = await axios.get('http://localhost:5000/products',
            { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: ActionType.GetProducts,
            payload: { products }
        })
    }
}

export const loginAction = (email: string, password: string) => {
    return async (dispatch: Dispatch<IAction>) => {
        try {
            const response = await axios.post('http://localhost:5000/users/login',
                { email, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            dispatch({
                type: ActionType.LoginSuccess,
                payload: token
            })
        }
        catch (e) {
            dispatch({
                type: ActionType.LoginFail,
                payload: { msg: e.message }
            })
        }
    }
}

export const registerAction = (firstName: string, lastName: string, email: string, password: string) => {
    return async (dispatch: Dispatch<IAction>) => {
        try {
            const { data: { token } } = await axios.post('http://localhost:5000/users/register',
                { firstName, lastName, email, password });
            localStorage.setItem('token', token)
            dispatch({
                type: ActionType.RegisterSuccess,
                payload: token
            })
        }
        catch (e) {
            dispatch({
                type: ActionType.RegisterFail,
                payload: { msg: e.message }
            })
        }
    }
}
export const logOffAction = () => {
    localStorage.removeItem('token');
    return {
        type: ActionType.LogOff,
        payload: {}
    }
}
export const resetErrorMessageAction = () => {
    return {
        type: ActionType.ResetErrorMessage,
        payload: {}
    }
}

