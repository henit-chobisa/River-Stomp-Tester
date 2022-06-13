import { useStompClient } from 'react-stomp-hooks';

const StompHandler = () => {
    
    const client = useStompClient();
    return {
        publish : (currentRoute, header, data) => {
            console.log(client);
            client.publish(currentRoute, JSON.stringify(JSON.parse(header)), JSON.stringify(JSON.parse(data)));
    }}

}

export default StompHandler;