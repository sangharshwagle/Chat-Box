import React, { Component } from 'react';

class RoomList extends Component {
    render () {
        const orderedRooms = [...this.props.rooms].sort((a,b)=> a.id-b.id)
        return (
            <div className="rooms-list">
                <ul>
                    <h3>Room List</h3>
                        {orderedRooms.map((current)=> {
                            const active = this.props.roomId === current.id ? "active":"";
                            return (
                                <li key = {current.id}
                                    className = {"room " + active}>
                                    <a 
                                        onClick = {() => {this.props.subscribeRoom (current.id)}}
                                        href = "#">{current.name}</a>
                                </li>
                            )
                        })}
                </ul>
            </div>
        )
    }
}

export default RoomList;