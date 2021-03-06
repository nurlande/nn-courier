import React from 'react';
import firebase from './config/config';
import {Route, Link} from 'react-router-dom';
import Register from './Register';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: ''
      };
    this.login = this.login.bind(this);
    this.changeInput = this.changeInput.bind(this);
    }
    
  changeInput = (e) => {
    this.setState({ 
      [e.target.name]: e.target.value 
    });
  }

  login = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        console.log(error);
        alert("Something is wrong. Try Again!")
      });
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          window.location = '/';
        }
      });
      
  }
    render() {
  return (
    <div className="container text-center reg-log-card">
        <h1>Войти</h1>
        <form onSubmit={this.login} className="text-left form">
            <label>Электронный адрес</label>
            <input 
                className="input"
                placeholder = "email"
                name="email"
                type="email"
                onChange={this.changeInput}
                value={this.state.email}
            />
            <label>Пароль</label>
            <input 
                className="input"
                placeholder = "password"
                name="password"
                type="password"
                onChange={this.changeInput}
                value={this.state.password}
            />
            <button type="submit" className="btn btn-primary btn-block">Войти</button>
            <Link to="/register" className="btn btn-success btn-block">Перейти к регистрацию</Link>
        </form>
        <Route path="/register" component={Register} />
    </div>    
  );
    }
}

export default Login;