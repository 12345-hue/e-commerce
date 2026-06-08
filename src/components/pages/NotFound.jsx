import { Link } from "react-router-dom";
import img from "../../../src/assets/images/404.webp";

function NotFound() {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center text-center py-5" style={{ minHeight: "60vh" }}>
      <img src={img} alt="404 Not Found" style={{ maxWidth: "300px", marginBottom: "2rem" }} />
      <h2 className="fw-bold">Oops! Page not found</h2>
      <p className="text-secondary">The page you're looking for doesn't exist or has been moved.</p>
      <Link
        to="/"
        className="btn mt-3"
        style={{ backgroundColor: "var(--main-color)", color: "#fff", padding: "0.6rem 2rem" }}
      >
        ← Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
