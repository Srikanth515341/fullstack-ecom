import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navigation = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate(); // ✅ Must be inside a Router

    const handleLogout = () => {
        logout();
        navigate("/login"); // ✅ Redirect to login after logout
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

export default Navigation;
