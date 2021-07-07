import React, {Component} from "react";
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

class Tribal extends Component {
  constructor( props ) {
  super( props );
  this.state = {
    voteOutcome: [],

  }
}

  voteFunc = () => {

  }
  render() {
    console.log(this.props.playerOutcome)
    // const response = this.props.response.map((data, i) => {
    //   console.log(data);
    // })
    return (
      <div>
      {this.props.message === 'voting' &&
        <div>
        Voting...
        <Spinner animation="border" />
        </div>
      }
      {this.props.message === 'tally' &&
        <div>
        I'll Go Tally The Votes...
        <Spinner animation="border" />
        </div>
      }
      {this.props.message === 'decision' &&
        <div>
        Once the votes are read the decision is final...
        <Spinner animation="border" />
        </div>
      }
      {this.props.message === 'true' &&
        <div>
        <Table striped bordered hover size="sm">
          <thead>
          <tr>
          {this.props.playerOutcome.map((data, i) => {
            // console.log(data.name)
            if(data.tribal === true){
            return <th>{data.name}</th>;
            }
          })}
          </tr>
          </thead>
          <tbody>
          {this.props.playerOutcome.map((data, i) => {
            if(data.tribal === true){
            return <th>{data.playerscore}</th>;
            }
          })}
          </tbody>
        </Table>
        </div>
      }
      </div>
    );
  }
}

export default Tribal;
