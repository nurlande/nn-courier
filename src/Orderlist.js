import React from 'react';
import firebase from 'firebase';
import {Route, Link} from 'react-router-dom';
import Login from './Login';

class Orderlist extends React.Component {
    constructor() {
        super();
        this.state = {
            orders: [],
            user: null
        };
        this.authListener = this.authListener.bind(this);
      }
      componentDidMount() {
        this.authListener();
        this.getData();
      }
      getData() {
        const db = firebase.firestore();
        db.collection("orders").get().then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
            const dats = doc.data()
            return {id: doc.id, ...dats}
        });
        console.log(data);
            this.setState({
                orders: data
            })
        });
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
      changeStatus (id) {
        let db = firebase.firestore();
        db.collection("orders").doc(id).update({
            status: false
        })
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
        });
        this.getData();
      }
    render() 
    {
        const listItems = this.state.orders.map(
            (order) => <div key={order.id} className="jumbatron bg-light">
            <h4><b>Дата: </b>{order.date }</h4>
            <p><b>Описание: </b><i>{order.description}</i></p> 
            <p><b>Статус Заказа:</b> <u>{order.status ? "Доступен" : "Завершено"}</u></p>
            <div> {order.status && (
            <button className="btn btn-primary" onClick={this.changeStatus.bind(this,order.id)}>Завершить</button>
            )}
            </div>
            <label><b>Точки отправки и доставки: </b></label>
            <div>Map Area</div>
            </div>);
  return (
    <div className="container text-center">
        {this.state.user ? (
        <div className="container">
        <h1>Заказы</h1>
            {listItems}
        </div>
        ) : (
        <Link to="/login" className="btn btn-primary btn-lg choose">Перейти к логин</Link>
        )}
        <Route path="/login" component={Login}/>
    </div>
  );
    }
}

export default Orderlist;