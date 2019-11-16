import React, { Component } from 'react'

import firebase from 'firebase'

export default class App extends Component {

  constructor(props) {

    super(props)

    this.app = firebase.initializeApp({
      apiKey: "AIzaSyAdKa29CrGJNUeH6UbzMVGET55JjfJkq4A",
      authDomain: "formysquad-hassan.firebaseapp.com",
      databaseURL: "https://formysquad-hassan.firebaseio.com",
      projectId: "formysquad-hassan",
      storageBucket: "formysquad-hassan.appspot.com",
      messagingSenderId: "894338771471",
      appId: "1:894338771471:web:04b14de017ecce4293117a",
      measurementId: "G-K74NZQYFEY"
    })

    this.database = this.app.database().ref().child('LED')

    this.state = {

      LED1: false,
      LED2: false
    }
  }

  componentDidMount() {


    this.database.on('value', snapshot => {

      let ledReturn1 = snapshot.child('LED1').val()
      let ledReturn2 = snapshot.child('LED2').val()
      this.setState({
        LED1: ledReturn1,
        LED2: ledReturn2
      })
    })
  }

  render() {

    return (

      <div>


<h2>LED1</h2>
        <DisplayLED LED={this.state.LED1} name={'LED1'} />

        <button onClick={() => {

          this.database.child('LED1').set(true)

        }}>Turn me on</button>

        <button onClick={() => {


          this.database.child('LED1').set(false)

        }}>Turn me off</button>


<h2>LED2</h2>
        <DisplayLED LED={this.state.LED2} name={'LED2'} />

        <button onClick={() => {

          this.database.child('LED2').set(true)

        }}>Turn me on</button>

        <button onClick={() => {


          this.database.child('LED2').set(false)

        }}>Turn me off</button>

      </div>
    )
  }
}

function DisplayLED(props) {

  console.log(`${props.name} is ${props.LED}`)

  var image = props.LED ? <img src={require('./green.jpg')} width='128' height='128'></img> : <img src={require('./red.jpg')} width='128' height='128'></img>

  return (
    <div>
      {image}
    </div>
  )
}