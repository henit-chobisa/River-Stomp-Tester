import {useState} from "react"
import JSONInput from "react-json-editor-ajrm"
import locale from 'react-json-editor-ajrm/locale/en'
import testData from '../../Assets/testData';
import { useStompClient } from "react-stomp-hooks";
import SubsItem from './SubsItem';
import { useRef } from 'react';
import bell from "../../Assets/bell.wav";
import { useEffect } from "react";


const ResultTab = (props) => {
    var audio = new Audio(bell);
    const subscriptionList = useRef();
    const [currentSubscription, updateCurrentSubscription] = useState("Current Route")
    const [resultData, updateResultData] = useState(testData);
    const [currentCounter, updateCurrentCounter] = useState(0);
    const [subsText, updateSubsText] = useState("");
    const [initSubs, updateInitSubs] = useState(false);
    const [subscriptions, updateSubscriptions] = useState([]);
    const [added, updateAdded] = useState(0);
    const client = useStompClient();

    useEffect(() => {

        if (initSubs === false){
            var subs = localStorage.getItem("Subscriptions");
            if (subs === null){
                localStorage.setItem("Subscriptions", JSON.stringify([]));
            }
            else {
                var subsArr = JSON.parse(subs);
                subsArr.map((sub) => {
                    sub.isActive = false;
                })
                updateSubscriptions(subsArr);
            }
            updateInitSubs(true);
        }
        if (added !== 0){
            localStorage.removeItem("Subscriptions");
            localStorage.setItem("Subscriptions", JSON.stringify(subscriptions));
        }
        if (subscriptions.length > 3) {
            if (added === 1) {
                scrollIndexSubscriptions(subscriptions.length - 1);
                updateAdded(0);
            }
        }
    }, [subscriptions, added, initSubs])

    const scrollIndexSubscriptions = (index) => {
        if (index > 2) {
            subscriptionList.current.getElementsByClassName("subsItem")[index].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    }

    const handleSubscriptionAdd = () => {
        if (subsText.length !== 0) {
            var present = false;
            var clone = subscriptions.slice(0);
            clone.map((obj) => {
                if (obj.route === subsText) {
                    present = true;
                }
                return obj;
            })
            if (present === false) {
                clone.push({ route: subsText, key: Math.random(100), data: {}, isActive: false, counter: 0 });
                updateSubscriptions(clone);
                updateSubsText("");
                updateAdded(1);
            }
        }
    }

    const loadSubscriptions = () => {
        if (subscriptions.length !== 0) {
            return subscriptions.map((subscription, index) =>
                <SubsItem route={subscription.route} index={index} handleListPop={handleSubsPop} handleSubsMessage={handleSubscriptionMessage} handleSubsClick={handleSubsClick} isActive={subscription.isActive} isSubscribed={true} />
            )
        }
        else {
            return (<p className='warning'> No Subscriptions added yet</p>)
        }
    }

    function handleSubsPop(index) {
        var clone = subscriptions.splice(0);
        var wasActive = clone[index].isActive;
        client.unsubscribe(clone[index].route);
        clone.splice(index, 1);
        if (wasActive === true) {
            if (clone.length > 0) {
                if (index === 0) {
                    clone[index].isActive = true;
                    updateCurrentCounter(clone[index].counter);
                    updateCurrentSubscription(clone[index].route);
                    updateResultData(clone[index].data);
                }
                else {
                    clone[index - 1].isActive = true;
                    updateCurrentCounter(clone[index - 1].counter);
                    updateCurrentSubscription(clone[index - 1].route);
                    updateResultData(clone[index - 1].data);
                }
            }
            else {
                updateCurrentCounter(0);
                updateResultData(testData);
                updateCurrentSubscription("Current Route")
            }
        }
        else {
            if (clone.length === 0) {
                updateCurrentCounter(0);
            }
        }
        updateAdded(2);
        updateSubscriptions(clone);
    }

    const handleSubscriptionMessage = (message, index) => {
        var dup = [...subscriptions];
        var data = JSON.parse(message);
        if (JSON.stringify(dup[index].data) === JSON.stringify(data)) {
            dup[index].counter = dup[index].counter + 1;
        }
        else {
            dup[index].data = data;
        }
        updateSubscriptions(dup);
        handleSubsClick(index, { tagName: "DIV" });
        scrollIndexSubscriptions(index);
        updateAdded(1);
        if (props.soundOn === true){
            audio.play();
        }
    }

    const handleSubsClick = (index, target) => {
        if (target.tagName === "DIV") {
            var clone = [...subscriptions];
            clone.map((sub) =>
                sub.isActive = false
            )
            clone[index].isActive = true;
            updateCurrentCounter(clone[index].counter);
            updateCurrentSubscription(clone[index].route);
            updateResultData(clone[index].data);
            updateSubscriptions(clone);
            localStorage.setItem("SubsSelection", index)
        }
    }

    return (
        <div className='resultBar'>
                    <div className='resTitleBar'>
                        Hearings
                        <div className='subsInp'>
                            <input type="text" placeholder='Add Subscriptions here' value={subsText} onChange={(evt) => updateSubsText(evt.target.value)} />
                            <button style={{ color: "white" }} onClick={handleSubscriptionAdd}>+</button>
                        </div>
                    </div>
                    <div className='subsList' ref={subscriptionList}>
                        {loadSubscriptions()}
                    </div>

                    <div className='resultEditor'>
                        <JSONInput
                            id='a_unique_id'
                            placeholder={{ resultData }}
                            locale={locale}
                            height="100%"
                            width="100%"
                            viewOnly={true}
                        />
                    </div>
                    <div className="resultName">
                        <p>
                            {currentSubscription}
                        </p>
                        {currentCounter !== 0 ? <div className='resultCounter'>
                            {currentCounter}
                        </div> : <></>}
                    </div>
                </div>
            
    );
}

export default ResultTab;