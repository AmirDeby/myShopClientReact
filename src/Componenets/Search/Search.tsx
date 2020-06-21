import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../Redux/reducer';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { searchProductAction, getProductsAction } from '../../Redux/action';

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
                <FormControl onChange={this.onChangeSearch} name="keyword" style={{ marginLeft: "17px" }} type="text" placeholder="Search" className="mr-sm-2" />
                <Button type="submit" variant="outline-success" size="sm">Search</Button>
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