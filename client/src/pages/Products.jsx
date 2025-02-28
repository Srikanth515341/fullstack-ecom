import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <Container>
            <h1 className="mt-4">Products</h1>
            <Link to="/add-product" className="btn btn-primary mb-3">Add Product</Link>
            <Row>
                {products.map(product => (
                    <Col key={product.id} md={4} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text>Price: <strong>${product.price}</strong></Card.Text>
                                <Card.Text>Stock: {product.stock}</Card.Text>
                                <Link to={`/edit-product/${product.id}`} className="btn btn-warning me-2">Edit</Link>
                                <Button variant="danger" onClick={() => deleteProduct(product.id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Products;
