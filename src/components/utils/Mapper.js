let mapOrderSaveRequest = (name, address, products) => {
    let saveRequest = {};
    saveRequest.status = 'ORDERED';
    saveRequest.customerName = name;
    saveRequest.orderDate = new Date().toISOString().slice(0, 10);
    saveRequest.items = products.filter((product) => product.quantity !== undefined)
        .map((product, index) => {
            let item = {};
            item.quantity = product.quantity;
            item.price = product.quantity * product.price;
            item.products = [{
                name: product.name
            }];
            item.id = {
                itemId: product.name + index
            };
            return item;
        });
    saveRequest.payment = {
        status: 'COMPLETE',
        amount: saveRequest.items.map((item) => item.price).reduce((tot, v) => tot + v, 0)
    };
    saveRequest.shipment = {
        shipmentMethod: 'NONE',
        address: address
    };
    return saveRequest;
};

let mapOrderResponse = (orderResponse) => {
    let response = orderResponse.map(order => {
        let orderObj = {};
        orderObj.OrderId = order.orderId;
        orderObj.CustomerName =  order.customerName;
        orderObj.Address = order.shipment.address;
        orderObj.OrderDate = order.orderDate;
        orderObj.OrderStatus = order.status;
        orderObj.Amount = order.payment.amount;
        orderObj.ShipmentMethod = order.shipment.shipmentMethod;
        orderObj.ShipmentDate = order.shipment.shipmentDate;
        orderObj.EstimatedArrival = order.shipment.estimatedArrival;
        return orderObj;
    });
    return response;
};

let mapOrderUpdateRequest = (order) => {
    let updateRequst = {};
    updateRequst.shipment={};
    updateRequst.payment={};
    updateRequst.customerName = order.CustomerName;
    updateRequst.shipment.address = order.Address;
    updateRequst.orderDate = order.OrderDate;
    updateRequst.status = order.OrderStatus;
    updateRequst.payment.amount = order.Amount;
    updateRequst.shipment.shipmentMethod = order.ShipmentMethod;
    updateRequst.shipment.shipmentDate = order.ShipmentDate;
    updateRequst.shipment.estimatedArrival = order.EstimatedArrival;
    return updateRequst;
};
export {mapOrderSaveRequest,mapOrderResponse,mapOrderUpdateRequest};