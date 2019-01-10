import React, {Component} from 'react';
import axios from 'axios';
import lightBulb from '../images/Light-outside.png';
import fire from '../config/Fire';

class LightOutSide extends Component {


    constructor() {
        super();
        this.state = ({
            outDoorLight:{
                value : ''
            }

        });

    }

    componentDidMount(){
        let token = '';
        let user = fire.auth().currentUser;
        if (user != null) {
            token = user.getIdToken(true).then(token =>
                axios.get('https://europe-west1-smarthome-3c6b9.cloudfunctions.net/devices/HrWTumcyQgNbcai78KAv/',
                    {
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    .then(resp => {
                        this.setState({
                            outDoorLight: {
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
    //refres component


    turnOnSubmit = event => {
        const data={
            'value':'true'
        };
        event.preventDefault();

        let token = '';
        let user = fire.auth().currentUser;
        if (user != null) {
            token = user.getIdToken(true).then(token =>
                axios.post('https://europe-west1-smarthome-3c6b9.cloudfunctions.net/devices/HrWTumcyQgNbcai78KAv/',
                    JSON.stringify(data),
                    {
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    .then(resp => {
                        this.setState({
                            outDoorLight: {
                                value: resp.data.value
                            }
                        });
                        console.log()
                    })
            ).catch(error => {
                console.log(error)
            })
        }

    };

    turnOffSubmit = event => {
        const data={
            'value':'false'
        };
        event.preventDefault();
        let token = '';
        let user = fire.auth().currentUser;
        if (user != null) {
            token = user.getIdToken(true).then(token =>
                axios.post('https://europe-west1-smarthome-3c6b9.cloudfunctions.net/devices/HrWTumcyQgNbcai78KAv/',
                    JSON.stringify(data),
                    {
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    .then(resp => {
                        this.setState({
                            outDoorLight: {
                                value: resp.data.value
                            }
                        });
                        console.log()
                    })
            ).catch(error => {
                console.log(error)
            })
        }
    };

    render() {
        //render yapmasini geciktir
        let val=this.state.outDoorLight.value;

        if (val.length<0){
            return<div>Loading</div>
        }
        return (
            <div className="wrap-component">
                <div className="display-component">
                    <div>
                        <div className="component-image">
                            <img src={lightBulb} alt="light"/>
                        </div>

                        <div className="component-state">
                            <div>
                                <span className="state-on-span">Outdoor Light</span>
                            </div>
                            {this.state.outDoorLight.value==='true' && <span className="state-on-span">State : On</span>}
                            {this.state.outDoorLight.value==='false' && <span className="state-off-span">State : Off</span>}
                        </div>
                    </div>

                </div>
                <div className="button-right">
                    <form  onSubmit={this.turnOnSubmit}>
                        <button className="button-on" type="submit">On</button>
                    </form>
                </div>
                <div className="button-left">
                    <form onSubmit={this.turnOffSubmit}>
                        <button className="button-off" type="submit">Off</button>
                    </form>
                </div>
            </div>

        );

    }



}

export default LightOutSide;