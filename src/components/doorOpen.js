import React, {Component} from 'react';
import axios from 'axios';
import doorOpen from '../images/DoorOpen.png';
import fire from '../config/Fire';
class DoorControl extends Component {

    constructor() {
        super();
        this.state = ({
            door:{
                value : ''
            }

        });

    }
    componentDidMount(){
        let token = '';
        let user = fire.auth().currentUser;
        if (user != null) {
            token = user.getIdToken(true).then(token =>
                axios.get('https://europe-west1-smarthome-3c6b9.cloudfunctions.net/devices/eGtv1yzXNHPiOeCqdY81/',
                    {
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    .then(resp => {
                        this.setState({
                            door: {
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
        let val=this.state.door.value;

        if (val.length<0){
            return<div>Loading</div>
        }
        return (
            <div className="wrap-window-component">
                <div className="display-component">
                    <div>
                        <div className="component-image">
                            <img src={doorOpen} alt="door"/>
                        </div>

                        <div className="component-state">
                            <span className="state-on-span">Front Door</span>
                        </div>
                    </div>

                </div>

                <div className="window-bottom">
                    {this.state.door.value==='true' && <span className="state-on-span">State : Open</span>}
                    {this.state.door.value==='false' && <span className="state-off-span">State : Close</span>}
                </div>

            </div>

        );

    }


}

export default DoorControl;