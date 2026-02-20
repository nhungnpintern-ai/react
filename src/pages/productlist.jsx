import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiClient } from "../api/apiClient";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await apiClient("/products/");
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("データの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading)
    return <div className="container mt-5 text-center">読み込み中...</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>商品管理</h3>
        <Link to="/products/create" className="btn btn-success">
          新規追加
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th className="ps-3">ID</th>
              <th>商品名</th>
              <th>価格</th>
              <th className="text-end pe-3">操作</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td className="ps-3 text-muted">#{item.id}</td>
                <td className="fw-bold">{item.name}</td>
                <td className="text-danger">{item.price.toLocaleString()}円</td>
                <td className="text-end pe-3">
                  <Link
                    to={`/products/${item.id}/edit`}
                    className="btn btn-sm btn-outline-primary me-2"
                  >
                    編集
                  </Link>
                  <button className="btn btn-sm btn-outline-danger">
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
