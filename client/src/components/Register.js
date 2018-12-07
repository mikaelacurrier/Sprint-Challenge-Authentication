import React, { Component } from 'react';
import axios from 'axios';

const initialUser = {
    username: '',
    password: ''
}

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: {...initialUser},
            message: ''
         }
    }
    inputHandler = e => {
        const { name, value } = e.target;
        this.setState({ user: {...this.state.user, [name]: value }});
    }
    submitHandler(e) {
        e.preventDefault();
        console.log('trying to register...');
        axios.post('http://localhost:3300/api/register', this.state.user)
            .then(res => {
                if(res.status === 200) {
                    this.setState({
                        message: "Registration complete, please log in to see the jokes!",
                        user: {...initialUser}
                    }) 
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                this.setState({
                    message: 'Registration failed',
                    user: {...initialUser}
                })
            })
    }
    render() { 
        return ( 
            <div>
                <h3>Register here:</h3>
                <form>
                    <input type="text"
                    onChange={this.inputHandler}
                    value={this.state.username}
                    name="username"
                    placeholder="username"
                    />
                    <input type="text"
                    onChange={this.inputHandler}
                    value={this.state.password}
                    name="password"
                    placeholder="password"
                    />
                </form>
                <button onClick={this.submitHandler}>Register!</button>
                <h5>{this.state.message}</h5>
            </div>
         );
    }
}
 
export default Register;