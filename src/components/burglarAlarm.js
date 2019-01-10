import React, {Component} from 'react';
import axios from 'axios';
import fire from '../config/Fire';
import burglarAlarm from '../images/Burglar-alarm.png';

class BurglarAlarm extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            burglarAlarm:{
                value : ''
            }
        });
    }
    componentDidMount(){
        let token = '';
        let user = fire.auth().currentUser;
        if (user != null) {
            token = user.getIdToken(true).then(token =>
                axios.get('https://europe-west1-smarthome-3c6b9.cloudfunctions.net/devices/ICYkFxoI0x2ng9NzGark/',
                    {
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    .then(resp => {
                        this.setState({
                            burglarAlarm: {
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

    turnOnSubmit = event => {
        const data={
            'value':'true'
        };
        event.preventDefault();

        let token = '';
        let user = fire.auth().currentUser;
        if (user != null) {
            token = user.getIdToken(true).then(token =>
                axios.post('https://europe-west1-smarthome-3c6b9.cloudfunctions.net/devices/ICYkFxoI0x2ng9NzGark/',
                    JSON.stringify(data),
                    {
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    .then(resp => {
                        this.setState({
                            burglarAlarm: {
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
                axios.post('https://europe-west1-smarthome-3c6b9.cloudfunctions.net/devices/ICYkFxoI0x2ng9NzGark/',
                    JSON.stringify(data),
                    {
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    .then(resp => {
                        this.setState({
                            burglarAlarm: {
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
        let val=this.state.burglarAlarm.value;

        if (val.length<0){
            return<div>Loading</div>
        }
        return (
            <div className="wrap-component">
                <div className="display-component">
                    <div>
                        <div className="component-image">
                            <img src={burglarAlarm} alt="burglarAlarm"/>
                        </div>

                        <div className="component-state">
                            <div>
                                <span className="state-on-span">Burglar Alarm</span>
                            </div>

                            {this.state.burglarAlarm.value==='true' && <span className="state-on-span">State : On </span>}
                            {this.state.burglarAlarm.value==='false' && <span className="state-off-span">State : Off</span>}
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

export default BurglarAlarm;