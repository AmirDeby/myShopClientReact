import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import { IState } from '../../Redux/reducer';
import MenuItem from '@material-ui/core/MenuItem';
import { cardsNames } from '../PaymentDetails/CardsNames';
import Form from 'react-bootstrap/Form';
import { Button } from '@material-ui/core';
import { sendCreditCardDetailsAction } from '../../Redux/action';
import { DatePicker } from "@material-ui/pickers";
import { } from 'date-fns';

const REGEX_CREDIT_CARD = "^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$"

export interface IPaymentDetailsProps {
  sendCreditCard(cardName: string, cardNumber: string, cvv: string, expDate: string): void,
}
interface IPaymentDetailsState {
  cardName: string,
  cardNumber: string,
  expDate: Date,
  cvv: string,
}

class _PaymentDetails extends React.Component<IPaymentDetailsProps, IPaymentDetailsState> {
  state: IPaymentDetailsState = {
    cardName: "",
    cardNumber: "",
    cvv: "",
    expDate: null,
  }
  public render() {
    const { expDate, cvv, cardNumber, cardName } = this.state;
    console.log({ cardName })
    return (
      <Form onSubmit={this.onSubmit}>
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Payment method
            </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                value={cardName}
                onChange={this.handleOnChange}
                select
                name="cardName" label="Name on card"
                fullWidth autoComplete="cc-name">
                {cardsNames.map(cardName =>
                  <MenuItem key={cardName} value={cardName}>
                    {cardName}
                  </MenuItem>
                )}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                value={cardNumber}
                inputProps={{
                  pattern: REGEX_CREDIT_CARD,
                }}
                required
                onChange={this.handleOnChange}
                name="cardNumber"
                label="Card number"
                fullWidth
                aria-describedby="component-error-text"
                autoComplete="cc-number"
              />
            </Grid>
            <Grid style={{ marginTop: "16px" }} item xs={12} md={6}>
              <DatePicker
                required
                views={["year", "month"]}
                label="Year and Month"
                name="expDate"
                helperText="With min and max"
                minDate={new Date("2020-06-01")}
                maxDate={new Date("2027-06-01")}
                value={expDate}
                onChange={this.handleChangeDate}
              />
              {/* <TextField value={expDate} type="date" onChange={this.handleOnChange} required name="expDate" fullWidth autoComplete="cc-exp" /> */}
            </Grid>
            <Grid style={{ marginTop: "15px" }} item xs={12} md={6}>
              <TextField
                required
                value={cvv}
                onChange={this.handleOnChange}
                name="cvv"
                label="CVV"
                helperText="Last three digits on signature strip"
                fullWidth
                autoComplete="cc-csc"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                label="Remember credit card details for next time"
              />
            </Grid>
          </Grid>
        </React.Fragment>
        <Button type="submit" color="secondary" variant="contained">
          Save Changes
        </Button>
      </Form>
    );
  }
  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    } as any);
  }
  handleChangeDate = (date: Date) => {
    this.setState({
      expDate: date,
    })
  }
  onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { cardName, cardNumber, cvv, expDate } = this.state;
    const { sendCreditCard } = this.props;
    sendCreditCard(cardName, cardNumber, cvv, expDate as any);
    this.setState({
      cardName: "",
      cardNumber: "",
      cvv: "",
      expDate: null
    })
  }
}
const mapStateToProps = (state: IState) => {
  return {

  }
}
const mapDispatchToProps = {
  sendCreditCard: sendCreditCardDetailsAction,
}
export const PaymentDetails = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_PaymentDetails)