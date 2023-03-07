import React from 'react'

const StockContent = (props) => {
    const {item,index}=props;
  return (
    <div class='row'>
    <div class='col-xl-8' style={{ margin: "auto" }}>
    <div class="card mb-4">
    <div class="card-header text-center">
    <span class="badge text-bg-success m-2" style={{fontSize:"1rem"}}>{item.name}</span>
    <span class="badge text-bg-danger m-2" style={{fontSize:"1rem"}}>Quantity : {item.quantity}</span>
    </div>
    <div class="card-body">
        <h5>Expiry date : {item.expiry}</h5>
        <h5>Seller name : {item.seller}</h5>
        <h5>Price : {item.price}</h5>
    </div>
    </div>
    </div>
    </div>
  )
}

export default StockContent
