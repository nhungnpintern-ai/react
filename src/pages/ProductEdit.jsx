import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({ name: "", price: 0 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // Tránh double click
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await apiClient.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError("Không thể tải thông tin sản phẩm.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Bắt đầu gửi dữ liệu
    try {
      await apiClient.put(`/products/${id}`, product);
      alert("Cập nhật thành công!");
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Đã có lỗi xảy ra!");
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Chỉnh sửa sản phẩm</h4>
            </div>
            <div className="card-body p-4">
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Tên sản phẩm</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Nhập tên sản phẩm..."
                    value={product.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Giá sản phẩm (VNĐ)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={submitting}
                  >
                    {submitting ? "Đang lưu..." : "Lưu thay đổi"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() => navigate(-1)}
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductEdit;
