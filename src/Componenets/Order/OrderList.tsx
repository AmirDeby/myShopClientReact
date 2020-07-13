import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IOrder } from '../../Models/order';
import { IState } from '../../Redux/reducer';
import './Order.css';
import { getUserOrderItemsAction } from '../../Redux/action';
import { Button } from '@material-ui/core';

export interface IOrderListProps {
    orders: IOrder[],
    getUserOrdersItems(id: number):void,
}


class _OrderList extends React.Component<IOrderListProps> {
    public render() {
        const { orders, getUserOrdersItems } = this.props;
        return (
            <TableContainer className="main-table" component={Paper}>
                <Table aria-label="caption table">
                    <caption>Click on Order Number to see more</caption>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>DownLoad in PDF</TableCell>
                            <TableCell align="right">Order Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map(({ id, date }) => {
                            return (
                                <TableRow key={id}>
                                    <TableCell component="th" scope="row">
                                        {moment(date).format('ll')}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Button color="secondary">PDF</Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => getUserOrdersItems(id)}>
                                            <Link to={`/orders/${id}`}>{id}</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        orders: state.orders,
    }
}
const mapDispatchToProps = {
    getUserOrdersItems: getUserOrderItemsAction,
}
export const OrderList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_OrderList)