import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { App } from './App';
import { reducer } from './Redux/reducer';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils  from '@date-io/date-fns';

const logger = createLogger({ collapsed: true });
const middleware = [thunk, logger];

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(...middleware),
    // other store enhancers if any
));

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <CssBaseline>
                    <App />
                </CssBaseline>
            </MuiPickersUtilsProvider>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
