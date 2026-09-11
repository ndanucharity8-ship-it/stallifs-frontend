import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  BriefcaseBusiness,
  CarFront,
  HeartPulse,
  House,
  Plane,
  ShieldCheck,
} from "lucide-react";

import api from "../../../shared/api/axios";

const categoryIcons = {
  Motor: CarFront,
  Medical: HeartPulse,
  Life: ShieldCheck,
  Property: House,
  Business: BriefcaseBusiness,
  Travel: Plane,
  Accident: ShieldCheck,
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/products");

        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);

        setError("Unable to load insurance products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="landing-products">
      <div className="landing-products-container">

        <div className="landing-products-header">
          <span className="landing-products-eyebrow">
            Insurance Products
          </span>

          <h2 className="landing-products-title">
            Cover for what matters.
          </h2>

          <p className="landing-products-subtitle">
            Simple protection for life, health, travel, and business.
          </p>
        </div>

        <div className="landing-products-grid">

          {loading && (
            <p className="landing-products-status">
              Loading insurance products...
            </p>
          )}

          {!loading && error && (
            <p className="landing-products-status">
              {error}
            </p>
          )}

          {!loading &&
            !error &&
            products.map((product) => {
              const Icon =
                categoryIcons[product.category] || ShieldCheck;

              return (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="landing-product-card"
                >
                  <div className="landing-product-icon">
                    <Icon
                      size={24}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div className="landing-product-content">
                    <h3>{product.name}</h3>

                    <p>{product.description}</p>
                  </div>

                  <span className="landing-product-link">
                    Learn more
                    <ArrowRight size={16} />
                  </span>
                </Link>
              );
            })}

        </div>
      </div>
    </section>
  );
}