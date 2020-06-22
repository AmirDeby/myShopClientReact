import Button from '@material-ui/core/Button';
import * as React from 'react';
import { connect } from 'react-redux';
import { logOffAction } from '../../Redux/action';
import { IState } from '../../Redux/reducer';

export interface ILogOffButtonProps {
    logOff(): void,
}

class _LogOffButton extends React.Component<ILogOffButtonProps> {
    public render() {
        return (
            <div style={{ marginRight: "10px" }}>
                <Button onClick={this.logOffOnClick} color="secondary">Sign Out</Button>
            </div>
        );
    }
    logOffOnClick = () => {
        const { logOff } = this.props;
        logOff();
    }
}

const mapStateToProps = (state: IState) => {
    return {

    }
}
const mapDispatchToProps = {
    logOff: logOffAction,
}
export const LogOfButton = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_LogOffButton)
