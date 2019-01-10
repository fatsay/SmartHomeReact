import React, {Component} from 'react';
import axios from 'axios';
import window from '../images/Window.png';
import fire from '../config/Fire';

class WindowControl extends Component {

    constructor() {
        super();
        this.state = ({
            window:{
                value : ''
            }
        });
    }
    componentDidMount(){
        let token='';
        let user=fire.auth().currentUser;
        if (user!=null){
            token=user.getIdToken(true).then(token =>
                axios.get('https://europe-west1-smarthome-3c6b9.cloudfunctions.net/devices/jUMNhUrIo4EqYX7RGcp5/',
                    { headers:
                        {
                            'Content-Type': 'application/json; charset=utf-8',
                            'Authorization': 'Bearer '+token
                        } })
                    .then(resp => {
                        this.setState({
                            window : {
                                value: resp.data.value
                            }

                        });
                        console.log( )
                    })
            ).catch(error => {
                console.log(error)
            })
        }
    }

    render() {
        //render yapmasini geciktir
        let val=this.state.window.value;

        if (val.length<0){
            return<div>Loading</div>
        }
        return (
            <div className="wrap-component">
                <div className="display-component">
                    <div>
                        <div className="component-image">
                            <img src={window} alt="window"/>
                        </div>

                        <div className="component-state">
                            <span className="state-on-span">Windows</span>
                        </div>
                    </div>

                </div>

                <div className="window-bottom">
                    {this.state.window.value==='true' && <span className="state-on-span">State : Open</span>}
                    {this.state.window.value==='false' && <span className="state-off-span">State : Close</span>}
                </div>

            </div>

        );

    }



}

export default WindowControl;