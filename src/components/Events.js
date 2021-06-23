import React, {Component} from "react";
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import FormGroup from 'react-bootstrap/FormGroup'
import axios from 'axios'

const backendUrl = 'https://survivor-backend2.herokuapp.com/';
// const backendUrl = 'http://localhost:5000/';

class Events extends Component {
  constructor( props ) {
  super( props );
    this.state = {
      response: [],
      text: ""
    };
    this.getData = this.getData.bind(this);
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    axios.get(`${backendUrl}events`).then((res) => {
      const response = res.data;
      this.setState({response});
    });
  }

  onChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.text);
    axios.post(`${backendUrl}addEvent`, {
        events: this.state.text
      })
      .then(response => {
        this.setState({text: ""})
        this.getData();
      })
      .catch(error => {
        console.log(error);
      });
  };

  deleteEvent = (id) => {
    axios.delete(`${backendUrl}deleteEvent`, {
      data: {
        id: id
      }
      }).then(res => {
        this.getData();
      }).catch(err => {
        console.log(err);
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
                    <div>
                    <form onSubmit={this.handleSubmit}>
                      <label>
                        <input
                          placeholder="Add Event Here"
                          value={this.state.text}
                          onChange={this.onChange}
                        />
                      </label>
                      <input type="submit" value="Submit" />
                    </form>
                    </div>
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
                return <tr>{data.events}<button onClick={() => this.deleteEvent(data.id)}>Delete</button>
                </tr>;
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
