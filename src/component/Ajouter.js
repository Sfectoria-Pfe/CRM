import React, { Component } from 'react'

export default class Ajouter extends Component {
    constructor(props){
        super()
    }
  render() {
    return (
      <div>
        <button onclick="this.showForm">add formulaire</button>
      </div>
    )
  }
}
