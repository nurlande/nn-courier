import React from 'react';
import App from './App';
import {Link, Route} from 'react-router-dom';

class Success extends React.Component {
    render() {
    return (
        <div className="container text-center">
            <p className="success">Заказ успешно оформлен. Ожидайте курьера!</p>
             <Link to="/" className="btn btn-primary btn-lg choose">Перейти в главную страницу</Link>
             <Route path="/" component={App} />
        </div>
    )
    }
}

export default Success;