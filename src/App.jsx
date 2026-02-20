import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import ProductList from "./pages/productlist";
import ProductCreate from "./pages/ProductCreate";
import ProductEdit from "./pages/ProductEdit";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="min-vh-100 bg-light">
      {/* 1. Navbar chung cho toàn ứng dụng (Trừ trang Login nếu muốn) */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/home">
            ADMIN PANEL
          </Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/products">
              Sản phẩm
            </Link>
            <Link className="nav-link" to="/products/create">
              Thêm mới
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Container để căn giữa nội dung các trang con */}
      <div className="container py-2">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/create" element={<ProductCreate />} />
          <Route path="/products/:id/edit" element={<ProductEdit />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
