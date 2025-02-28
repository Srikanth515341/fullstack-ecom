import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ManageProduct from "./pages/ManageProduct";

const App = () => {
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link> | <Link to="/products">Products</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/add-product" element={<ManageProduct />} />
                <Route path="/edit-product/:id" element={<ManageProduct />} />
            </Routes>
        </Router>
    );
};

export default App;
