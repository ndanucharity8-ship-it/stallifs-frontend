import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import api from "../../../shared/api/axios";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/products/${id}`);

        setProduct(response.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load this insurance product."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="product-details-page">
        <div className="landing-container">
          <div className="product-details-loading">
            <div className="product-details-loading-icon">
              <ShieldCheck size={28} />
            </div>

            <p>Loading insurance product...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="product-details-page">
        <div className="landing-container">
          <div className="product-details-error">
            <div className="product-details-error-icon">
              <ShieldCheck size={28} />
            </div>

            <h1>Product unavailable</h1>

            <p>{error}</p>

            <Link
              to="/products"
              className="product-details-back-button"
            >
              <ArrowLeft size={17} />
              Back to Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <main className="product-details-page">
      <div className="landing-container">
        {/* Back navigation */}
        <Link
          to="/products"
          className="product-details-back-link"
        >
          <ArrowLeft size={17} />
          Back to Products
        </Link>

        {/* Main product content */}
        <div className="product-details-layout">
          {/* Product introduction */}
          <section className="product-details-intro">
            <div className="product-details-category">
              <ShieldCheck size={18} />
              <span>{product.category}</span>
            </div>

            <h1 className="product-details-title">
              {product.name}
            </h1>

            <p className="product-details-description">
              {product.description}
            </p>

            <div className="product-details-divider" />

            <p className="product-details-supporting-text">
              Get protection designed to give you
              confidence when it matters most.
            </p>
          </section>

          {/* Product action card */}
          <aside className="product-details-card">
            <div className="product-details-card-icon">
              <ShieldCheck size={28} />
            </div>

            <span className="product-details-card-label">
              Premium starting from
            </span>

            <strong className="product-details-premium">
              KSh{" "}
              {Number(
                product.premiumStartingFrom
              ).toLocaleString()}
            </strong>

            <p className="product-details-card-text">
              Start your insurance journey with
              STALLIFS today.
            </p>

            <div className="product-details-actions">
              <Link
                to={`/quote?product=${product._id}`}
                className="product-details-primary"
              >
                Get a Quote
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/login"
                className="product-details-secondary"
              >
                Already have an account?
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}