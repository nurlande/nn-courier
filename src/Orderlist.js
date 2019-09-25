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
         // array of cities objects
        this.setState({
            orders: data
        })
    });
      }
      check = e => {
        console.log(this.state.orders);
      } 
    render() 
    {
        const listItems = this.state.orders.map((d) => <li key={d.id}>{d.title}</li>);
  return (
    <div>
        <div className="container">
        <h1>Orderlist</h1>
        <div className="jumbotron">
            <h1 className="display-4"> <span>date</span></h1>
            <p className="lead"><b>Details of post</b>: This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr className="my-4" />
            {listItems}
            <p> 
                Address from and to
            </p>

            <button className="btn btn-primary btn-lg" onClick={this.check}>End process</button>
        </div>
        </div>
    </div>
  );
    }
}

export default Orderlist;