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


export interface IPaymentDetailsProps {
}
interface IPaymentDetailsState {
  cardName: string,
  cardNumber: string,
  expDate: string,
  cvv: string,
}

class _PaymentDetails extends React.Component<IPaymentDetailsProps, IPaymentDetailsState> {
  state: IPaymentDetailsState = {
    cardName: "",
    cardNumber: "",
    cvv: "",
    expDate: "",
  }
  public render() {
    const { expDate, cvv, cardNumber, cardName } = this.state;
    return (
      <Form>
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Payment method
      </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                value={cardName}
                onChange={this.handleOnChange} select required
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
                onChange={this.handleOnChange}
                required
                name="cardNumber"
                label="Card number"
                fullWidth
                autoComplete="cc-number"
              />
            </Grid>
            <Grid style={{ marginTop: "16px" }} item xs={12} md={6}>
              <TextField value={expDate} type="date" onChange={this.handleOnChange} required name="expDate" fullWidth autoComplete="cc-exp" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                value={cvv}
                onChange={this.handleOnChange}
                required
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
    console.log(this.state);
  }
}
const mapStateToProps = (state: IState) => {
  return {

  }
}
const mapDispatchToProps = {

}
export const PaymentDetails = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_PaymentDetails)