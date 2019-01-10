import React, {Component} from 'react';
import axios from 'axios';
import tempOut from '../images/TempOut.png';
import fire from '../config/Fire';

class TempOutside extends Component {
    constructor() {
        super();
        this.state = ({
            outDoorTemp:{
                value : ''
            }
        });
    }
    componentDidMount() {
        let token = '';
        let user = fire.auth().currentUser;
        if (user != null) {
            token = user.getIdToken(true).then(token =>
                axios.get('https://europe-west1-smarthome-3c6b9.cloudfunctions.net/devices/ORr9T5abPtJpeV6XdPw8/',
                    {
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    .then(resp => {
                        this.setState({
                            outDoorTemp: {
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
        let val=this.state.outDoorTemp.value;

        if (val.length<0){
            return<div>Loading</div>
        }
        return (
            <div className="wrap-component">
                <div className="display-component">
                    <div>
                        <div className="component-image">
                            <img src={tempOut} alt="tempOut"/>
                        </div>

                        <div className="component-state">
                            <span className="state-on-span">Temp. Outdoor  </span>

                        </div>
                    </div>

                </div>

                <div className="window-bottom">
                    <span className="state-on-span">Temp : {val} C°</span>

                </div>

            </div>

        );

    }



}

export default TempOutside;