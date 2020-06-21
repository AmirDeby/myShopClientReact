import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../Redux/reducer';
import { getProductsAction, getUserCartAction } from '../../Redux/action';
import { Redirect } from 'react-router';
import { IProduct } from '../../Models/Product';
import { Product } from '../../Componenets/Product/Product';


export interface IProductsPageProps {
    getProducts(): void,
    isLogged: boolean,
    products: IProduct[],
    getUserCart():void,
}

class _ProductsPage extends React.Component<IProductsPageProps> {
    componentDidMount() {
        const { getProducts, getUserCart } = this.props;
        getProducts();
        getUserCart();
    }
    public render() {
        const { isLogged, products } = this.props;
        if (!isLogged) {
            return <Redirect to="/login" />
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
        isLogged: state.isLogged,
        products: state.products,
    }
}
const mapDispatchToProps = {
    getProducts: getProductsAction,
    getUserCart:getUserCartAction,
}
export const ProductsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ProductsPage);
