import React, {Component} from 'react';
import axios from 'axios';
import waterLeak from '../images/WaterLeak.png';
import fire from '../config/Fire';

class WaterLeak extends Component {
    constructor() {
        super();
        this.state = ({
            waterLeak:{
                value : ''
            }

        });
    }
    componentDidMount(){
        let token='';
        let user=fire.auth().currentUser;
        if (user!=null){
            token=user.getIdToken(true).then(token =>
                axios.get('https://europe-west1-smarthome-3c6b9.cloudfunctions.net/devices/PbjTCF949vOXLB9idof0/',
                    { headers:
                        {
                            'Content-Type': 'application/json; charset=utf-8',
                            'Authorization': 'Bearer '+token
                        } })
                    .then(resp => {
                        this.setState({
                            waterLeak : {
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
        let val=this.state.waterLeak.value;

        if (val.length<0){
            return<div>Loading</div>
        }
        return (
            <div className="wrap-component">
                <div className="display-component">
                    <div>
                        <div className="component-image">
                            <img src={waterLeak} alt="leak"/>
                        </div>

                        <div className="component-state">
                            <span className="state-on-span">Water Leak</span>
                        </div>
                    </div>

                </div>

                <div className="window-bottom">
                    {this.state.waterLeak.value==='true' && <span className="state-on-span"> Warning</span>}
                    {this.state.waterLeak.value==='false' && <span className="state-off-span">No Water Leak</span>}
                </div>

            </div>

        );

    }




}

export default WaterLeak;