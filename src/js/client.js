const io = require('socket.io-client')
const host = 'http://kevin.duidelijkheid.nu:8081'

export class Client {

    constructor() {
        this._reset();
    }

    connect(host) {
        this._socket = io(host);
        this._bindEvents();
    }

    on(event, callback) {
        this._socket.on(event, callback);
    }

    call(action, callback, ...rest) {
        if (callback) {
            this._socket.emit(action, ...rest, callback);
        } else {
            this._socket.emit(action, ...rest);
        }
    }

    _reset() {
        this._reconnectTimerId = null;
    }

    _bindEvents() {
        this._socket.on('connect', () => {
            console.log('connected event');

            if (this.onConnected) {
                this.onConnected();
            }
        });

        this._socket.on('display', (data) => {
            console.log('received display event', data);
            if (this.onDisplayChanged) {
                this.onDisplayChanged(data.source);
            }
        });  
    }

}