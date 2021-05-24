import React, {Component} from "react";
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

// const backendUrl = 'https://survivor-backend2.herokuapp.com/';
const backendUrl = 'http://localhost:5000/';

class Events extends Component {
  constructor( props ) {
  super( props );
    this.state = {
      response: []
    };
    this.getData = this.getData.bind(this);
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    axios.get(`${backendUrl}events`).then((res) => {
      const response = res.data;
      console.log(response);
      this.setState({response});
    });
  }
  render() {
    return (
      <div>
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Click For Events
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
            <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Click To Add Events
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            <Table striped bordered hover size="sm">
              <thead>
              <tr>
              Events
              </tr>
              </thead>
              <tbody>
              {this.state.response.map((data, i) => {
                return <tr>{data.events}</tr>;
              })}
              </tbody>
            </Table>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      </div>
    );
  }
}

export default Events;
