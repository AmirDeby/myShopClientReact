import React from 'react';
import { StyledComponentProps, Theme, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import { connect } from 'react-redux';
import { IUser } from '../../Models/user';
import { deleteProductAction, insertItemToCartAction } from '../../Redux/action';
import { IState } from '../../Redux/reducer';
import '../Product/Product.css';


export interface IProductsProps extends StyledComponentProps {
    id?: number,
    name?: string,
    description?: string,
    image?: string,
    originalPrice?: number,
    salePrice?: number,
    insertItem?(id: number, quantity: number): void,
    insertError: boolean,
    user: IUser,
    deleteProduct(id: number): void,
}

interface IProductsState {
    quantity: number,
}
const styles = (theme: Theme) => ({
    card: {
        width: 353,
        margin: theme.spacing(1.5),
        opacity: 0.88,
        height: 450,
    },
    quantity: {
        width: 140,
        marginLeft: 5,
        marginTop: 5,
    },
    chip: {
        margin: 11,
    }
});

class _Product extends React.Component<IProductsProps, IProductsState> {

    state: IProductsState = {
        quantity: 1,
    }
    public render() {
        const { classes, name, description, image, originalPrice, salePrice, insertError, user } = this.props;
        const { quantity } = this.state;
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
                    <div>
                        {user.isAdmin
                            ?
                            <Grid
                                style={{ position: "absolute", top: "15px", right: "11px" }}
                                onClick={this.ondeleteProduct} item xs={8}>
                                <DeleteForeverSharpIcon fontSize="large" />
                            </Grid>
                            :
                            null}
                    </div>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {description}
                        </Typography>
                        <span style={{ textDecoration: "line-through" }} >Original Price : €{originalPrice}</span>
                        <Chip style={{ marginRight: "5px" }} label={`Sale : €${salePrice}`} className={classes.chip} color="secondary" />
                    </CardContent>
                </CardActionArea>
                <TextField
                    className={classes.quantity}
                    name="quantity"
                    variant="outlined"
                    label="Enter Quantity"
                    type="number"
                    inputProps={{
                        min: 1,
                    }}
                    value={quantity}
                    onChange={this.onChangeQuantity}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Quantity</InputAdornment>,
                    }}
                />
                <div style={{ marginTop: "8px" }}>
                    <span style={{ color: "red" }} className={["erorr-insert", insertError ? 'visible' : 'invisible'].join(' ')}>*Quantity must be at least 1</span>
                </div>
                <IconButton style={{ position: "inherit" }} onClick={this.addItemToCart} color="primary" aria-label="add to shopping cart">
                    <AddShoppingCartIcon />
                </IconButton>
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
        } as any);
    }
    ondeleteProduct = () => {
        const { id, deleteProduct } = this.props;
        deleteProduct(id);
    }
}

const mapStateToProps = (state: IState) => {
    return {
        insertError: state.errorMessage !== "",
        user: state.user,
    }
}
const mapDispatchToProps = {
    insertItem: insertItemToCartAction,
    deleteProduct: deleteProductAction,
}

export const Product = connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(_Product));