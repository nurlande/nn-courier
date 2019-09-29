import React from 'react';
import './App.css';
import Order from './Order';
import Orderlist from './Orderlist';
import { Route, Link} from 'react-router-dom';

function App() {
  return (
    <div className="container text-center">
      <div className="row">
      <div className="col-6 text-right">
      <Link to="/order" className="btn btn-primary btn-lg choose">Вызвать Курьера</Link>
      </div>
      <div className="col-6 text-left">
      <Link to="/orderlist" className="btn btn-primary btn-lg choose">Список заказов</Link>
      </div>
      </div>
      <Route path="/order" component={Order}/>
      <Route path="/orderlist" component={Orderlist}/>
    </div>
    
  );
}

export default App;
