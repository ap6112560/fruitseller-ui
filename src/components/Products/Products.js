import React, {useEffect, useState} from 'react';
import productService from '../../services/Products'
import comboService from '../../services/Combos'
import orderService from '../../services/Order'
import {mapOrderSaveRequest} from '../utils/Mapper'
import apple from './../../images/apple.jpeg';

function Products(props) {
    const [products, setProducts] = useState([]);
    const [combos, setCombos] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        productService.get().then((response) => {
                setProducts(response);
            }
        )
        comboService.get().then((response) => {
            response.map((combo) => {
                combo.price = combo.products.map((product) => product.price).reduce((tot, v) => tot + v, 0);
                combo.content = combo.products.map((product) => product.name).join(',');
                return combo;
            });
            setCombos(response);
        })
    }, []);

    const updateProductQty = async (name, quantity) => await productService.update(name, quantity);
    
    let handleButtonClick = () => {
        let order = mapOrderSaveRequest(name, address, products, combos);
        orderService.post(order).then(
            (response) => {
                const filteredProducts = products.filter((product) => !isNaN(product.quantity));
                const filteredCombos = combos.filter((combo) => !isNaN(combo.quantity));

                for (let product of filteredProducts) {
                    updateProductQty(product.name, product.quantity);
                }
                for(let combo of filteredCombos){
                    for(let product of combo.products){
                        updateProductQty(product.name, combo.quantity);
                    }
                }
                alert("Order Placed with id: " + response.orderId);
            }
        );
    };

    let handleProductQuantityOnChange = (event) => products[event.target.id].quantity = parseInt(event.target.value);
    let handleComboQuantityOnChange = (event) => combos[event.target.id].quantity = parseInt(event.target.value);
    let handleNameOnChange = (event) => setName(event.target.value);
    let handleAddressOnChange = (event) => setAddress(event.target.value);

    let renderItems = () => {
        let list = products.map(
            (product, index) => 
            <div key={index}>
                <img src={apple} alt=""/>
                <h4><b>{product.name}</b></h4>
                <p>{'Price:' + product.price}</p>
                <input type='text' placeholder='Quantity...' id={index} onChange={handleProductQuantityOnChange}/>
            </div>);
        let comboList = combos.map(
            (combo, index) => 
            <div key={index}>
                <img src={apple} alt=""/>
                <h4><b>{combo.name}</b></h4>
                <b>{'[' + combo.content + ']'}</b>
                <p>{'Price:' + combo.price}</p>
                <input type='text' placeholder='Quantity...' id={index} onChange={handleComboQuantityOnChange}/>
            </div>);
        return (
            <div>
                <h3>Products</h3>
                <br/>
                <div style={{display: 'flex'}}>
                    {list}
                </div>
                <br/>
                <h3>Combos</h3>
                <br/>
                <div style={{display: 'flex'}}>
                    {comboList}
                </div>
            </div>
        );
    };

    return (
        <div>
            {renderItems()}
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
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