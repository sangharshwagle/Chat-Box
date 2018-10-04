import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';
import Messagelist from './Components/MessageList';
import NewRoomForm from './Components/NewRoomForm';
import RoomList from './Components/RoomList';
import SendMessageForm from './Components/SendMessageForm';
import './App.css';
import { tokenUrl, instanceLocator } from './Config';



class App extends Component {

  state = {
    messages: [],
    joinableRooms: [],
    joinedRooms: [],
    roomId:null
  }

  componentDidMount (){
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: 'sang01',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    })
      chatManager.connect()
        .then((currentUser) => {
          this.currentUser = currentUser;/* this makes it available to the whole component instead of localy scoped */
            this.getRooms()
           
        })
        .catch ((error)=> {
          console.log(`There is an error trying to connect to the ChatKit API :`, error)
        })
  }

  getRooms = () => {
    this.currentUser.getJoinableRooms()
    .then ((joinableRooms)=> {
      this.setState({
        joinableRooms: joinableRooms,
        joinedRooms:this.currentUser.rooms
      })
    })
    .catch ((error) =>{
      console.log(`There is an error in joinableRoom: `, error)
    } )
  }
  

  subscribeToRoom = (roomId)=> {
    this.setState({
      messages: []
    })
    this.currentUser.subscribeToRoom({
      roomId:roomId,
      hooks: {
        onNewMessage: (message) => {
          this.setState({
            messages:[...this.state.messages, message]
          })
        }
      }
    })
    .then ((rooms) => {
      this.setState({
        roomId: rooms.id
      })
      this.getRooms()
    })
    .catch ((error) => {
      console.log(`error on subscribing to the room: `, error)
    })
  }
  

  sendMessages = (text) => {
    this.currentUser.sendMessage({
      text: text,
      roomId: this.state.roomId
    })
  }

  createRoom = (name) => {
    this.currentUser.createRoom({
      name: name,
    })
    .then (room => this.subscribeToRoom(room.id))
    .catch (error => console.log(`error in create room: `, error))
  }

  render() {
    return (
      <div className = "app">
      <RoomList 
               roomId = {this.state.roomId}
               subscribeRoom = {this.subscribeToRoom}
               rooms = {[...this.state.joinableRooms, ...this.state.joinedRooms]}/>

      <Messagelist messages = {this.state.messages}/>
      <SendMessageForm sendMessage = {this.sendMessages}/>
      <NewRoomForm createRoom = {this.createRoom}/>
        
      </div>
    );
  }
}

export default App;
