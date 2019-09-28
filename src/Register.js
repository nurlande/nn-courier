import React from 'react';
import firebase from './config/config';
import {Link, Route} from 'react-router-dom';
import Login from './Login';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          signed: false
        };
        this.changeInput = this.changeInput.bind(this);
        this.signUp = this.signUp.bind(this);
      }
    
      changeInput = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value 
        });
      }
    
      signUp = (e) => {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        }).then((u)=>{this.setState({
          signed: true
        })})
        .catch((error) => {
            console.log(error);
            alert("Something is wrong, Try again");
          });
      }
    render() {
  return (
    <div className="container order text-center">
        <h1>Register</h1>
      {this.state.signed ? (
      <div><h1>Successfully Signed Up</h1>
      <Link to='/login' className="btn btn-primary btn block">Login Now</Link></div>
      ) : (
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
        )}
                <Route path="/login" component={Login}/>
    </div>    
  );
    }
}

export default Register;