import { StyledComponentProps, Theme, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../Redux/reducer';
import { deleteItemFromCartAction, getUserCartAction } from '../../Redux/action';
import { ICartItem } from '../../Models/cart';

export interface ICartProps extends ICartItem, StyledComponentProps {
    deleteItem(id: number): void,
}

const styles = (theme: Theme) => ({
    card: {
        maxWidth: 250,
        margin: theme.spacing(1),
        height: 350,
    },
    quantity: {
        width: 130,
        marginLeft: 5,
    },
});

class _CartItem extends React.Component<ICartProps> {

    public render() {
        const { classes, quantity, image, name, salePrice, originalPrice } = this.props;
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="100"
                        width="100"
                        image={image}
                        title={name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                        <Chip label={`Qauntity : ${quantity}`} className={classes.chip} color="secondary" />
                    </CardContent>
                </CardActionArea>
                <div>
                    <span style={{ textDecoration: "line-through" }}>Original Price : {originalPrice}</span>
                </div>
                <CardActions>
                    <Chip style={{ margin: "auto" }} label={`Sale : ${salePrice}`} color="secondary" variant="outlined" />
                </CardActions>
                <IconButton onClick={this.deleteItemFromCart} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </Card>
        );
    }
    deleteItemFromCart = () => {
        const { id, deleteItem } = this.props;

        deleteItem(id);
    }
}

const mapStateToProps = (state: IState) => {
    return {

    }
}
const mapDispatchToProps = {
    deleteItem: deleteItemFromCartAction,
    getUserCart: getUserCartAction,
}

export const CartItem = connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(_CartItem));