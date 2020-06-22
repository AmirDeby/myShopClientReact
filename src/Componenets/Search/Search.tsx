import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { connect } from 'react-redux';
import { getProductsAction, searchProductAction } from '../../Redux/action';
import { IState } from '../../Redux/reducer';

export interface ISearchProps {
    searchProduct(keyword: string): void,
    getProducts(): void,
}
interface ISearchState {
    keyword: string,
}

class _Search extends React.Component<ISearchProps, ISearchState> {
    state: ISearchState = {
        keyword: "",
    }
    public render() {
        const { getProducts } = this.props;
        const { keyword } = this.state;
        if (!keyword) {
            getProducts();
        }
        return (
            <Form onSubmit={this.onSubmit} inline>
                <FormControl style={{ width: "500px" }} onChange={this.onChangeSearch} name="keyword" type="text" placeholder="Search" className="mr-sm-2" />
                <Button style={{ marginRight: "260px" }}type="submit" variant="outline-success" size="sm">Search</Button>
            </Form>
        );
    }
    onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        } as any)
    }
    onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { keyword } = this.state;
        const { searchProduct } = this.props;
        console.log(keyword);
        searchProduct(keyword);
    }
}

const mapStateToProps = (state: IState) => {
    return {
    }
}
const mapDispatchToProps = {
    searchProduct: searchProductAction,
    getProducts: getProductsAction,
}

export const Search = connect(
    mapStateToProps,
    mapDispatchToProps
)(_Search)