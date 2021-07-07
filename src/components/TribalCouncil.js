import React, {Component} from "react";
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

class TribalCouncil extends Component {
  constructor( props ) {
  super( props );
  this.state = {
    voteOutcome: [],
    value: [],
    tribe1: [],
    tribe2: [],
    tribe3: [],
    tribe: [],
    revote: []
  }
}


  voteFunc = (event) => {
    event.preventDefault();
    switch(parseInt(this.state.value)){
      case 0:
        this.votingSort(this.props.tribe1.tribe1)
        break;
      case 1:
        this.votingSort(this.props.tribe2.tribe2)
        break;
      case 2:
        this.votingSort(this.props.tribe3.tribe3)
        break;
    }
  }

  votingSort = (data) =>{
    console.log(data)
    let votes = []
    this.setState({tribe: data})
    for(let i = 0; i < data.length; i ++){
      let smallestValue = []
        for(let j = 0; j < data.length; j ++){
          if(data[i] === data[j]){
            continue;
          }
          let diceRoll = data[j].likeness * data[j].likeness
          let rollValue = Math.floor(Math.random() * diceRoll)
          let immunity = data[j].immunity
          if(smallestValue.length === 0){
            smallestValue = [data[j].name, rollValue, immunity]
          }
          else if(smallestValue[1] > rollValue) {
            smallestValue = [data[j].name, rollValue, immunity]
          }
          else if(smallestValue[1] === rollValue) {
            let decision = [smallestValue, [data[j].name, rollValue, immunity]]
            let tieBreaker = Math.floor(Math.random() * 2);
            smallestValue = decision[tieBreaker]
          } else {

          }
        }
        votes.push(smallestValue)
    }
    this.props.sendTribalVotes(votes);
  }

  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({value: event.target.value});
    event.preventDefault();
  }

  readVotes = () => {
    this.revealAllVotes(true);
    for (let i = 0; i < this.props.tribalMessage.length; i++) {
      setTimeout(() => {
          this.props.readVotes(this.props.tribalMessage[i][0])
      }, 5000 * i);
    }
  }

  revealAllVotes = (data) => {
    setTimeout(() => {
        this.props.revealAllVotes(data)
    }, 5000 * this.props.tribalMessage.length - 1);
  }

  setToTrue = () => {
    console.log(true)
  }

  // onSelectedRow = (data, clickEvent) => {
  //   console.log(data);
  //   this.setState({revote: data})
  // }

  revote = () => {
    console.log(this.props.revote, this.state.tribe)
    let votes = []
    this.props.revealAllVotes(false)
    this.props.sendTribalVotes(votes);
    for(let i = 0; i < this.state.tribe.length; i ++){
      let smallestValue = []
        for(let j = 0; j < this.props.revote.length; j ++){
          if(this.state.tribe[i].name === this.props.revote[j].name){
            continue;
          }
          let diceRoll = this.props.revote[j].likeness * this.props.revote[j].likeness
          let rollValue = Math.floor(Math.random() * diceRoll)
          let immunity = false
          if(smallestValue.length === 0){
            smallestValue = [this.props.revote[j].name, rollValue, immunity]
          }
          else if(smallestValue[1] > rollValue) {
            smallestValue = [this.props.revote[j].name, rollValue]
          }
          else if(smallestValue[1] === rollValue) {
            let decision = [smallestValue, [this.props.revote[j].name, rollValue, immunity]]
            let tieBreaker = Math.floor(Math.random() * 2);
            smallestValue = decision[tieBreaker]
          } else {

          }
        }
        votes.push(smallestValue)
    }
    this.props.sendTribalVotes(votes);
  }

  render() {
      const readVotes = this.props.tribalMessage.map((data, i) => {
          return(
            <tr key={i}>
            {data[2] === false &&
              <td>
              {data[0]}
              </td>
            }
              {data[2] === true &&
                <td>
                {data[0]} does not count
                </td>
              }
            </tr>
          )
      })
    return (
      <div>
      <form onSubmit={this.voteFunc}>
      <select
        onChange={this.handleChange}>
      <option value={4}></option>
      <option value={0}>tribe1</option>
      <option value={1}>tribe2</option>
      <option value={2}>tribe3</option>
      </select>
      <input type="submit" value="Vote" />
      </form>


      {this.props.tribalMessage.length > 0 &&
        <div>
        {this.props.showAllTribalVote === false &&
          <div>
          Voting...
          <Spinner animation="border" />
          </div>
        }
        {this.props.showAllTribalVote === true &&
          <div>
            If anyone has an idol, now will be time it play it
            <button onClick={() => this.readVotes()}>Read The Votes</button>
          </div>
        }
        </div>
      }
      {this.props.revealVotes === true &&
        <div>
        <Table striped bordered hover size="sm">
          <tr>
          {this.state.tribe.map(data => {
            return <th><h4>{data.name}</h4></th>;
          })}
          </tr>
          <tr>
          {this.props.tribalMessage.map(data => {
            return <th><h5>Vote Cast For: <br/>{data[0]}</h5></th>
          })}
          </tr>
          <tbody>
          </tbody>
        </Table>
        <button onClick={() => this.revote()}>revote</button>
        </div>
      }

      {this.props.showtribalVote === false &&
        <div>
        <Spinner animation="border" />
        </div>
      }
      {this.props.showtribalVote === true &&
        <div>
        {this.props.revealVotes === false &&
          <div>
          {this.props.tribalVote}
          </div>
        }
        </div>
      }
      {this.props.revote.map((data, i) => {
        return(
          <span style={{fontSize: '25px'}}>
          {`${data.name} `}
          </span>
        )
      })}
      </div>
    );
  }
}

export default TribalCouncil;
