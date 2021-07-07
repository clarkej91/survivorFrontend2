import React, {Component} from "react";
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button';

class TheProgressBar extends Component {

  componentDidMount = () => {
    this.props.getRoundMessage();
  }
  currentPos = (data) => {
    switch (this.props.roundDataMes) {
      case 0:
        if(data === 'Next'){
          this.props.sendRoundMessage(this.props.roundDataMes + 25)
        } else {
          this.props.sendRoundMessage(100)
        }
        break;
      case 25:
        if(data === 'Next'){
          this.props.sendRoundMessage(this.props.roundDataMes + 25)
        } else {
          this.props.sendRoundMessage(this.props.roundDataMes - 25)
        }
        break;
      case 50:
        if(data === 'Next'){
          this.props.sendRoundMessage(this.props.roundDataMes + 25)
        } else {
          this.props.sendRoundMessage(this.props.roundDataMes - 25)
        }
        break;
      case 75:
        if(data === 'Next'){
          this.props.sendRoundMessage(this.props.roundDataMes + 25)
        } else {
          this.props.sendRoundMessage(this.props.roundDataMes - 25)
        }
        break;
      case 100:
        if(data === 'Next'){
          this.props.sendRoundMessage(0)
        } else {
          this.props.sendRoundMessage(this.props.roundDataMes - 25)
        }
        break;
    }
  }
  render() {
    let round = '';
    let prevRound = '';
    let currentRound = '';
    switch (this.props.roundDataMes) {
      case 0:
        currentRound = 'Begin Round';
        round = 'Go To Camp Life Pre Challenge';
        prevRound = 'Tribal Council';
        break;
      case 25:
        currentRound = 'Camp Life Pre Challenge';
        round = ' Go To Challenge';
        prevRound = 'Start Round';
        break;
      case 50:
        currentRound = 'Challenge';
        round = ' Go To Camp Life Pre Tribal';
        prevRound = 'Camp Life Pre Challenge';
        break;
      case 75:
        currentRound = 'Camp Life Pre Tribal';
        round = 'Go To Tribal Council';
        prevRound = 'Challenge';
        break;
      case 100:
        currentRound = 'Tribal Council';
        round = 'Go To Next Round';
        prevRound = 'Challenge Pre Tribal';
        break;
    }
    return (
      <div>
        <ProgressBar style={{ height: '40px' }} animated now={this.props.roundDataMes} label={currentRound}/>
        <Button variant="outline-dark" onClick={() => this.currentPos('Back')}>{prevRound}</Button>
        <Button variant="outline-dark" onClick={() => this.currentPos('Next')}>{round}</Button>
      </div>
    );
  }
}

export default TheProgressBar;
