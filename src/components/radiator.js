import React, {Component} from 'react';
import axios from 'axios';
import radiator from '../images/Radiator-1.png';
import fire from '../config/Fire';

class Radiator extends Component {

    constructor() {
        super();
        this.state = ({
            radiator:{
                value : ''
            }

        });

    }

    componentDidMount(){
        let token = '';
        let user = fire.auth().currentUser;
        if (user != null) {
            token = user.getIdToken(true).then(token =>
                axios.get('https://europe-west1-smarthome-3c6b9.cloudfunctions.net/devices/y3BVqxWaMZOmmcEPunb6/',
                    {
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    .then(resp => {
                        this.setState({
                            radiator: {
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
        let val=this.state.radiator.value;
        if (val.length<0){
            return<div>Loading</div>
        }
        return (
            <div className="wrap-component">
                <div className="display-component">
                    <div>
                        <div className="component-image">
                            <img src={radiator} alt="radiator"/>
                        </div>

                        <div className="component-state">
                            <span className="state-on-span">Radiator</span>
                        </div>
                    </div>

                </div>

                <div className="window-bottom">
                    {this.state.radiator.value==='true' && <span className="state-on-span">State : On</span>}
                    {this.state.radiator.value==='false' && <span className="state-off-span">State : Off</span>}
                </div>

            </div>

        );

    }




}

export default Radiator;