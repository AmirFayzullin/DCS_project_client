export class WSApi {
    _listeners = [];

    constructor({url}) {
        this._url = url;
    }

    _onOpen = (event) => {
        console.log("[WS]: Connection established");
        this._notifyListeners("open", event);

        this._socket.addEventListener("message", this._onMessage);
        this._socket.addEventListener("error", this._onError);
        this._socket.addEventListener("close", this._onClose);
    };

    _onError = (event) => {
        console.log("[WS]: Error " + event);
        this._notifyListeners("error", event);
    };

    _onMessage = (event) => {
        console.log("[WS]: Message " + event);
        this._notifyListeners("message", event);
    };

    _onClose = (event) => {
        console.log("[WS]: Connection closed");
        this._notifyListeners("close", event);
    };


    _notifyListeners = (type, event) => {
        this._listeners.forEach(l => {
            try {
                l.listeners[type](event);
            } catch(err) {
                console.log("[WS]: " + err);
            }
        })
    };

    connect = () => {
        this._socket = new WebSocket(this._url);

        this._socket.addEventListener("open", this._onOpen)
    };

    setListeners = (listeners) => {
        const id = (Math.random() * (10 ** 10)).toFixed(0);

        this._listeners.push({
            id,
            listeners
        });

        return () => this.removeListener(id);
    };

    removeListener = (id) => {
        this._listeners.filter(l => l.id !== id);
    };

    send = (event, payload) => {
        this._socket.send(JSON.stringify({event, payload}), (err) => {
            console.log("[WS]: Error send - " + err);
        });
    }
}