import React, {Component} from 'react';
import axios from 'axios';
import fireAlarm from '../images/Fire-alarm.png';
import fire from '../config/Fire';
class FireAlarm extends Component {

    constructor() {
        super();
        this.state = ({
            fireAlarm:{
                value :''
            }

        });

    }

    componentDidMount(){
        let token = '';
        let user = fire.auth().currentUser;
        if (user != null) {
            token = user.getIdToken(true).then(token =>
                axios.get('https://europe-west1-smarthome-3c6b9.cloudfunctions.net/devices/NjF7valDGmHOPZrF0S9O/',
                    {
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    .then(resp => {
                        this.setState({
                            fireAlarm: {
                                value: resp.data.value
                            }
                        });
                        console.log()
                    })
            ).catch(error => {
                console.log(error)
            })
        }
    }

    render() {
        //render yapmasini geciktir
        let val=this.state.fireAlarm.value;

        if (val.length<0){
            return<div>Loading</div>
        }
        return (
            <div className="wrap-component">
                <div className="display-component">
                    <div>
                        <div className="component-image">
                            <img src={fireAlarm} alt="fireAlarm"/>
                        </div>

                        <div className="component-state">
                            <span className="state-on-span">Fire Alarm</span>
                        </div>
                    </div>

                </div>

                <div className="window-bottom">
                    {this.state.fireAlarm.value==='true' && <span className="state-on-span"> Fire Warning</span>}
                    {this.state.fireAlarm.value==='false' && <span className="state-off-span">No Fire</span>}
                </div>

            </div>

        );

    }





}

export default FireAlarm;