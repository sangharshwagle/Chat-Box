import React, { Component } from 'react';

class SendMessageForm extends Component {

    state = {
        newMessage: ''
    }

     handleChange = (event) => {
        return (
            this.setState({
                newMessage: event.target.value
            })
        )      
    }

    submitInfo = (event) => {
        event.preventDefault()
        this.props.sendMessage(this.state.newMessage)
        this.setState({
            newMessage: ''
        })
        
    }

    render() {
        return (
            <form className="send-message-form"
                  onSubmit = {this.submitInfo}>
                <input
                    value = {this.state.newMessage}
                    onChange = {this.handleChange}
                    placeholder="SendMessageForm"
                    type="text" />
            </form>
        )
    }
}

export default SendMessageForm;