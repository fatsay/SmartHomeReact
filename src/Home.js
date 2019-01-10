/**
 * Created by fatih on 2019-01-10.
 */
/**
 * Created by fatih on 2019-01-07.
 */

import React, {Component} from 'react';
import fire from './config/Fire';

import './App.css';
import smartHome from './images/HomeImage2.png';

import Header from "./components/header";
import LightControl from "./components/lightControl";
import BurglarAlarm from "./components/burglarAlarm";
import LightOutSide from "./components/lightOutside";
import FireAlarm from "./components/fireAlarm";
import WindowControl from "./components/winowControl";
import StoveOn from "./components/stoveOn";
import PowerOutage from "./components/powerOutage";
import DoorControl from "./components/doorOpen";
import WaterLeak from "./components/waterLeak";
import Radiator from "./components/radiator";
import TempOutside from "./components/tempOutside";
import TempInside from "./components/tempInside";



class Home extends Component {
    constructor(props) {
        super(props);
        //this.idToken=this.idToken.bind(this);
    }

    idToken(){
        let tok=fire.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
            console.log(tok)
        }).catch(function(error) {
            // Handle error
        });
    }

    render(){
        return(
            <div>
                <div className="header-comp">
                    <Header/>
                </div>
                <div className="picture-panel">
                    <img src={smartHome} alt="smarthome"/>
                </div>

                <div className="wrap-control-panel">

                    <div className="control-panel">
                        <div><LightControl/></div>
                        <div><LightOutSide/></div>
                        <div><BurglarAlarm/></div>
                    </div>

                    <div className="control-panel">
                        <div><FireAlarm/></div>
                        <div><StoveOn/></div>
                        <div><WindowControl/></div>
                    </div>

                    <div className="control-panel">
                        <div><PowerOutage/></div>
                        <div><TempOutside/></div>
                        <div><TempInside/></div>
                    </div>
                    <div className="control-panel">
                        <div><Radiator/></div>
                        <div><DoorControl/></div>
                        <div><WaterLeak/></div>
                    </div>
                </div>
            </div>

        );
    }


}

export default Home;