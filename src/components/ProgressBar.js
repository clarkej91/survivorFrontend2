import React, {Component} from "react";
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button';

class TheProgressBar extends Component {
  render() {
    let round = '';
    let prevRound = '';
    let currentRound = '';
    switch (this.props.roundData) {
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
        <ProgressBar style={{ height: '40px' }} animated now={this.props.roundData} label={currentRound}/>
        <Button variant="outline-dark" onClick={() => this.props.updateRound('Back')}>{prevRound}</Button>
        <Button variant="outline-dark" onClick={() => this.props.updateRound('Next')}>{round}</Button>
      </div>
    );
  }
}

export default TheProgressBar;
