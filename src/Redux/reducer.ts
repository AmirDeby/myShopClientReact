import { IProduct } from "../Models/Product";
import { ICartItem } from "../Models/cart";

export interface IState {
    isLogged: boolean,
    errorMessage: string,
    products: IProduct[],
    userCart: ICartItem[],
}

export interface IAction {
    type: string;
    payload: Record<string, any>;

}

function isLogged(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
}

const initialState: IState = {
    isLogged: isLogged(),
    errorMessage: "",
    products: [],
    userCart: [],
};

export enum ActionType {
    RegisterFail = "REGISTER_FAIL",
    RegisterSuccess = "REGISTER_SUCCESS",
    LoginFail = "LOGIN_FAIL",
    LoginSuccess = "LOGIN_SUCCESS",
    ResetErrorMessage = "RESET_ERROR_MESSAGE",
    GetProducts = "GET_PRODUCTS",
    GetUserCart = "GET_USER_CART",
    InsertItemToCart = "INSERT_ITEM_TO_CART",
    InsertItemError = "INSERT_ITEM_ERROR",
    DeleteItemFromCart = "DELETE_ITEM_FROM_CART",
    SearchItem = "SEARCH_ITEM",
    LogOff = "LOG_OFF"
}

export const reducer = (state: IState = initialState, action: IAction): IState => {
    switch (action.type) {

        case ActionType.LogOff: {
            localStorage.removeItem('token');
            return {
                ...state,
                isLogged: false,
            }
        }
        case ActionType.SearchItem: {
            const { products } = action.payload;
            console.log(action.payload);
            return {
                ...state,
                products
            }
        }
        case ActionType.DeleteItemFromCart: {
            const { id } = action.payload;
            const userCart = state.userCart.concat();
            const itemIndex = userCart.findIndex((cart: any) => cart.id === id);
            userCart.splice(itemIndex, 1);
            return {
                ...state,
                userCart
            }
        }

        case ActionType.GetUserCart: {
            const { userCart } = action.payload;
            return {
                ...state,
                userCart
            }
        }
        case ActionType.InsertItemToCart: {
            const { id, quantity } = action.payload;
            const newProducts = state.products.concat();
            const product = newProducts.find(product => product.id === id);
            const cartItem: ICartItem = {
                ...product,
                quantity
            }
            const newUserCart = state.userCart.concat(cartItem);
            return {
                ...state,
                errorMessage: "",
                userCart: newUserCart,
            }
        }
        case ActionType.InsertItemError: {
            const { msg } = action.payload;
            return {
                ...state,
                errorMessage: msg,
            }
        }
        case ActionType.GetProducts: {
            const { products } = action.payload;
            return {
                ...state,
                products,
            }
        }
        case ActionType.RegisterSuccess: {
            return {
                ...state,
                isLogged: true,
            }
        }
        case ActionType.LoginSuccess: {
            return {
                ...state,
                isLogged: true,
            }
        }
        case ActionType.LoginFail: {
            const { msg } = action.payload;
            return {
                ...state,
                errorMessage: msg,
            }
        }
        case ActionType.RegisterFail: {
            const { msg } = action.payload;
            return {
                ...state,
                errorMessage: msg,
            }
        }
        case ActionType.ResetErrorMessage: {
            return {
                ...state,
                errorMessage: ""
            }
        }

        default: {
            return state;
        }
    }
}