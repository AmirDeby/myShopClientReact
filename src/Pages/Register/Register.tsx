import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import { connect } from 'react-redux';
import { registerAction, resetErrorMessageAction } from '../../Redux/action';
import { IState } from '../../Redux/reducer';
import '../Register/Register.css';
import { Redirect } from 'react-router';
import { withStyles, StyledComponentProps, Theme } from '@material-ui/core';

export interface IRegisterProps extends StyledComponentProps {
    register(firstName: string, lastName: string, email: string, password: string): void,
    error: boolean,
    isLogged: boolean,
    reserErrorMessage(): void,
}
const styles = (theme: Theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
})

interface IRegisterState {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

class _Register extends React.Component<IRegisterProps, IRegisterState> {
    state: IRegisterState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    }
    componentWillUnmount() {
        const { reserErrorMessage } = this.props;
        reserErrorMessage();
    }
    public render() {
        const isFilled = this.canBeRegister();
        const { error, isLogged, classes } = this.props;
        if (isLogged) {
            return <Redirect to="/products" />
        }
        return (
            <div className="register-main-div">
                <div>
                    <form className={classes.form} noValidate onSubmit={this.onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type="text"
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="First Name"
                                    autoFocus
                                    onChange={this.handlerChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    onChange={this.handlerChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="email"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={this.handlerChange}
                                />
                                <span style={{ color: "red" }} className={["error-email", error ? 'visible' : 'invisible'].join(' ')}>*The Email is taken,try another</span>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={this.handlerChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            disabled={!isFilled}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                    </form>
                </div>
                <Box mt={5}>
                </Box>
            </div>);
    }
    canBeRegister = () => {
        const { password, lastName, firstName, email } = this.state;
        return (
            firstName.length > 0 &&
            lastName.length > 0 &&
            email.length > 0 &&
            password.length > 0
        )
    }
    handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        } as any)
    }
    onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { firstName, lastName, email, password } = this.state;
        const { register } = this.props;
        register(firstName, lastName, email, password);
    }
}

const mapStateToProps = (state: IState) => {
    return {
        error: state.errorMessage !== "",
        isLogged: state.isLogged,
    }
}
const mapDispatchToProps = {
    register: registerAction,
    reserErrorMessage: resetErrorMessageAction,
}

export const Register = connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(_Register));
