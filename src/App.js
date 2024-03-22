import React, { useState, useEffect } from 'react';

const Product = ({ id, name, price, onDelete }) =>{
  return (
    <div>
      <p>{id} - {name} - ${price}
      <button onClick={onDelete} id="btn">Delete</button></p>
    </div>
  );
}

const App = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products'));
    if (savedProducts) {
      setProducts(savedProducts);
      // Calculate total price from saved products
      const calculatedTotalPrice = savedProducts.reduce(
        (total, product) => total + product.price,
        0
      );
      setTotalPrice(calculatedTotalPrice);
    }
  }, []); // Only run once on initial render

  const addProduct = () => {
    const price = parseFloat(sellingPrice);
    if (!productId || !productName || isNaN(price)) return;

    const newProduct = {
      id: productId,
      name: productName,
      price
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    setTotalPrice(totalPrice + price);

    // Save updated products to local storage
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Clear input fields after adding product
    setProductId('');
    setProductName('');
    setSellingPrice('');
  };

  const deleteProduct = (index) => {
    const deletedProduct = products[index];
    const deletedPrice = deletedProduct.price;
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    setTotalPrice(totalPrice - deletedPrice);

    // Save updated products to local storage
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <div className="card">
      <h1>Sellers Admin Dashboard</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Product id"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        
        <input
          type="text"
          placeholder="Enter Selling Price"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>
      <div>
        <h2>Products List</h2>
        {products.map((product, index) => (
          <Product
            key={index}
            id={product.id}
            name={product.name}
            price={product.price}
            onDelete={() => deleteProduct(index)}
          />
        ))}
      </div>
      <div>
        <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default App;
