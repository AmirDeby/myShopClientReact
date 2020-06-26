import * as React from 'react';
import { sumBy } from 'lodash';
import { connect } from 'react-redux';
import { ICartItem } from '../../Models/cart';
import { IState } from '../../Redux/reducer';

export interface IPaymentPageProps {
    userCart: ICartItem[],
}

class _PaymentPage extends React.Component<IPaymentPageProps> {
    public render() {
        const { userCart } = this.props;
        const userBill = sumBy(userCart, (item) => item.quantity * item.salePrice);
        return (
            <div>
                {userBill}
            </div>
        );
    }
}
const mapStateToProps = (state: IState) => {
    return {
        userCart: state.userCart,
        isLogged: state.isLogged,
    }
}
const mapDispatchToProps = {

}

export const PaymentPage = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_PaymentPage)
