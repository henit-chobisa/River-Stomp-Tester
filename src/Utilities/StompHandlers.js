
const Handler = (components) => {
    return {
    handleURLUpdate : (url) => {
        components.updateError("");
        components.updateConnectionURL(url);
        return url;
    },
    handleDisconnection : () => {
        components.updateError("Stomp Intentionally Disconnected or connection fault detected by system")
        components.updateConnectionURL("");
    },
    handleConnection : () => {
    },
    handleStompError : (err) => {
        if (err === undefined) {
            components.updateError("Connection Error to Server, please check your server."); 
        }
        components.updateConnectionURL("");
        components.updateError(err);
    },
    handleStompDisconnect : () => {
        components.updateConnectionURL("");
    },
    handleStateChange : (State) => {
    } }
}

export default Handler;