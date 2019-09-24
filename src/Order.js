import React from 'react';

function Order() {
  return (
    <div className="container">
        <h1>Order</h1>
<form >
  <div className="form-group">
    <label for="postTitle">Title</label>
    <input type="text" className="form-control" id="postTitle" placeholder="title of post" />
  </div>
  <div className="form-group">
    <label for="details">Details</label>
    <textarea className="form-control" rows="3" placeholder="details"></textarea>
  </div>
  <div className="form-group">
    <label for="postDate">Date of post</label>
    <input type="text" className="form-control" id="postDate" placeholder="date of post" />
  </div>
  <div className="form-group">
    <label for="addressFrom">Deliver Address Map</label>
    <textarea className="form-control" id="addressFrom" rows="5" placeholder="here will be map"></textarea>
  </div>
  <div className="form-group">
    <label for="addressTo">Deliver Address Map</label>
    <textarea className="form-control" id="addressTo" rows="5" placeholder="here will be map"></textarea>
  </div>
  <div className="text-right">
  <button className="btn btn-success btn-block">Request a courier</button>
  </div>
</form>
    </div>
  );
}

export default Order;