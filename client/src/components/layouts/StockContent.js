import React from 'react'

const StockContent = (props) => {
    const {item,index}=props;
  return (
    <div class='row'>
      <div class='col-xl-6' style={{ margin: "auto" }}>
        <div class="card mb-4">
          <div class="card-header text-center">
              <span class="badge text-bg-success m-2" style={{fontSize:"1rem"}}>{item.name}</span>
              <span class="badge text-bg-danger m-2" style={{fontSize:"1rem"}}>Quantity : {item.quantity}</span>
          </div>
          <div class="card-body">
              <ul class="list-group list-group-horizontal">
                <li class="list-group-item">Expiry date : {item.expiry.slice(0, 10)}</li>
                <li class="list-group-item">Adding date : {item.date.slice(0, 10)}</li>
              </ul>
              <ul class="list-group list-group-horizontal-sm">
                <li class="list-group-item">Seller name : {item.seller}</li>
                <li class="list-group-item">Price : {item.price}</li>
              </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StockContent
