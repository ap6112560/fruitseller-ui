import React, {useState} from 'react';
import orderService from '../../services/Order'
import apple from './../../images/apple.jpeg';

function User(props) {
    let oid;
    const [order, setOrder]=useState({});
    
    const filterResults = ()=>{
        if(oid.value !== ""){
            orderService.getById(oid.value).then(
                (response) => {
                    response.items.map((item) => {
                        item.content = item.products.map((product) => product.name).join(',');
                        if(item.products.length > 1){
                            item.content = 'Combo: [' + item.content + ']';
                        }
                        return item;
                    });
                    setOrder(response);
                }
            );
            oid.value="";
        }  
    }

    let renderItems = (items) => {
        let list = items.map(
            (item, index) => 
            <div key={index}>
                <img src={apple} alt=""/>
                <h4><b>{item.content}</b></h4>
                <p>{'Price:' + item.price}</p>
                <p>{'Quantity:' + item.quantity}</p>
            </div>);
        return <div style={{display:'flex'}}>
            {list}
            </div>
    };

    return (
        <React.Fragment>
            <br/>
            <label>
            Order Id&nbsp;
            <input id="oid" type="text" ref={(el)=>{oid=el}}/>
            </label>
            &nbsp;
            <button onClick={filterResults} >Check Order</button>
            <br/>
            <br/>
            {
                order.orderId !== undefined &&
                <div>
                    <label><b>Order Id: </b>{order.orderId}</label><br/>
                    <label><b>Customer Name: </b>{order.customerName}</label><br/>
                    <label><b>Address: </b>{order.shipment.address}</label><br/>
                    <label><b>Order Date: </b>{order.orderDate}</label><br/>
                    <label><b>Order Status: </b>{order.status}</label><br/>
                    <label><b>Amount: </b>{order.payment.amount}</label><br/>
                    <label><b>Shipment Method: </b>{order.shipment.shipmentMethod}</label><br/>
                    <label><b>Shipment Date: </b>{order.shipment.shipmentDate}</label><br/>
                    <label><b>Estimated Arrival: </b>{order.shipment.estimatedArrival}</label><br/>
                    {renderItems(order.items)}
                </div>
            }
        </React.Fragment>
    );
}


export default User;