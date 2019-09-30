import React from 'react';
import firebase from './config/config';

class Header extends React.Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }
  logout() {
    firebase.auth().signOut();
  }
  login() {
    window.location = '/login';
  }
  render() {
    return (
      <div>
      <nav className="navbar navbar-light header">
      <div className="container"><a className="navbar-brand" href="/">
      <h4 className="header">NN-COURIER</h4> </a>
      <button className="btn btn-light" onClick={this.state.user ? this.logout : this.login}> {this.state.user ? "Выйти" : "Войти"}</button>
      </div>
      </nav>
      </div>
    );
  }
}

export default Header;