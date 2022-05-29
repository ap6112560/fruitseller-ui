import React,{useState} from 'react';
import orderService from '../../services/Order'
import 'devextreme/dist/css/dx.light.css';
import DataGrid,
    {
        Column, Editing, Paging,
    } from 'devextreme-react/data-grid';
import {mapOrderResponse, mapOrderUpdateRequest} from '../utils/Mapper'

let onSaving = (event)=>{
    
    let updatedOrder = mapOrderUpdateRequest(event.changes[0].data);
    let id = event.changes[0].data["OrderId"];
    orderService.patch(updatedOrder,id).then(
        (response) => {
            console.log(response);
        }
    );
}

function Admin(props) {

    const [data, setData] = useState([]);
    let oid, ostatus, smethod;

    const filterResults = ()=>{
        let params = {};
        if(oid.value !== ""){
            params["filter.orderId"]=oid.value;
            oid.value="";
        }
        if(ostatus.value !== ""){
            params["filter.order.status"]=ostatus.value;
            ostatus.value="";
        }
        if(smethod.value !== ""){
            params["filter.shipment.method"]=smethod.value;
            smethod.value="";
        }
        orderService.get(params).then(
            (response) => {
                setData(mapOrderResponse(response));
            }
        );
    }
    
    return (
        <React.Fragment>
          <br/>
          <label>
          Order Id&nbsp;
          <input id="oid" type="text" ref={(el)=>{oid=el}}/>
          </label>
          &nbsp; 
          <label>
          Order Status&nbsp; 
          <input id="ostatus" type="text" ref={(el)=>{ostatus=el}}/>
          </label>
          &nbsp; 
          <label>
          Shipment Method&nbsp; 
          <input id="pstatus" type="text" ref={(el)=>{smethod=el}}/>
          </label>
          &nbsp;
          <button onClick={filterResults} >Filter</button>
          <br/>
          <br/>
          <DataGrid
            id="gridContainer"
            dataSource={data}
            showBorders={true}
            columnAutoWidth={true}
            onSaved={onSaving}
            >
  
            <Paging enabled={true} />
            <Editing
              mode="row"
              allowUpdating={true} />
  
            <Column dataField="OrderId" />
            <Column dataField="CustomerName" />
            <Column dataField="Address" />
            <Column dataField="OrderDate"/>
            <Column dataField="OrderStatus"/>
            <Column dataField="Amount"/>
            <Column dataField="ShipmentMethod" />
            <Column dataField="ShipmentDate"/>
            <Column dataField="EstimatedArrival"/>

          </DataGrid>
        </React.Fragment>
    );
}

export default Admin;