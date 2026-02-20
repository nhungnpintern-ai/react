import { useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách sản phẩm để hiển thị
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await apiClient.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading)
    return <div className="text-center mt-5">Đang tải sản phẩm...</div>;

  return (
    <div className="container mt-4">
      {/* Banner Quảng Cáo */}
      <div className="p-5 mb-4 bg-primary text-white rounded-3 shadow">
        <div className="container-fluid py-5 text-center">
          <h1 className="display-5 fw-bold">電子機器の世界</h1>
          <p className="fs-4">最大50％OFF衝撃セール</p>
          <button className="btn btn-light btn-lg" type="button">
            すぐ購入
          </button>
        </div>
      </div>

      <h2 className="mb-4 text-dark border-start border-4 border-light ps-3">
        新商品
      </h2>

      {/* Grid Sản Phẩm */}
      <div className="row g-4">
        {products.map((item) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
            <div className="card h-100 shadow-sm border-0">
              {/* Hình ảnh sản phẩm (Dùng ảnh giả lập nếu API chưa có ảnh) */}
              <img
                src={`https://picsum.photos/seed/${item.id}/300/200`}
                className="card-img-top rounded-top"
                alt={item.name}
              />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold text-truncate">
                  {item.name}
                </h5>
                <p className="card-text text-danger fs-5 fw-semibold">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.price)}
                </p>
                <p className="card-text text-muted small flex-grow-1">
                  Mô tả ngắn gọn về thiết bị điện tử siêu bền, siêu xịn...
                </p>

                <div className="d-grid gap-2 mt-3">
                  <button className="btn btn-primary btn-sm">
                    Thêm vào giỏ
                  </button>
                  <Link
                    to={`/products/${item.id}/edit`}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    Chi tiết
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
