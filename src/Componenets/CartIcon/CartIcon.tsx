import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { withStyles, StyledComponentProps, Theme } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { connect } from 'react-redux';
import { IState } from '../../Redux/reducer';

export interface ICartIconProps extends StyledComponentProps {
    userCart:[],
}

const styles = (theme: Theme) => ({
    badge: {
        top: '50%',
        right: -3,
        // The border color match the background color.
        border: `2px solid ${
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
            }`,
    },
});

class _CartIcon extends React.Component<ICartIconProps> {
    public render() {
        const { classes,userCart } = this.props;
        return (
            <IconButton aria-label="Cart">
                <Badge badgeContent={userCart.length} color="primary" classes={{ badge: classes.badge }}>
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        userCart: state.userCart
    }
}
const mapDispatchToProps = {

}

export const CartIcon = connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(_CartIcon))