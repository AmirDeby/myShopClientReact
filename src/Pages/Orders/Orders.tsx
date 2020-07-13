import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps } from 'react-router';
import { OrderList } from '../../Componenets/Order/OrderList';
import { OrderDetails } from '../../Componenets/OrderDetails/OrderDetails';
import { IOrder } from '../../Models/order';
import { getOrdersAction } from '../../Redux/action';
import { IState } from '../../Redux/reducer';

export interface IOrdersProps {
    getOrders(): void,
    orders: IOrder[],
}

class _Orders extends React.Component<IOrdersProps> {
    componentDidMount() {
        const { getOrders } = this.props;
        getOrders()
    }
    public render() {
        return (
            <div style={{ width: "40%", margin: "auto" }}>
                <OrderList />
                <Route path="/orders/:id?">
                    {({ match: { params } }: RouteComponentProps) =>
                        <OrderDetails id={(params as any).id} />
                    }
                </Route>
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        orders: state.orders,
    }
}
const mapDispatchToProps = {
    getOrders: getOrdersAction,
}

export const Orders = connect(
    mapStateToProps,
    mapDispatchToProps
)(_Orders)