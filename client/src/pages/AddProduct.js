import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token tidak ditemukan');
        return;
      }

      const response = await fetch('http://localhost:5000/product/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          product_name: productName,
          product_desc: productDesc,
          price: price,
        }),
      });

      const result = await response.json();
      console.log(result);

      if (result.success) {
        navigate('/home');
      } else {
        console.error('Gagal menambahkan produk', result.message);
      }
    } catch (error) {
      console.error('Gagal menambahkan produk', error);
    }
  };

  return (
    <div>
      <h2>Tambah Produk</h2>
      <label>
        Nama Produk
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </label>
      <label>
        Deskripsi Produk
        <textarea
          value={productDesc}
          onChange={(e) => setProductDesc(e.target.value)}
        />
      </label>
      <label>
        Harga
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <button onClick={handleAddProduct}>Tambah Produk</button>
    </div>
  );
};

export default AddProduct;