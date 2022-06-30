var messages = [];

const MessageHandler = () => {

    return {
        updateArr : (arr) => {
            messages = arr;
            console.log(messages);
        },
        getMessages : () => {
            return messages;
        },
        removeAtIndex : (index) => {
            messages.splice(index, 1);
            console.log(messages);
        }
    };
}

export default MessageHandler;