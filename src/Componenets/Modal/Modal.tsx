import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../Redux/reducer';
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';
import { PaymentDetails } from '../PaymentDetails/PaymentDetails';
import { openModalAction, CloseModalAction } from '../../Redux/action';

export interface IModalPayProps {
    openModal(): void,
    closeModal(): void,
    openAndCloseModal: boolean
}


class _ModalPay extends React.Component<IModalPayProps> {
    public render() {
        const { openAndCloseModal} = this.props;
        return (
            <div>
                <Modal show={openAndCloseModal} onHide={this.handleClose}>
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
            </div>
        );
    }
    handleClose = () => {
        const { closeModal } = this.props;
        closeModal()
    }
}

const mapStateToProps = (state: IState) => {
    return {
        openAndCloseModal: state.openModal,
    }
}
const mapDispatchToProps = {
    openModal: openModalAction,
    closeModal: CloseModalAction,
}

export const ModalPay = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_ModalPay);