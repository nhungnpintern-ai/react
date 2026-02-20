import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("LOGIN DATA:", data);

      localStorage.setItem("token", data.access_token);

      navigate("/products");
    } catch (err) {
      setError("ユーザー名かパスワードが不明");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>ログイン</h2>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="User Name"
              value={username} // Nên thêm value để đồng bộ state
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">ログイン</button>
        </form>

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}

export default Login;
