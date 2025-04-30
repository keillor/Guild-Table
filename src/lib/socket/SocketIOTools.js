import { io } from "socket.io-client";

export class GuildSocket {
    constructor(URL, access_token, campaign) {
        this.socket = io(URL, {
            auth: {
                token: access_token,
                campaign: campaign
            }
        });

        /* // Listen for messages
        this.socket.on('message', (msg) => {
            console.log(msg);
            return msg
        });

        this.socket.on('dragableMoved', (pos) => {
            //update position of item
            return pos
        })

        this.socket.on('createShape', (pos) => {
            //generate shape
            //properties
            return pos
        })

        this.socket.on('removeShape', (shape) => {
            //remove shape
            //properties: shapeId, label, points
            return shape
        })

        this.socket.on('roll', (roll) => {
            //toast
            //properties: characterId, label, dice, result
            return roll
        })

        this.socket.on('healthUpdate', (hp) => {
            //hp.characterId
            //hp.hp
            return hp
        }) */
    }

    // Method to send a message
    sendMessage(event, data) {
        this.socket.emit(event, data);
    }

    updatePOS(x,y,id,type) {
        this.socket.emit('dragableMoved', {x,y,id,type});
    }

    createShape(shapeId, label, points) {
        this.socket.emit('createShape', {shapeId, label, points});
    }

    deleteShape(shapeId) {
        this.socket.emit('removeShape', {shapeId})
    }

    roll(characterId, label, dice, result) {
        this.socket.emit('roll', characterId, label, dice, result);
    }

    healthUpdate(characterId, hp) {
        this.socket.emit('healthUpdate', {characterId, hp})
    }

    moveMarker(markerObject) {
        this.socket.emit('moveMarker', markerObject);
    }

    on(event, callback) {
        this.socket.on(event, callback);
    }

    // Disconnect the socket
    disconnect() {
        this.socket.disconnect();
    }
}