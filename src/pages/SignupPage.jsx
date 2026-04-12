import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    companyName: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role,
      };

      if (form.role === "organizer") {
        const companyName = form.companyName.trim();

        if (!companyName) {
          setError("Company name is required for organizers.");
          setSubmitting(false);
          return;
        }

        payload.companyName = companyName;
      }

      const res = await api.post("/auth/signup", payload);

      login(res.data);

      if (res.data.user?.role === "admin") {
        navigate("/admin");
      } else if (res.data.user?.role === "organizer") {
        navigate("/organizer/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content page-top-spacing">
        <div className="auth-card">
          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">
            Join KiRole as a user or as an event organizer.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="user">Normal User</option>
              <option value="organizer">Company / Organizer</option>
            </select>

            {form.role === "organizer" && (
              <input
                type="text"
                name="companyName"
                placeholder="Company name"
                value={form.companyName}
                onChange={handleChange}
                required
              />
            )}

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="auth-btn" disabled={submitting}>
              {submitting ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SignupPage;
