import Button from '@material-ui/core/Button';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import * as React from 'react';

export interface IOrdersIconProps {
}

export default class OrdersIcon extends React.Component<IOrdersIconProps> {
    public render() {
        return (
            <Button
                color="default"
                startIcon={<LibraryBooksIcon />}
            >
                Orders
            </Button>
        );
    }
}
