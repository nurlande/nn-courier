import React from 'react';
import firebase from './config/config.js';

class Order extends React.Component {
  constructor() {
    super();
    this.state = {
     title: '',
     price: ''
    };
  }
  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  addPost = e => {
    e.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const orderRef = db.collection("orders").add({
      title: this.state.title,
      price: this.state.price,
      status: true
  });
  console.log(orderRef);
    this.setState({
      title: '',
      price: ''
    });
  };
  render() {
    return (
    <div className="container">
        <h1>Order</h1>
        <form onSubmit={this.addPost}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={this.updateInput}
            value={this.state.title}
          />
          <input
            type="number"
            name="price"
            placeholder="price"
            onChange={this.updateInput}
            value={this.state.price}
          />
          <button type="submit">Submit</button>
        </form>
    </div>
  );
    }
}

export default Order;