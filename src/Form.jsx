import axios from "axios";
import React, { useState, useEffect } from "react";

const Form = () => {
  const [product, setProduct] = useState({
    title: "",
    image: "",
    dec: "",
    price: "",
  });

  const [products, setProducts] = useState([]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      product.title !== "" &&
      product.image !== "" &&
      product.dec !== "" &&
      product.price !== ""
    ) {
      console.log(products);
      setProducts([...products, product]);
      await axios.post("http://localhost:3000/product", product);
    }
  };

  const getData = async () => {
    const res = await axios.get("http://localhost:3000/product");
    if (res) setProducts(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={product.title}
            onChange={handleInput}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="url"
            name="image"
            placeholder="Image URL"
            value={product.image}
            onChange={handleInput}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="dec"
            placeholder="Description"
            value={product.dec}
            onChange={handleInput}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleInput}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Product
          </button>
        </form>
      </div>
      <div className="flex flex-wrap justify-around">
        {products.map((ele, id) => (
          <div className="bg-gray-200 p-4 m-2 rounded-md shadow-md w-full md:w-1/3 lg:w-1/4" key={id}>
            <img src={ele.image} alt={ele.title} className="w-full h-48 object-cover rounded-md mb-2" />
            <h1 className="text-xl font-bold mb-1">{ele.title}</h1>
            <p className="text-gray-700 mb-1">{ele.dec}</p>
            <p className="text-gray-900 font-semibold">{ele.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
