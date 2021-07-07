import React, {Component} from "react";
import {BrowserRouter as Router, Route,Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Home from './Home.js'
import Events from './Events.js'
import Actions from "./Actions.js"

class NavigationBar extends Component {
  constructor( props ) {
  super( props );
  }
  render() {
    return (
      <div>
      <Router>
      <Route exact path='/' render={
        (props) =>
          <Home {...props}
            response={this.props.response}
            onSelectedRow={this.props.onSelectedRow}
            addLikeness={this.props.addLikeness}
            subtractLikeness={this.props.subtractLikeness}
            addStrength={this.props.addStrength}
            subtractStrength={this.props.subtractStrength}
            addWit={this.props.addWit}
            subtractWit={this.props.subtractWit}
            handleInputChange={this.props.handleInputChange}
            handleIdolChange={this.props.handleIdolChange}
            updateChallenge={this.props.updateChallenge}
            playerRoll={this.props.playerRoll}
            diceRoll={this.props.diceRoll}
            eventOutcomeRoll={this.props.eventOutcomeRoll}
            idolRoll={this.props.idolRoll}
            idolRollState={this.props.idolRollState}
            showCampLife={this.props.showCampLife}
            showTribal={this.props.showTribal}
            updateTribe={this.props.updateTribe}
            handleChange={this.props.handleChange}
            value={this.props.value}
            getData={this.props.getData}

            eventRespone={this.props.eventRespone}
            playerResponse={this.props.playerResponse}
            tribeRespone={this.props.tribeRespone}
            challengeResponse={this.props.challengeResponse}
          />
      } />
      <Route exact path="/events" component={Events}/>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Lost X Survivor</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/events">Events</Nav.Link>
          <Nav.Link href="#Logs">Logs</Nav.Link>
        </Nav>
        <Actions
        updateShowData={this.props.updateShowData}
        getData={this.props.getData}
        getPlayer={this.props.getPlayer}
        response={this.props.response}
        updateTribeNumber={this.props.updateTribeNumber}
        />
      </Navbar>
      </Router>
      </div>
    );
  }
}

export default NavigationBar;
