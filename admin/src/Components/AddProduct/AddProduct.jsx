import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

    const [image,setImage] = useState(false);

    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })

    const imageHandler = (e)=>{
        setImage(e.target.files[0]);

    }

    const changeHandler = (e) =>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const Add_Product = async ()=>{
        console.log('This are the product details:', productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product',image);

        await fetch('http://localhost:4000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp)=> resp.json()).then((data)=>{responseData=data});

        if(responseData.success)
        {
            product.image = responseData.image_url;
            console.log('This is the product', product)
            await fetch('http://localhost:4000/addproduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product Added"):alert("Failed")
            })
            
        }
    }

  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Titlu Produs</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder='Type here' />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Pret</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type here' />
            </div>
            <div className="addproduct-itemfield">
                <p>Pret Redus</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type here' />
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Categorie</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                <option value="women">Bratari</option>
                <option value="men">Haine</option>
                <option value="kid">Diverse</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="" />
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
        </div>
        <button onClick={()=>{Add_Product()}} className='addproduct-btn'>Adauga</button>
      
    </div>
  )
}

export default AddProduct
