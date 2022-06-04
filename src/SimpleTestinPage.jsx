
import ResultTab from "./Components/SimpleTestingPage/ResultTab";
import RouteTab from "./Components/SimpleTestingPage/RouteTab";

const SimpleTestingPage = (props) => {

    // Utilities for Hearing

    

    return (
        <div className='bottomBar'>
            <RouteTab/>
            <ResultTab soundOn={props.soundOn}/>
        </div>    
    );
}

export default SimpleTestingPage;