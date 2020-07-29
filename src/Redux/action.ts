import axios from 'axios';
import { Dispatch } from 'react';
import { IAction, ActionType } from './reducer';

export const addProdcutAction = (inventory: number, categoryId: number, description: string, image: string, name: string, originalPrice: number, salePrice: number) => {
    return async (dispatch: Dispatch<IAction>) => {
        try {
            const token = localStorage.getItem('token');
            const result = await axios.post('http://localhost:5000/products/add',
                { inventory, name, description, image, originalPrice, salePrice, categoryId },
                { headers: { Authorization: `Bearer ${token}` } });
            const { product } = result.data;
            dispatch({
                type: ActionType.AddProdcut,
                payload: product
            })
        }
        catch (e) {
            console.log(e);
        }
    }
}
export const getUserAction = () => {
    return async (dispatch: Dispatch<IAction>) => {
        const token = localStorage.getItem('token');
        const result = await axios.get('http://localhost:5000/users/me',
            { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: ActionType.LoginSuccess,
            payload: { user: result.data }
        })
    }
}
export const getPDFAction = (id: number) => {
    return async (dispatch: Dispatch<IAction>) => {
        const token = localStorage.getItem('token');
        const req = new Request(`http://localhost:5000/orders/${id}/pdf`, {
            method: 'GET',
            headers: new Headers({
                Authorization: `Bearer ${token}`
            }),
        });
        fetch(req).then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `invoice-${id}.pdf`;
                document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                a.click();
                a.remove();  //afterwards we remove the element again         
            });
        dispatch({
            type: ActionType.GetPdfFile,
            payload: {}
        });
    }
}
export const getUserOrderItemsAction = (id: number) => {
    return async (dispatch: Dispatch<IAction>) => {
        const token = localStorage.getItem('token');
        const result = await axios.get(`http://localhost:5000/orders/${id}`,
            { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: ActionType.GetUserOrders,
            payload: { userOrders: result.data }
        })
    }
}
export const getOrdersAction = () => {
    return async (dispatch: Dispatch<IAction>) => {
        const token = localStorage.getItem('token');
        const result = await axios.get('http://localhost:5000/orders/me', { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: ActionType.GetOrders,
            payload: { orders: result.data }
        })
    }
}
export const sendCreditCardDetailsAction = (cardName: string, cardNumber: string, cvv: string, expDate: string) => {
    return async (disptach: Dispatch<IAction>) => {
        const token = localStorage.getItem('token')
        await axios.post('http://localhost:5000/orders/', { cardName, cardNumber, cvv, expDate },
            { headers: { Authorization: `Bearer ${token}` } });
        disptach({
            type: ActionType.SendCreditCardDetails,
            payload: {}
        })
    }
}
export const searchProductAction = (keyword: string) => {
    return async (dispatch: Dispatch<IAction>) => {
        dispatch({
            type: ActionType.SearchIteamPending,
            payload: {}
        })
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
export const deleteProductAction = (id: number) => {
    return async (dispatch: Dispatch<IAction>) => {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/products/${id}`,
            { headers: { Authorization: `Bearer ${token}` } });
        dispatch({
            type: ActionType.DeleteProduct,
            payload: { id }
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
        dispatch({
            type: ActionType.GetProductsPending,
            payload: {}
        })
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
        dispatch({
            type: ActionType.LoginPending,
            payload: {}
        })
        try {
            const response = await axios.post('http://localhost:5000/users/login',
                { email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            dispatch({
                type: ActionType.LoginSuccess,
                payload: { token, user }
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
            const response = await axios.post('http://localhost:5000/users/register',
                { firstName, lastName, email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            console.log(user);
            dispatch({
                type: ActionType.RegisterSuccess,
                payload: { token, user }
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
export const openModalAction = () => {
    return {
        type: ActionType.OpenModal,
        payload: {}
    }
}
export const CloseModalAction = () => {
    return {
        type: ActionType.CloseModal,
        payload: {}
    }
}
export const resetErrorMessageAction = () => {
    return {
        type: ActionType.ResetErrorMessage,
        payload: {}
    }
}
export const resetAddProductMessageAction = () => {
    return {
        type: ActionType.ResetAddProductMessage
    }
}