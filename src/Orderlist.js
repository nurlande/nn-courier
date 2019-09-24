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
          const orderlist = db.collection("orders");
          this.setState({
              orders: orderlist
          })
          console.log(this.state.orders);
      }
    render() 
    {
  return (
    <div>
        <div className="container">
        <h1>Orderlist</h1>
        <div className="jumbotron">
            <h1 className="display-4">Post title <span>date</span></h1>
            <p className="lead"><b>Details of post</b>: This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr className="my-4" />
            <p>
                Address from and to
            </p>

            <button className="btn btn-primary btn-lg">End process</button>
        </div>
        </div>
    </div>
  );
    }
}

export default Orderlist;