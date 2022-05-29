import React, {useEffect, useState} from 'react';
import productService from '../../services/Products'
import orderService from '../../services/Order'
import {mapOrderSaveRequest} from '../utils/Mapper'
import apple from './../../images/apple.jpeg';

function Products(props) {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        productService.get().then((response) => {
                setProducts(response);
            }
        )
    }, []);

    let handleButtonClick = () => {
        let order = mapOrderSaveRequest(name, address, products);
        products.filter((product) => product.quantity !== undefined)
            .map((product) => productService.update(product.name, product.quantity));
        orderService.post(order).then(
            (response) => {
                alert("Order Placed with id: " + response.orderId);
            }
        );
    };

    let handleQuantityOnChange = (event) => products[event.target.id].quantity = parseInt(event.target.value);
    let handleNameOnChange = (event) => setName(event.target.value);
    let handleAddressOnChange = (event) => setAddress(event.target.value);

    let renderItems = () => {
        let list = products.map(
            (product, index) => 
            <div key={index}>
                <img src={apple} alt=""/>
                <h4><b>{product.name}</b></h4>
                <p>{'Price:' + product.price}</p>
                <input type='text' placeholder='Quantity...' id={index} onChange={handleQuantityOnChange}/>
            </div>);
        return <div style={{display: 'flex'}}>
            {list}
            </div>
    };

    return (
        <div>
            {renderItems()}
            <br/>
            <input type="text" placeholder='Name...' onChange={handleNameOnChange}/>
            <input type="text" placeholder='Address...' onChange={handleAddressOnChange}/>
            <button onClick={handleButtonClick}>
                Place Order
            </button>
        </div>
    );
}

export default Products;