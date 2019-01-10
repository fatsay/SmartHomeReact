import React, {Component} from 'react';
import axios from 'axios';
import stoveOn from '../images/StoveOn.png';
import fire from '../config/Fire';

class StoveOn extends Component {
    constructor() {
        super();
        this.state = ({
            stove:{
                value : ''
            }

        });
    }

    componentDidMount(){
        let token = '';
        let user = fire.auth().currentUser;
        if (user != null) {
            token = user.getIdToken(true).then(token =>
                axios.get('https://europe-west1-smarthome-3c6b9.cloudfunctions.net/devices/wHDkKc81N73z3JxKKiYJ/',
                    {
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    .then(resp => {
                        this.setState({
                            stove: {
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
        let val=this.state.stove.value;

        if (val.length<0){
            return<div>Loading</div>
        }
        return (
            <div className="wrap-component">
                <div className="display-component">
                    <div>
                        <div className="component-image">
                            <img src={stoveOn} alt="stove"/>
                        </div>

                        <div className="component-state">
                            <span className="state-on-span">Stove</span>

                        </div>
                    </div>

                </div>

                <div className="window-bottom">
                    {this.state.stove.value==='true' && <span className="state-on-span">State : On</span>}
                    {this.state.stove.value==='false' && <span className="state-off-span">State : Off</span>}
                </div>

            </div>
        );

    }


}

export default StoveOn;