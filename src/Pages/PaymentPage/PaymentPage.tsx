import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { sumBy } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { ModalPay } from '../../Componenets/Modal/Modal';
import { ICartItem } from '../../Models/cart';
import { getUserCartAction, openModalAction } from '../../Redux/action';
import { IState } from '../../Redux/reducer';
import '../PaymentPage/PaymentPage.css';

export interface IPaymentPageProps {
    userCart: ICartItem[],
    getUserCart(): void,
    openModal(): void,
}
interface IPaymentPageState {
    setOpen: boolean,
}

class _PaymentPage extends React.Component<IPaymentPageProps, IPaymentPageState> {
    componentDidMount() {
        const { getUserCart } = this.props;
        getUserCart();
    }
    state: IPaymentPageState = {
        setOpen: false
    }
    public render() {
        const { userCart } = this.props;
        const userBill = sumBy(userCart, (item) => item.quantity * item.salePrice);
        const numOfItemsOnCart = sumBy(userCart, 'quantity');
        return (
            <Card className="payment-style" variant="outlined">
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        Total Price :
                    </Typography>
                    <Typography variant="h4" component="h2">
                        {userBill} €
                    </Typography>
                    <Typography color="textSecondary">
                        Item on cart :
                      </Typography>
                    <Typography variant="h4" component="p">
                        {numOfItemsOnCart}
                        <br />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button color="secondary" onClick={this.handleOpen} type="button" style={{ margin: "auto" }} size="small">Click To Pay</Button>
                </CardActions>
                <ModalPay />
            </Card>
        );
    }
    handleOpen = () => {
        const { openModal } = this.props;
        openModal()
    }
    handleClose = () => {
        this.setState({
            setOpen: false
        })
    }
}
const mapStateToProps = (state: IState) => {
    return {
        userCart: state.userCart,
        isLogged: state.isLogged,
    }
}
const mapDispatchToProps = {
    getUserCart: getUserCartAction,
    openModal: openModalAction,
}

export const PaymentPage = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_PaymentPage)
