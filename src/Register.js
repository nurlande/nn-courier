import React from 'react';
import firebase from './config/config'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.changeInput = this.changeInput.bind(this);
        this.signUp = this.signUp.bind(this);
        this.state = {
          email: '',
          password: ''
        };
      }
    
      changeInput = e => {
        this.setState({ 
            [e.target.name]: e.target.value 
        });
      }
    
      signUp = e => {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        }).then((u)=>{console.log(u)})
        .catch((error) => {
            console.log(error);
          })
          firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        }).catch((error) => {
            console.log(error);
          });
          window.location="/";
      }
    render() {
  return (
    <div className="container order text-center">
        <h1>Register</h1>
        <form onSubmit={this.signUp}>
            <input 
                className="input"
                placeholder = "email"
                name="email"
                type="email"
                onChange={this.changeInput}
                value={this.state.email}
            />
            <input 
                className="input"
                placeholder = "password"
                name="password"
                type="password"
                onChange={this.changeInput}
                value={this.state.password}
            />
            <button type="submit" className="btn btn-primary btn-block">Register</button>
        </form>
    </div>    
  );
    }
}

export default Register;