import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../../Redux/action';
import { IState } from '../../Redux/reducer';
import { Redirect } from 'react-router';
import '../Login/Login.css';


export interface ILoginProps {
    isLogged: boolean,
    login(email: string, password: string): void,
    erorr: boolean,
}
interface ILoginState {
    email: string,
    password: string,
}

class _Login extends React.Component<ILoginProps, ILoginState> {
    state: ILoginState = {
        email: "",
        password: "",
    }
    public render() {
        const { password, email } = this.state;
        const { erorr, isLogged } = this.props;
        const isFilled = this.canBeClicked();
        if (isLogged) {
            return <Redirect to="/products" />
        }
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div style={{ marginTop: "50px" }}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form onSubmit={this.onSumbit} noValidate>
                        <TextField
                            onChange={this.handlerOnChange}
                            value={email}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            onChange={this.handlerOnChange}
                            value={password}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                        />
                        <span style={{ color: "red" }} className={["erorr-login", erorr ? 'visible' : 'invisible'].join(' ') }>*Email or Password is not valid</span>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={!isFilled}
                        >
                            Sign In
                          </Button>
                        <Grid container>
                            <Grid item xs>
                            </Grid>
                            <Grid item>
                                <Link style={{ marginRight: "90px" }} href="register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
    canBeClicked = () => {
        const { email, password } = this.state;
        return (
            email.length > 0 &&
            password.length > 0
        )
    }
    handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        } as any)
    }
    onSumbit = (e: React.FormEvent) => {
        e.preventDefault();
        const { email, password } = this.state;
        const { login } = this.props
        login(email, password);
    }

}

const mapStateToProps = (state: IState) => {
    return {
        isLogged: state.isLogged,
        erorr: state.errorMessage !== ""
    }
}

const mapDispatchToProps = {
    login: loginAction,
}
export const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(_Login);



function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="home">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}