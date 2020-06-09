export interface IState {
    isLogged: boolean,
    errorMessage:string,
}

export interface IAction {
    type: string;
    payload: any;

}


const initialState: IState = {
    isLogged: false,
    errorMessage:""
};

export enum ActionType {
    RegisterFail = "REGISTER_FAIL",
    RegisterSuccess = "REGISTER_SUCCESS",
}

export const reducer = (state = initialState, action: IAction) => {
    switch (action.type) {

        case ActionType.RegisterSuccess: {
            return {
                ...state,
                isLogged:true,
            }
        }
        case ActionType.RegisterFail: {
            return {
                ...state,
                errorMessage:action.payload,
            }
            }

        default: {
            return state;
        }
    }
}