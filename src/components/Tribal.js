import React, {Component} from "react";
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

class Tribal extends Component {

  render() {
    // const response = this.props.response.map((data, i) => {
    //   console.log(data);
    // })
    console.log(this.props.showTriablOutCome)
    return (
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
    );
  }
}

export default Tribal;
