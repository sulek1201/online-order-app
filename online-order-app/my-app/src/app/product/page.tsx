'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';


const Product = () => {
  const [productList, setProductList] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [isEditSideBar, setIsEditSideBar] = useState(false);
  const [productId, setProductId] = useState(0);





  useEffect(() => {
  getProductList()
  }, []);

  const getProductList =async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZW1hVGVzdDQiLCJzY29wZXMiOlt7ImF1dGhvcml0eSI6IlVTRVIifV0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODE4MSIsImlhdCI6MTcwMjgyMTAyNSwiZXhwIjoxNzAyOTA3NDI1fQ.tWy5ydxOw8N1jkl_QHJKYOIElQUAqllvUaMIEuqtvfM'; 

        const response = await axios.get('http://localhost:8081/api/product/all-product-list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProductList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  

  const createProduct = async () => {

    if(isEditSideBar){
      try {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWxlayIsInNjb3BlcyI6W3siYXV0aG9yaXR5IjoiVVNFUiJ9XSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgxIiwiaWF0IjoxNzAyODIxMDc1LCJleHAiOjE3MDI5MDc0NzV9.GDYIqq58ymMbH86ldUHFiVAu_3SI5SSfUh-yFP7fuy0'; 
  
        const product = {
          productName: productName,
          description: productDescription,
          price: productPrice,
          quantity: productQuantity,
        };
  
        const response = await axios.put('http://localhost:8080/api/product/update-food/' + productId, product, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVisible(false);
        getProductList();
        resetFormValues();
      } catch (error) {
        console.error(error);
      }
    } else{
      try {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWxlayIsInNjb3BlcyI6W3siYXV0aG9yaXR5IjoiVVNFUiJ9XSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgxIiwiaWF0IjoxNzAyODIxMDc1LCJleHAiOjE3MDI5MDc0NzV9.GDYIqq58ymMbH86ldUHFiVAu_3SI5SSfUh-yFP7fuy0';
  
        const product = {
          productName: productName,
          description: productDescription,
          price: productPrice,
          quantity: productQuantity,
        };
  
        const response = await axios.post('http://localhost:8080/api/product/add-product', product, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVisible(false);
        getProductList();
        resetFormValues();
      } catch (error) {
        console.error( error);
      }
    }
    
  };
  
  const deleteProduct = async (id: any) => {

      try {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWxlayIsInNjb3BlcyI6W3siYXV0aG9yaXR5IjoiVVNFUiJ9XSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgxIiwiaWF0IjoxNzAyODIxMDc1LCJleHAiOjE3MDI5MDc0NzV9.GDYIqq58ymMbH86ldUHFiVAu_3SI5SSfUh-yFP7fuy0'; 

  
        const response = await axios.delete('http://localhost:8080/api/product/delete-food/' + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        getProductList();
      } catch (error) {
        console.error( error);
      }
    
    
  };


   const resetFormValues =() => {
      setProductName('');
      setProductDescription('');
      setProductPrice(0);
      setProductQuantity(0);
   }

   const openEditSideBar =(item: any) => {
    setProductName(item.name);
    setProductDescription(item.description);
    setProductPrice(item.price);
    setProductQuantity(item.quantity);
    setVisible(true);
    setIsEditSideBar(true);
    setProductId(item.id);
 }

  return (
    <div className='p-5'>
      <div className='d-flex justify-content-end'>
      <Button label="Create" severity="success" onClick={() => {setVisible(true); setIsEditSideBar(false)}}/>

      </div>
      <table className='table table-bordered mt-2'>
        <thead className='table-light'>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          {productList.map((veri) => (
            <tr key={veri.id}>
              <td>{veri.name}</td>
              <td>{veri.description}</td>
              <td>{veri.price}</td>
              <td>{veri.quantity}</td>
              <td>
                <div className='mr-2 mb-2'>
                <Button label="Edit" onClick={() => openEditSideBar(veri)}/>

                </div>
                <div>
                <Button label="Delete" severity="danger" onClick={() => deleteProduct(veri.id)}/>
                </div>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Sidebar visible={visible} position="right" className="w-50" onHide={() => setVisible(false)}>
        <div className="mb-3">
            <label htmlFor="productName" className="form-label">Name</label>
            <input type="text" className="form-control" id="productName" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)}/>
        </div>
        
        <div className="mb-3">
            <label htmlFor="productDescription" className="form-label">Description</label>
            <input type="text" className="form-control" id="productDescription" placeholder="Product Description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)}/>
        </div>
        
        <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">Price</label>
            <input type="number" className="form-control" id="productPrice" placeholder="Product Price" value={productPrice} onChange={(e) => setProductPrice(+e.target.value)}/>
        </div>

        <div className="mb-3">
            <label htmlFor="productQuantity" className="form-label">Quantity</label>
            <input type="number" className="form-control" id="productQuantity" placeholder="Product Quantity" value={productQuantity} onChange={(e) => setProductQuantity(+e.target.value)}/>
        </div>

        <Button label="Save" onClick={() => createProduct()}/>

    </Sidebar>
    </div>
  );
};

export default Product;
