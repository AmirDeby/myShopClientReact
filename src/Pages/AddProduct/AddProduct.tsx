import { Button } from '@material-ui/core';
import { createStyles, StyledComponentProps, Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import { connect } from 'react-redux';
import { addProdcutAction } from '../../Redux/action';
import { IState } from '../../Redux/reducer';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    });

export interface IAddProdcutProps extends StyledComponentProps {
    addProduct(inventory: number, category: number, description: string, image: string, name: string, originalPrice: number, salePrice: number): void,
}

interface IAddProdcutState {
    inventory: number,
    name: string,
    description: string,
    image: string,
    originalPrice: number,
    salePrice: number,
    categoryId: number,
}

class _AddProdcut extends React.Component<IAddProdcutProps, IAddProdcutState> {
    state: IAddProdcutState = {
        inventory: 1,
        name: "",
        description: "",
        image: "",
        originalPrice: 1,
        salePrice: 1,
        categoryId: 1,
    }
    public render() {
        const { classes } = this.props;
        const { inventory, categoryId, description, image, name, originalPrice, salePrice } = this.state;
        return (
            <form
                onSubmit={this.onSubmit}
                style={{ backgroundColor: "rgba(255, 255, 255, 0.859)", width: "40%", margin: "auto", borderRadius: "9px" }}
                className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        required
                        name="inventory"
                        onChange={this.handleOnChange}
                        label="add inventory"
                        variant="filled"
                        value={inventory}
                    />
                    <TextField
                        required
                        onChange={this.handleOnChange}
                        name="name"
                        label="Add Product Name"
                        variant="filled"
                        value={name}
                    />
                    <TextField
                        style={{ width: "700px" }}
                        required
                        name="description"
                        onChange={this.handleOnChange}
                        label="Add Description"
                        variant="filled"
                        value={description}
                    />
                    <TextField
                        required
                        name="image"
                        onChange={this.handleOnChange}
                        label="Add Image"
                        variant="filled"
                        value={image}
                    />
                    <TextField
                        required
                        name="originalPrice"
                        onChange={this.handleOnChange}
                        label="Add original price"
                        variant="filled"
                        value={originalPrice}
                    />
                    <TextField
                        required
                        name="salePrice"
                        onChange={this.handleOnChange}
                        label="Add sale price"
                        variant="filled"
                        value={salePrice}
                    />
                    <TextField
                        required
                        name="category"
                        onChange={this.handleOnChange}
                        id="filled-required"
                        label="Add products Category"
                        variant="filled"
                        value={categoryId}
                    />
                </div>
                <Button type="submit">Add Product</Button>
            </form>
        );
    }
    handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        } as any);
    }
    onSubmit = (e: React.FormEvent) => {
        const { inventory, categoryId, description, image, name, originalPrice, salePrice } = this.state;
        const { addProduct } = this.props;
        e.preventDefault();
        addProduct(inventory, categoryId, description, image, name, originalPrice, salePrice);
    }
}
const mapStateToProps = (state: IState) => {
    return {

    }
}
const mapDispatchToProps = {
    addProduct: addProdcutAction,
}
export const AddProdcut = connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(_AddProdcut))