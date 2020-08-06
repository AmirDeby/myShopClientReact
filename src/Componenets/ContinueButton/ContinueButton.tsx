import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IState } from '../../Redux/reducer';
import '../../Componenets/ContinueButton/ContinueButton.css'

export interface IContinueButtonProps {
}

class _ContinueButton extends React.Component<IContinueButtonProps> {
    public render() {
        return (
            <Link to="/payment">
                <Button
                    className="block-btn"
                    variant="contained"
                    color="primary"
                    endIcon={<Icon>send</Icon>}
                    size="large"
                >
                    Go to Payment Page
            </Button>
            </Link>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {

    }
}
const mapDispatchToProps = {

}

export const ContinueButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ContinueButton)