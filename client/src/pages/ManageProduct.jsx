import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ManageProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/api/products/${id}`)
                .then(response => {
                    setName(response.data.name);
                    setDescription(response.data.description);
                    setPrice(response.data.price);
                    setStock(response.data.stock);
                })
                .catch(error => console.error("Error fetching product:", error));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = { name, description, price, stock };

        try {
            if (id) {
                await axios.put(`http://localhost:5000/api/products/${id}`, productData);
            } else {
                await axios.post("http://localhost:5000/api/products", productData);
            }
            navigate("/products");
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    return (
        <div>
            <h1>{id ? "Edit Product" : "Add Product"}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
                <button type="submit">{id ? "Update Product" : "Add Product"}</button>
            </form>
        </div>
    );
};

export default ManageProduct;
