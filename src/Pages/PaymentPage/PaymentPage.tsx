import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { sumBy } from 'lodash';
import * as React from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { ICartItem } from '../../Models/cart';
import { getUserCartAction } from '../../Redux/action';
import { IState } from '../../Redux/reducer';
import '../PaymentPage/PaymentPage.css';
import { PaymentDetails } from '../../Componenets/PaymentDetails/PaymentDetails';

export interface IPaymentPageProps {
    userCart: ICartItem[],
    getUserCart(): void,
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
                <Modal show={this.state.setOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Enter Credit Card</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <PaymentDetails />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="primary" variant="outlined" onClick={this.handleClose}>
                            Close
                            </Button>
                    </Modal.Footer>
                </Modal>
            </Card>
        );
    }
    handleOpen = () => {
        this.setState({
            setOpen: true
        })
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
}

export const PaymentPage = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_PaymentPage)
