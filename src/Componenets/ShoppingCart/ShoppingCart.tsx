import * as React from 'react';
import { connect } from 'react-redux';
import { ICartItem } from '../../Models/cart';
import { getUserCartAction } from '../../Redux/action';
import { IState } from '../../Redux/reducer';
import { CartItem } from '../CartItem/CartItem';
import { ContinueButton } from '../ContinueButton/ContinueButton';
import Loader from '../Loader/Loader';
import Col from 'react-bootstrap/Col';
import '../../Componenets/ShoppingCart/ShoppingCart.css';

export interface IShoppingCartProps {
    getCart(): void,
    cart: ICartItem[],
    isLoading: boolean,
}

class _ShoppingCart extends React.Component<IShoppingCartProps> {
    componentDidMount() {
        const { getCart } = this.props;
        getCart();
    }
    public render() {
        const { cart, isLoading } = this.props;
        if (isLoading) {
            return <Loader />
        }
        return (
            <div className="container">
                <div className="block-btn" style={{ marginTop: "10px" }}>
                    <ContinueButton />
                </div>
                <div className="row">
                    {cart.map((item) =>
                        <Col key={item.id} md={3} xs={12}>
                            <CartItem {...item} />
                        </Col>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        cart: state.userCart,
        isLoading: state.loader,
    }
}
const mapDispatchToProps = {
    getCart: getUserCartAction,
}
export const ShoppingCart = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ShoppingCart)
