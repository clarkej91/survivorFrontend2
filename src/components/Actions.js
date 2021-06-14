import React, {Component} from "react";

class Actions extends Component {

medevac = () => {
  let players = []
  const response = this.props.response.map((data, i) => {
    if(data.join_game === false){
      return
    } else {
      players.push(data.name)
    }
  })
  let player = Math.floor(Math.random() * players.length - 1) + 1
  this.props.getPlayer(players[player])
}

merge = () => {
  let players = []
  let tribe1 = []
  let tribe2 = []
  const response = this.props.response.map((data, i) => {
    if(data.tribe === 'none'){
      return
    } else {
      players.push(data.name)
    }
  })
  for (let i = players.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [players[i], players[j]] = [players[j], players[i]];
  }
  for (let i = 0; i < players.length; i ++){
    if(i % 2 === 0){
        this.props.updateTribeNumber(players[i], 1)
    } else {
        this.props.updateTribeNumber(players[i], 2)
    }
  }
  this.props.getData();
}
  render() {
    return (
      <div>
      <button onClick={() => this.medevac()}>Medevac Roll</button>
      <button onClick={() => this.merge()}>Merge Tribes Roll</button>
      </div>
    );
  }
}

export default Actions;
