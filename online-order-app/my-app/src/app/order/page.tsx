'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';


const Order = () => {
  const [orderList, setOrderList] = useState<any[]>([]);





  useEffect(() => {
  getOrderList()
  }, []);

  const getOrderList =async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWxlayIsInNjb3BlcyI6W3siYXV0aG9yaXR5IjoiVVNFUiJ9XSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgxIiwiaWF0IjoxNzAyODIxMDc1LCJleHAiOjE3MDI5MDc0NzV9.GDYIqq58ymMbH86ldUHFiVAu_3SI5SSfUh-yFP7fuy0'; 

        const response = await axios.get('http://localhost:8080/api/order/check-order-by-status/ALL', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrderList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  

  
  const cancelOrder = async (orderId: any) => {

      try {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZW1hVGVzdDQiLCJzY29wZXMiOlt7ImF1dGhvcml0eSI6IlVTRVIifV0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODE4MSIsImlhdCI6MTcwMjgyMTAyNSwiZXhwIjoxNzAyOTA3NDI1fQ.tWy5ydxOw8N1jkl_QHJKYOIElQUAqllvUaMIEuqtvfM'; 
  
        const response = await axios.post('http://localhost:8081/api/order/cancel-order/' + orderId, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        getOrderList();
      } catch (error) {
        console.error( error);
      }
    
    
  };


   

  return (
    <div className='p-5'>
      <table className='table table-bordered'>
        <thead className='table-light'>
          <tr>
            <th>Ordered User Name</th>
            <th>Ordered User Address</th>
            <th>Order Status</th>
            <th>Product Id</th>
            <th>Quantity</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          {orderList.map((veri) => (
            <tr key={veri.orderId}>
              <td>{veri.orderedUserName}</td>
              <td>{veri.orderedUserAddress}</td>
              <td>{veri.orderStatus}</td>
              <td>{veri.productId}</td>
              <td>{veri.quantity}</td>
              <td>                
                <Button label="Cancel" severity="warning" onClick={() => cancelOrder(veri.orderId)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
};

export default Order;
