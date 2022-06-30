var messages = [];

const MessageHandler = () => {

    return {
        updateArr : (arr) => {
            messages = arr;
        },
        getMessages : () => {
            return messages;
        }
    };
}

export default MessageHandler;