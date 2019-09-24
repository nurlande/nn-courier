import React from 'react';

function Orderlist() {
  return (
    <div>
        <div className="container">
        <h1>Orderlist</h1>
        <div class="jumbotron">
            <h1 class="display-4">Post title <span>date</span></h1>
            <p class="lead"><b>Details of post</b>: This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr class="my-4" />
            <p>
                Address from and to
            </p>

            <button class="btn btn-primary btn-lg">End process</button>
        </div>
        </div>
    </div>
  );
}

export default Orderlist;