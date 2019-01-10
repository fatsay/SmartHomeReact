/**
 * Created by fatih on 2019-01-10.
 */
import React, {Component} from 'react';
import fire from './config/Fire';
import './Login.css';
import user from './images/UserImage.png';
import back from './images/LoginBackground.png'

class Login extends Component {
    constructor(props) {
        super(props);
        this.login=this.login.bind(this);
        this.signup=this.signup.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.state={
            email:'',
            password:''

        }
    }

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        }).catch((error)=> {
            console.log(error);
        });
    }
    signup(e) {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        }).catch((error)=> {
            console.log(error);
        });
    }


    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        return(
            <div>
                <img src={back} alt="back"/>
                <div className="login-wrap">
                    <div className="forgot1">
                        <label className="forgot">Smart Login</label>
                    </div>
                    <form className="form">
                        <div className="centered">
                            <img src={user} alt="user"/>
                            <div className="input1">
                                <input value={this.state.email} onChange={this.handleChange} type="email" name="email"
                                       className="form-control" placeholder="Enter email"/>
                            </div>
                            <div className="input2">
                                <input value={this.state.password} onChange={this.handleChange} type="password"
                                       name="password" placeholder="Password"/>
                            </div>
                            <button type="submit" onClick={this.login} className="button">Login</button>
                            <button type="submit" onClick={this.signup} style={{marginLeft:'25px'}} className="button">Signup</button>
                        </div>


                    </form>
                </div>
            </div>
        )
    }

}

export default Login;