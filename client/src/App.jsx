import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ManageProduct from "./pages/ManageProduct";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthProvider, { AuthContext } from "./context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login"); // Redirect to login after logout
    };

    return (
        <nav>
            <Link to="/">Home</Link> | <Link to="/products">Products</Link> |
            {!user ? (
                <>
                    <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
                </>
            ) : (
                <button onClick={handleLogout} style={{ marginLeft: "10px", cursor: "pointer" }}>
                    Logout
                </button>
            )}
        </nav>
    );
};

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? children : <Login />;
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
                    <Route path="/add-product" element={<ProtectedRoute><ManageProduct /></ProtectedRoute>} />
                    <Route path="/edit-product/:id" element={<ProtectedRoute><ManageProduct /></ProtectedRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
