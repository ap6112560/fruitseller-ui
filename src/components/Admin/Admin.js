import React,{useState,useEffect,useCallback} from 'react';
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
    const [pageNo, setPageNo] = useState(1);
    const [oid, setOid] = useState("");
    const [ostatus, setOstatus] = useState("");
    const [smethod, setSmethod] = useState("");
    let prev, next;

    const filterResults = useCallback(()=>{
        let params = {};
        if(oid.value !== ""){
            params["filter.orderId"]=oid.value;
        }
        if(ostatus.value !== ""){
            params["filter.order.status"]=ostatus.value;
        }
        if(smethod.value !== ""){
            params["filter.shipment.method"]=smethod.value;
        }
        params["filter.page.number"]=pageNo;
        
        orderService.get(params).then(
            (response) => {
                setData(mapOrderResponse(response));
            }
        );
    }, [oid, ostatus, pageNo, smethod]);
    
    const onNext = ()=>{
        setPageNo(pageNo+1)
    }
    const onPrev = ()=>{
        setPageNo(pageNo-1);
    }

    useEffect(() => {
        filterResults();
    },[pageNo,filterResults]);

    useEffect(() => {
        data.length===20?
            next.disabled=false:
            next.disabled=true;
        pageNo>1?
            prev.disabled=false:
            prev.disabled=true;
    },[data,next,prev,pageNo]);

    return (
        <React.Fragment>
          <label>
          Order Id&nbsp;
          <input id="oid" type="text" ref={(el)=>{setOid(el)}}/>
          </label>
          &nbsp; 
          <label>
          Order Status&nbsp; 
          <input id="ostatus" type="text" ref={(el)=>{setOstatus(el)}}/>
          </label>
          &nbsp; 
          <label>
          Shipment Method&nbsp; 
          <input id="pstatus" type="text" ref={(el)=>{setSmethod(el)}}/>
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
  
            <Paging enabled={false} />
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
          <br/>
          <label>Page: {pageNo}</label>
          <hr/>
          <button id="prev" onClick={onPrev} ref={(el)=>{prev=el}}>Prev</button>
          <button id="next" onClick={onNext} ref={(el)=>{next=el}}>Next</button>
        </React.Fragment>
    );
}

export default Admin;