import { useState } from 'react';
import SimpleTestMode from './Components/SimpleTestMode'
import Handler from './Utilities/StompHandlers';
import "./Styles/Comp.css"


function Comp(){
    const [connectionURL, updateConnectionURL] = useState("");
    const [error, updateError] = useState("")
    const stompHandler = Handler({updateConnectionURL, updateError});
  
    const renderSimpleTestMode = () => {
      return (
        <SimpleTestMode connectionURL={connectionURL} handleURLUpdate = {stompHandler.handleURLUpdate} handleDisconnection={stompHandler.handleDisconnection} handleConnection={stompHandler.handleConnection} handleStompError= { stompHandler.handleStompError} handleStompDisconnect={stompHandler.handleStompDisconnect} handleStateChange={stompHandler.handleStateChange} error={error}/>
      )
    }
    
    return (
          renderSimpleTestMode()
    );
  }

  export default Comp;