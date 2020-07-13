import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../Redux/reducer';
import { getUserOrderItemsAction } from '../../Redux/action';
import Card from 'react-bootstrap/Card';

export interface IOrderDetailsProps {
    id: number;
    getUserOrdersItems(id: number): void,
    userOrdersItem: [],
}

class _OrderDetails extends React.Component<IOrderDetailsProps> {
    componentDidMount() {
        const { id, getUserOrdersItems } = this.props;
        getUserOrdersItems(id);
    }

    public render() {
        const { userOrdersItem } = this.props;
        return (
            <div className="row">
                {userOrdersItem.map(({ id, image, name, description, orderId, quantity }) => {
                    return (
                        <Card key={id} style={{ width: "30%", margin: "8px" }} className="bg-dark text-white">
                            <Card.Img style={{ width: "234px", height: "300px" }} variant="top" src={image} />
                            <blockquote className="blockquote mb-0 card-body">
                                <p>
                                    {description}
                                </p>
                                <footer className="blockquote-footer">
                                    <small className="text-muted">
                                        {name}<cite title="Source Title">
                                            <hr></hr>
                                            <div>Quantity : {quantity}</div></cite>
                                    </small>
                                    <hr></hr>
                                    <small className="text-muted">
                                        <cite title="Source Title">
                                            <hr></hr>
                                            <div>Order Number : {orderId}</div></cite>
                                    </small>
                                </footer>
                            </blockquote>
                        </Card>
                    )
                })}
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        userOrdersItem: state.userOrders,
    }
}
const mapDispatchToProps = {
    getUserOrdersItems: getUserOrderItemsAction,
}
export const OrderDetails = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_OrderDetails)