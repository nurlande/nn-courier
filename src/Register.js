import React from 'react';
import firebase from './config/config';

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
        }).then((u)=>{
          firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
            firebase.auth().onAuthStateChanged(user => {
              if(user) {
                window.location = '/';
              }
            });
          })
        }).catch((error) => {
            console.log(error);
            alert("Something is wrong, Try again");
          });
      }
    render() {
  return (
    <div className="container order text-center">
        <h1>Регистрация</h1>
        <form onSubmit={this.signUp} className="text-left">
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
            <button type="submit" className="btn btn-primary btn-block">Зарегистрироваться</button>
        </form>
    </div>    
  );
    }
}

export default Register;