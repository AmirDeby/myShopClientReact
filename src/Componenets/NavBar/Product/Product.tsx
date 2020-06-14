import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

export interface IProductsProps {
    id?:number,
    name?: string,
    description?: string,
    image?: string,
    originalPrice?: number,
    salePrice?: number,
}

export default class Product extends React.Component<IProductsProps> {

    public render() {
        const { name, description, image, originalPrice, salePrice } = this.props
        return (
            <Card style={{ maxWidth: "350px", margin: "10px" }}>
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
                <CardActions>
                    <Button size="small" variant="outlined" color="primary">
                       Original Price :  {originalPrice}
                    </Button>
                    <Button size="small" variant="outlined" color="primary">
                        Sale : {salePrice}
                    </Button>
                    <IconButton onClick={() => { this.justCheck() }} color="primary" aria-label="add to shopping cart">
                        <AddShoppingCartIcon />
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
    justCheck = () => {
        const { id} = this.props;
        console.log(id);
        
    }
}