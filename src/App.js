import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import ChatMessage from './ChatMessage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "https://fathomless-atoll-63559.herokuapp.com/",
      name: '',
      messages: [],
      message: '',
      socket: false,
      receivedMessage: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);


  }

  componentDidMount() {
    const { endpoint } = this.state;
    this.socket = socketIOClient(endpoint);
          let that = this;
      this.socket.on('RECEIVE_MESSAGE', function(data){
            console.log('receiving data ', data);
            that.receiveMessage(data);
        });
  }

  receiveMessage(data) {
    this.setState(prevState => ({
      messages: [data, ...prevState.messages]
    }));
    console.log('receive a message ', data);
  }


  sendMessage(ev) {
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.name,
                message: this.state.message
            })
            this.setState({message: ''});
  }


  handleChangeMessage(event) {
    this.setState({message: event.target.value});
  }


  handleChangeName(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('submitting a message ', this.state.message);
    this.sendMessage();
  }

  handleSubmitName(e) {
    e.preventDefault();
    console.log('submitting a message ', this.state.name);
    this.sendMessage();
  }

  render() {
    const { messages } = this.state;

    return (
        <div style={{ textAlign: "center" }}>

        <form>
          <label>
            Name:
            <input type="text" value={this.state.name} onChange={this.handleChangeName} name="name" />
          </label>
         </form>
          
          <form onSubmit={this.handleSubmit}>
            <label>
              Message:
              <input type="text" value={this.state.message} onChange={this.handleChangeMessage} name="message" />
            </label>
            <input type="submit" value="Submit message" />
          </form>
          <div>{messages.map((messageData, index) => {
            return <ChatMessage messageData={messageData} key={index} />
          })}</div>
        </div>
    );
  }
}

export default App;