import { ICartItem } from "../Models/cart";
import { IProduct } from "../Models/Product";
import { IOrder } from "../Models/order";

export interface IState {
    isLogged: boolean,
    errorMessage: string,
    products: IProduct[],
    userCart: ICartItem[],
    orders: IOrder[],
    userOrders: [],
    loader: boolean,
    openModal: boolean,
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
    userOrders: [],
    orders: [],
    loader: false,
    openModal: false,
};

export enum ActionType {
    GetUserOrders = "GET_USER_ORDERS",
    GetOrders = "GET_ORDERS",
    OpenModal = "OPEN_MODAL",
    CloseModal = "CLOSE_MODAL",
    RegisterFail = "REGISTER_FAIL",
    RegisterSuccess = "REGISTER_SUCCESS",
    LoginFail = "LOGIN_FAIL",
    LoginSuccess = "LOGIN_SUCCESS",
    ResetErrorMessage = "RESET_ERROR_MESSAGE",
    GetProducts = "GET_PRODUCTS",
    GetProductsPending = "GET_PRODUCTS_PENDING",
    GetUserCart = "GET_USER_CART",
    InsertItemToCart = "INSERT_ITEM_TO_CART",
    InsertItemError = "INSERT_ITEM_ERROR",
    DeleteItemFromCart = "DELETE_ITEM_FROM_CART",
    SearchItem = "SEARCH_ITEM",
    SearchIteamPending = "SEARCH_ITEM_PENDING",
    SearchItemFail = "SEARCH_ITEM_FAIL",
    LogOff = "LOG_OFF",
    SendCreditCardDetails = "SEND_CREDIT_CARD_DETAILS",
    GetPdfFile = "GET_PDF_FILE",
}

export const reducer = (state: IState = initialState, action: IAction): IState => {
    switch (action.type) {

        case ActionType.GetPdfFile: {
            return {
                ...state,
            }
        }
        case ActionType.GetUserOrders: {
            const { userOrders } = action.payload;
            console.log(userOrders);
            return {
                ...state,
                userOrders
            }
        }
        case ActionType.GetOrders: {
            const { orders } = action.payload;
            return {
                ...state,
                orders,
            }
        }
        case ActionType.CloseModal: {
            return {
                ...state,
                openModal: false,
            }
        }
        case ActionType.OpenModal: {
            return {
                ...state,
                openModal: true,
            }
        }
        case ActionType.SearchIteamPending: {
            return {
                ...state,
                loader: true,
            }
        }
        case ActionType.SendCreditCardDetails: {

            return {
                ...state,
                userCart: [],
            }
        }
        case ActionType.LogOff: {
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
                products,
                loader: false,
            }
        }
        case ActionType.SearchItemFail: {
            return {
                ...state,
                loader: false,
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
            // const itemIndex = newProducts.findIndex(product => product.id === id);
            // const currentItem = newProducts[itemIndex];
            // newProducts[itemIndex] = {
            //     ...currentItem,
            //     inventory: product.inventory - quantity,
            // }
            // console.log(newProducts);
            const cartItem: ICartItem = {
                ...product,
                quantity
            }
            const newUserCart = state.userCart.concat(cartItem);
            return {
                ...state,
                errorMessage: "",
                userCart: newUserCart,
                // products: newProducts
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
                loader: false,
            }
        }
        case ActionType.GetProductsPending: {
            return {
                ...state,
                loader: true
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