import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { StyledComponentProps } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import * as React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { connect } from 'react-redux';
import { getProductsAction, searchProductAction } from '../../Redux/action';
import { IState } from '../../Redux/reducer';

export interface ISearchProps extends StyledComponentProps {
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
                <Button style={{ marginRight: "5px" }}
                    onClick={this.resetSearchOnClick} size="small"
                    variant="contained" color="secondary"
                    startIcon={<DeleteIcon />}>
                    Reset Search
                    </Button>
                <FormControl value={keyword} style={{ width: "500px" }}
                    onChange={this.onChangeSearch} name="keyword" type="text"
                    placeholder="Search Item" className="mr-sm-2" />
                <Button
                    style={{ marginRight: "260px" }}
                    type="submit"
                    size="small"
                    variant="contained"
                    color="primary"
                    endIcon={<Icon>send</Icon>}>
                    Search
                </Button>
            </Form>
        );
    }
    resetSearchOnClick = () => {
        this.setState({
            keyword: ""
        })
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