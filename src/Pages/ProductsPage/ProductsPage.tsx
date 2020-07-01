import * as React from 'react';
import { connect } from 'react-redux';
import Loader from '../../Componenets/Loader/Loader';
import { Product } from '../../Componenets/Product/Product';
import { IProduct } from '../../Models/Product';
import { getProductsAction, getUserCartAction } from '../../Redux/action';
import { IState } from '../../Redux/reducer';

export interface IProductsPageProps {
    getProducts(): void,
    products: IProduct[],
    getUserCart(): void,
    isLoading: boolean,
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
            <div className="row">
                {products.map((product) =>
                    <div key={product.id}>
                        <Product {...product} />
                    </div>
                )}
            </div>
        );
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
}
export const ProductsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ProductsPage);
