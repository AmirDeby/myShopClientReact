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
// const url = 'https://lh4.googleusercontent.com/proxy/vV1wQITISJ7_uwWl4ZKTt9CGmQ4AWJ4nSp0Ucm8sR8vIvtQBNfpufk9pqj_ooII1DDkA8UHXePt-CycNYIBr9A1kHb-h5g'
const url = 'https://d27zlipt1pllog.cloudfront.net/pub/static/version1594223942/frontend/Apollo/web/en_US/images/empty-cart.png'


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
                {cart.length ?
                    <div className="row">
                        {cart.map((item) =>
                            <Col key={item.id} md={3} xs={12}>
                                <CartItem {...item} />
                            </Col>
                        )}
                    </div>
                    :
                    <div>
                        <h3 style={{ color: "white" }}>No Item In Cart</h3>
                        <div>
                            <img alt="cart"
                                style={{ position: "inherit", backgroundColor: "rgb(241 241 241 / 42%)", width: "500px", marginTop: "30px" }}
                                src={url} />
                        </div>
                    </div>
                }
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
