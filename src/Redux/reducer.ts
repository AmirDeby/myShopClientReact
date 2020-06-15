import { IProduct } from "../Models/Product";

export interface IState {
    isLogged: boolean,
    errorMessage: string,
    products: IProduct[],
}

export interface IAction {
    type: string;
    payload: any;

}


const initialState: IState = {
    isLogged: false,
    errorMessage: "",
    products: [],
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
}

export const reducer = (state = initialState, action: IAction) => {
    switch (action.type) {

        case ActionType.InsertItemToCart: {
            return {
                ...state,
            }
        }

        case ActionType.GetUserCart: {
            return {
                ...state,
            }
        }

        case ActionType.GetProducts: {
            return {
                ...state,
                products: action.payload
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
            return {
                ...state,
                errorMessage: action.payload,
            }
        }
        case ActionType.RegisterFail: {
            return {
                ...state,
                errorMessage: action.payload,
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