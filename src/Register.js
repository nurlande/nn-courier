import React from 'react';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            login: '',
            courier: false
        }
    }
    changeInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    loginTo = e => {
        console.log("login");
    }
    render() {
  return (
    <div className="container order text-center">
        <h1>Login Page</h1>
        <form>
            <input 
                className="input"
                placeholder = "username"
                name="username"
                type="text"
                onChange={this.changeInput}
                value={this.state.username}
            />
            <input 
                className="input"
                placeholder = "password"
                name="password"
                type="password"
                onChange={this.changeInput}
                value={this.state.password}
            />
            <input 
                type="checkbox" 
                name="courier" 
                className="input"
                onChange={this.changeInput}
                value={this.state.courier} /> I'm Courier
            <button type="submit" className="btn btn-primary btn-block">Login</button>
        </form>
    </div>    
  );
    }
}

export default Register;