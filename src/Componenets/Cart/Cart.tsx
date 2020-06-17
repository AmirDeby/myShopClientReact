import { StyledComponentProps, Theme, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../Redux/reducer';

export interface ICartProps extends StyledComponentProps {
    id?: number,
    name?: string,
    description?: string,
    image?: string,
    originalPrice?: string,
    salePrice?: string,
    categoryId?: number,
    productId?: number,
    quantity?: number
}

const styles = (theme: Theme) => ({
    card: {
        maxWidth: 300,
        margin: theme.spacing(1),
    },
    quantity: {
        width: 130,
        marginLeft: 5,
    },
    chip: {
        margin: 17,
    }
});

class _Cart extends React.Component<ICartProps> {
    public render() {
        const { classes, quantity, description, image, name, salePrice, originalPrice } = this.props;
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
                            <Chip label={`Qauntity : ${quantity}`} className={classes.chip} color="secondary" />
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Chip style={{ textDecoration:"line-through"}} label={`Original Price : ${originalPrice}`} className={classes.chip} color="secondary" variant="outlined" />
                    <Chip label={`Sale : ${salePrice}`} className={classes.chip} color="secondary" variant="outlined" />
                </CardActions>
            </Card>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {

    }
}
const mapDispatchToProps = {
}

export const Cart = connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(_Cart));