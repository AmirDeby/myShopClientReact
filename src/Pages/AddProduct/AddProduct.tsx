import { Button } from '@material-ui/core';
import { createStyles, StyledComponentProps, Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import { connect } from 'react-redux';
import { addProdcutAction, resetAddProductMessageAction } from '../../Redux/action';
import { IState } from '../../Redux/reducer';
import Icon from '@material-ui/core/Icon';

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
    isAdd: boolean,
    resetAddProductMessage():void,
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
    componentWillUnmount() {
        const { resetAddProductMessage } = this.props;
        resetAddProductMessage();
    }
    state: IAddProdcutState = {
        inventory: 1,
        name: "",
        description: "",
        image: "",
        originalPrice: 0,
        salePrice: 0,
        categoryId: 2,
    }
    public render() {
        const { classes, isAdd } = this.props;
        const { inventory, categoryId, description, image, name, originalPrice, salePrice } = this.state;
        const isFilled = this.canBeSubmit();
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
                <Button disabled={!isFilled} type="submit"><Icon color="primary">add_circle</Icon>Add Product</Button>
                <div>
                    {isAdd ? <span style={{ color: "green", fontSize: "30px" }}>Product has been added</span> : null}
                </div>
            </form >
        );
    }
    canBeSubmit = () => {
        const { description, image, name } = this.state;
        return (
            description.length > 0 &&
            image.length > 0 &&
            name.length > 0
        )
    }
    handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        } as any);
    }
    onSubmit = (e: React.FormEvent) => {
        const { inventory, categoryId, description, image, name, originalPrice, salePrice } = this.state;
        const { addProduct, resetAddProductMessage} = this.props;
        e.preventDefault();
        addProduct(inventory, categoryId, description, image, name, originalPrice, salePrice);
        this.setState({
            inventory: 1,
            name: "",
            description: "",
            image: "",
            originalPrice: 0,
            salePrice: 0,
            categoryId: 2,
        });
        setTimeout(() => {
            resetAddProductMessage();
        }, 7000);
    }
}
const mapStateToProps = (state: IState) => {
    return {
        isAdd: state.addProductsSuccess,
    }
}
const mapDispatchToProps = {
    addProduct: addProdcutAction,
    resetAddProductMessage: resetAddProductMessageAction,
}
export const AddProdcut = connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(_AddProdcut))