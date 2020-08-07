import * as React from 'react';
import { connect } from 'react-redux';
import Loader from '../../Componenets/Loader/Loader';
import { Product } from '../../Componenets/Product/Product';
import { IProduct } from '../../Models/Product';
import { getProductsAction, getUserCartAction, sortProductsByPriceAction } from '../../Redux/action';
import { IState } from '../../Redux/reducer';
import SortIcon from '@material-ui/icons/Sort';
import IconButton from '@material-ui/core/IconButton';

export interface IProductsPageProps {
    getProducts(): void,
    products: IProduct[],
    getUserCart(): void,
    isLoading: boolean,
    sortProductsByPrice(): void,
}

class _ProductsPage extends React.Component<IProductsPageProps> {
    componentDidMount() {
        const { getProducts, getUserCart } = this.props;
        getProducts();
        getUserCart();
    }
    public render() {
        const { products, isLoading } = this.props;
        if (isLoading) {
            return <Loader />
        }
        return (
            <div>
                <IconButton
                    style={{ backgroundColor: "white", borderRadius: "7px", padding: "10px", margin: "15px", float:"left" }}
                    color="secondary"
                    onClick={this.handleOnSort}>
                    Sort By Price<SortIcon />
                </IconButton>
                <div className="row">
                    {products.map((product) =>
                        <div key={product.id}>
                            <Product {...product} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
    handleOnSort = () => {
        const { sortProductsByPrice } = this.props;
        sortProductsByPrice();
    }
}

const mapStateToProps = (state: IState) => {
    return {
        products: state.products,
        isLoading: state.loader,
    }
}
const mapDispatchToProps = {
    getProducts: getProductsAction,
    getUserCart: getUserCartAction,
    sortProductsByPrice: sortProductsByPriceAction,
}
export const ProductsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ProductsPage);
