import React from 'react';
import firebase from 'firebase';

class Orderlist extends React.Component {
    constructor() {
        super();
        this.state = {
            orders: []
        };
      }
      componentDidMount() {
        const db = firebase.firestore();
        db.collection("orders").get().then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({
            orders: data
        })
    });
      }
      changeStatus = () => {
          console.log(this.state.orders);
      }
      checkStatus = (status) => {
          return (status ? "open" : "closed");
      }
    render() 
    {
        const listItems = this.state.orders.map(
            (order) => <div key={order.date} className="jumbatron bg-info">
            <h4>{order.date}</h4>
            <p>{order.description}</p> 
            <p>GeoLocation from {order.geoLocationFrom}, to {order.geoLocationTo}</p>
            <p>{this.checkStatus(order.status)}</p>
            <button className="btn btn-primary btn-lg" onClick={this.changeStatus}>End process</button>
            </div>);
  return (
    <div>
        <div className="container">
        <h1>Orderlist</h1>
            {listItems}
        </div>
    </div>
  );
    }
}

export default Orderlist;