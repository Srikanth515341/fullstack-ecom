import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Login button clicked!"); // ✅ Debugging log

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            console.log("Login success:", response.data); // ✅ Log API response

            localStorage.setItem("token", response.data.token);
            navigate("/products");
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            alert("Login failed! Check your credentials.");
        }
    };

    return (
        <Container className="mt-4">
            <h2>Login</h2>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="primary">Login</Button>
            </Form>
        </Container>
    );
};

export default Login;
