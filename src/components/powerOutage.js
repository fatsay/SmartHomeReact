import React, {Component} from 'react';
import axios from 'axios';
import powerOutage from '../images/PowerOutage.png';
import fire from '../config/Fire';

class PowerOutage extends Component {


    constructor() {
        super();
        this.state = ({
            power:{
                value: ''
            }

        });

    }

    componentDidMount(){
        let token = '';
        let user = fire.auth().currentUser;
        if (user != null) {
            token = user.getIdToken(true).then(token =>
                axios.get('https://europe-west1-smarthome-3c6b9.cloudfunctions.net/devices/CO7kWmm0MLkOqzKcWsfE/',
                    {
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    .then(resp => {
                        this.setState({
                            power: {
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
        let val=this.state.power.value;

        if (val.length<0){
            return<div>Loading</div>
        }
        return (
            <div className="wrap-component">
                <div className="display-component">
                    <div>
                        <div className="component-image">
                            <img src={powerOutage} alt="powerOut"/>
                        </div>

                        <div className="component-state">
                            <span className="state-on-span">Temp.Upstairs</span>

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

export default PowerOutage;