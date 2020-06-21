import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../Redux/reducer';
import { getUserCartAction } from '../../Redux/action';
import { ICartItem } from '../../Models/cart';
import { CartItem } from '../CartItem/CartItem';
import { Redirect } from 'react-router';

export interface IShoppingCartProps {
    getCart(): void,
    cart: ICartItem[],
    isLogged: boolean,
}

class _ShoppingCart extends React.Component<IShoppingCartProps> {
    componentDidMount() {
        const { getCart } = this.props;
        getCart();
    }
    public render() {
        const { cart, isLogged } = this.props;
        if (!isLogged) {
            return <Redirect to='/login' />
        }
        return (
            <div className="row">
                {cart.map((item) =>
                    <div key={item.id}>
                        <CartItem {...item} />
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        cart: state.userCart,
        isLogged: state.isLogged
    }
}
const mapDispatchToProps = {
    getCart: getUserCartAction,
}
export const ShoppingCart = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ShoppingCart)
