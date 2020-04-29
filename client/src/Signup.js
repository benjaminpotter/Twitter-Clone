import React from 'react';

import './Signup.css';
import { Redirect } from 'react-router';

export default class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            didSucceed: false,

            username: '',
            password: '',
            err: false,
            msg: ''
        };
    };

    handleUsername = (event) => {
        this.setState({ username: event.target.value });
    };

    handlePassword = (event) => {
        this.setState({ password: event.target.value });
    };

    handleSubmit = () => {
        if(this.state.username === '' || this.state.password === ''){
            this.setState({err: true, msg: 'Please fill out all fields!'});
            return;
        }

        const rOptions = {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(this.state)
        };

        console.log(rOptions.body);

        fetch('http://localhost:3001/signup', rOptions).then( res => {
            res.json().then( data => {
                if (data.err) {
                    this.setState({ err: true, msg: data.msg });
                    this.setState({ username: '', password: ''});
                } else {

                    //save('username', this.state.username, {path: '/'});

                    // redirect to login
                    this.setState({didSucceed: true});
                }
            });
        });
    };

    hasError = () => {
        if (this.state.err) {
            return <p className="errmsg">{this.state.msg}</p>;
        }

        return '';
    };

    render() {
        if (this.state.didSucceed){
            return <Redirect to="/login"/>
        } else {
            return (<div>
                <h1>Signup</h1>
                <div className="container">
                    
                    <div className="username-container">
                        <label>
                            Username:
                            <input value={this.state.username} type="text" placeholder="username" onChange={this.handleUsername} />
                        </label>
                    </div>
        
                    <div className="password-container">
                        <label>
                            Password:
                            <input value={this.state.password} type="password" placeholder="password" onChange={this.handlePassword} />
                        </label>
                    </div>
                    
                    { this.hasError() }
        
                    <div className="submit-container"> 
                        <button onClick={this.handleSubmit}> Signup! </button>
                    </div>
                </div>
            </div>
            )
        }
    }
}