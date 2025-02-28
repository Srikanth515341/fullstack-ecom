import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ManageProduct from "./pages/ManageProduct";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import Navigation from "./components/Navigation"; // ✅ Correct Import

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? children : <Login />;
};

const App = () => {
    return (
        <Router>  {/* ✅ Router MUST wrap everything */}
            <AuthProvider> {/* ✅ AuthProvider inside Router */}
                <Navigation />  {/* ✅ Navbar inside Router */}
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
