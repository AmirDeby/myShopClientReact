import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';
import { IState } from '../../Redux/reducer';

export interface IPrivateRouteProps extends RouteProps {
    isLogged: boolean;
}


class _PrivateRoute extends React.Component<IPrivateRouteProps> {
    public render() {
        const { isLogged, children, ...rest } = this.props;
        if (!isLogged) {
            return <Redirect to="login" />
        }
        return (
            <Route {...rest}>
                {children}
            </Route>
        );
    }
}

const mapStateToProps = (state: IState) => ({
    isLogged: state.isLogged
})
export const PrivateRoute = connect(mapStateToProps)(_PrivateRoute);