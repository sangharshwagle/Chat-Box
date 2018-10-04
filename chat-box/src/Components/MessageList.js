import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Message from './Message';




class MessageList extends Component{

    componentDidUpdate () {
        const node = ReactDom.findDOMNode(this)
        node.scrollTop = node.scrollHeight
    }
 
    render (){
        return (
            <div className = "message-list">
            {this.props.messages.map((current, index)=>{
                return (
                    <Message  key = {index} 
                    username = {current.senderId}
                    message = {current.text}/>
                )
            })}
            </div>
        )
    }
}

export default MessageList;

