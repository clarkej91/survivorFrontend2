import React, {Component} from "react";
import {BrowserRouter as Router, Route,Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Home from './Home.js'
import Events from './Events.js'

class NavigationBar extends Component {
  constructor( props ) {
  super( props );
  }
  render() {
    return (
      <div>
      <Router>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Lost</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/events">Events</Nav.Link>
          <Nav.Link href="#Logs">Logs</Nav.Link>
        </Nav>
      </Navbar>
      <Route exact path='/' render={
        (props) =>
          <Home {...props}
            response={this.props.response}
            eventRespone={this.props.eventRespone}
            playerResponse={this.props.playerResponse}
            tribeRespone={this.props.tribeRespone}
            challengeResponse={this.props.challengeResponse}
          />
      } />
      <Route exact path="/events" component={Events}/>
      </Router>
      </div>
    );
  }
}

export default NavigationBar;
