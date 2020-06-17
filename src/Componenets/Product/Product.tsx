import { StyledComponentProps, Theme, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import React from 'react';
import { connect } from 'react-redux';
import { insertItemToCartAction } from '../../Redux/action';
import { IState } from '../../Redux/reducer';

export interface IProductsProps extends StyledComponentProps {
    id?: number,
    name?: string,
    description?: string,
    image?: string,
    originalPrice?: number,
    salePrice?: number,
    insertItem?(id: number, quantity: number): void,
}
interface IProductsState {
    quantity: number,
}

const styles = (theme: Theme) => ({
    card: {
        maxWidth: 350,
        margin: theme.spacing(1),
    },
    quantity: {
        width: 130,
        marginLeft: 5,
    },
    chip: {
        margin: 11,
    }
});

class _Product extends React.Component<IProductsProps> {
    state: IProductsState = {
        quantity: null,
    }

    public render() {
        const { classes, name, description, image, originalPrice, salePrice } = this.props
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        width="140"
                        image={image}
                        title={name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <TextField
                    className={classes.quantity}
                    name="quantity"
                    variant="outlined"
                    label="Enter Quantity"
                    type="number"
                    onChange={this.onChangeQuantity}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Quantity</InputAdornment>,
                    }}
                />
                <CardActions>
                    <IconButton onClick={this.addItemToCart} color="primary" aria-label="add to shopping cart">
                        <Chip label={`Original Price : ${originalPrice}`} className={classes.chip} variant="outlined" />
                        <Chip label={`Sale : ${salePrice}`} className={classes.chip} variant="outlined" />
                        <AddShoppingCartIcon />
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
    addItemToCart = () => {
        const { id, insertItem } = this.props;
        const { quantity } = this.state;

        insertItem(id, quantity);
    }
    onChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        this.setState({
            [name]: parseInt(value)
        })
        console.log(this.state);
    }
}

const mapStateToProps = (state: IState) => {
    return {

    }
}
const mapDispatchToProps = {
    insertItem: insertItemToCartAction,
}

export const Product = connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(_Product));