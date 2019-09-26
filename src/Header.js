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
      <nav className="navbar navbar-light bg-dark">
      <div className="container"><a className="navbar-brand" href="/">
      <img src="" width="30" height="30" 
      className="d-inline-block align-top" alt="" />
      Bootstrap </a>
      <button className="btn btn-primary" onClick={this.state.user ? this.logout : this.login}> {this.state.user ? "Logout" : "Login"}</button>
      </div>
      </nav>
      </div>
    );
  }
}

export default Header;