
const Handler = (components) => {
    return {
    handleURLUpdate : (url) => {
        console.log(url);
        components.updateConnectionURL(url);
        return url;
    },
    handleDisconnection : () => {
        components.updateConnectionURL("");
    },
    handleConnection : () => {
        console.log("Connected");
    },
    handleStompError : (err) => {
        if (err === undefined) {
            components.updateError("Connection Error to Server, please check your server.");
            components.updateConnectionURL("");
        }
        components.updateError(err);
    },
    handleStompDisconnect : () => {
        components.updateError("Socket Disconnect, Trying Again.");
    },
    handleStateChange : (State) => {
        console.log(State);
    } }
}

export default Handler;