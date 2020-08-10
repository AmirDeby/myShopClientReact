import * as React from 'react';
import { connect } from 'react-redux';
import Loader from '../../Componenets/Loader/Loader';
import { Product } from '../../Componenets/Product/Product';
import { IProduct } from '../../Models/Product';
import { getProductsAction, getUserCartAction, sortProductsByPriceAction, sortProductsByPriceHighToLowAction } from '../../Redux/action';
import { IState } from '../../Redux/reducer';
import SortIcon from '@material-ui/icons/Sort';
import IconButton from '@material-ui/core/IconButton';

export interface IProductsPageProps {
    getProducts(): void,
    products: IProduct[],
    getUserCart(): void,
    isLoading: boolean,
    sortProductsByPrice(): void,
    sortProductsHighToLow(): void,
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
                <div>
                    <IconButton
                        size="small"
                        style={{ backgroundColor: "white", borderRadius: "7px", padding: "10px", margin: "15px", float: "left" }}
                        color="secondary"
                        onClick={this.handleOnSortLow}>
                        Low Price<SortIcon />
                    </IconButton>
                </div>
                <div style={{ position: "absolute", top: "140px" }}>
                    <IconButton
                        size="small"
                        style={{ backgroundColor: "white", borderRadius: "7px", padding: "10px", margin: "15px", float: "left" }}
                        color="secondary"
                        onClick={this.handleOnSortHigh}>
                        High Price<SortIcon />
                    </IconButton>
                </div>
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
    handleOnSortLow = () => {
        const { sortProductsByPrice } = this.props;
        sortProductsByPrice();
    }
    handleOnSortHigh = () => {
        const { sortProductsHighToLow } = this.props;
        sortProductsHighToLow();
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
    sortProductsHighToLow: sortProductsByPriceHighToLowAction,
}
export const ProductsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ProductsPage);
