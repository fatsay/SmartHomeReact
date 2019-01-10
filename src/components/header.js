import React ,{ Component} from 'react';
import fire from '../config/Fire'

import logo from '../images/Logo.png'
class Header extends Component {
    constructor(props) {
        super(props);
        this.logout=this.logout.bind(this);
    }

    logout(){
        fire.auth().signOut();
    }
    render(){
        return(
            <div className="header">
                <img src={logo} className="logo" alt="logo"/>
                Smart Home Web
                <div className="header-right">
                    <a className="active" href="#home">Home</a>
                    <a href="#contact">Contact</a>
                    <a href="#about">About</a>
                    <a href onClick={this.logout}>Log out</a>
                </div>
            </div>
        );
    }
}



export default Header