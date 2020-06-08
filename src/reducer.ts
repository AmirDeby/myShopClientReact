export interface IState {

}

export interface IAction {
    type: string;
    payload: any;

}


const initialState: IState = {

};

export const reducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
}