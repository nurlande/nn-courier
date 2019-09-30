import React from 'react';
import firebase from 'firebase';
import {Route, Link} from 'react-router-dom';
import Login from './Login';
import Showmap from './Showmap';

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
            (order) => <div key={order.id} className="jumbatron row">
            <div className="col-md-8">
            <label className="label"><b>Точки отправки: </b>  "A"</label>
            <label className="label"><b>Точка доставки: </b>  "B" </label>
            <div className="here-map">
            <Showmap center={{ lat: 42.882004, lng: 74.582748}} zoom={10}
            latTo={order.latTo}
            lngTo={order.lngTo}
            latFrom={order.latFrom}
            lngFrom={order.lngFrom}
            />
            </div>
            </div>
              <div className="col-md-4">
            <h5><b>Дата: </b>{order.date }</h5>
            <br />
            <p><b>Описание: </b><i>{order.description}</i></p> 
            <p><b>Статус Заказа:</b> <u>{order.status ? "Доступен" : "Завершено"}</u></p>
            <div className="text-right"> {order.status && (
            <button className="btn btn-primary" onClick={this.changeStatus.bind(this,order.id)}>Завершить</button>
            )}
            </div>
            </div>

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