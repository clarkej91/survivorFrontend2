import React, {Component} from "react";
import Table from 'react-bootstrap/Table';

class Tribal extends Component {
  render() {

    // const response = this.props.response.map((data, i) => {
    //   console.log(data);
    // })
    return (
      <div>
      <Table striped bordered hover size="sm">
        <thead>
        <tr>
        {this.props.playerOutcome.map((data, i) => {
          return <th>{data.name}</th>;
        })}
        </tr>
        </thead>
        <tbody>
        {this.props.playerOutcome.map((data, i) => {
          return <th>{data.value}</th>;
        })}
        </tbody>
      </Table>
      </div>
    );
  }
}

export default Tribal;
