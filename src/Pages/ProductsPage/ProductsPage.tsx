import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../Redux/reducer';
import { getProductsAction } from '../../Redux/action';
import { Redirect } from 'react-router';
import { IProduct } from '../../Models/Product';
import { Product } from '../../Componenets/Product/Product';


export interface IProductsPageProps {
    getProducts(): void,
    isLogged: boolean,
    products: IProduct[],
}

class _ProductsPage extends React.Component<IProductsPageProps> {
    componentDidMount() {
        const { getProducts } = this.props;
        getProducts();
    }
    public render() {
        const { isLogged, products } = this.props;
        if (!isLogged) {
            return <Redirect to="/login" />
        }
        return (
            <div className="row">
                {products.map((product) =>
                    <div key={product.name}>
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
}
export const ProductsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ProductsPage);
