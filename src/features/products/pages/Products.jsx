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

const iconMap = {
  Motor: CarFront,
  Medical: HeartPulse,
  Life: ShieldCheck,
  Property: House,
  Business: BriefcaseBusiness,
  Travel: Plane,
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

        setProducts(response.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load insurance products."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="products-page">
      <section className="products-hero">
        <div className="landing-container">
          <span className="products-eyebrow">
            Insurance Products
          </span>

          <h1>
            Protection for
            <span> what matters.</span>
          </h1>

          <p>
            Explore our insurance products and find cover designed
            around the things that matter most to you.
          </p>
        </div>
      </section>

      <section className="products-section">
        <div className="landing-container">
          {loading && (
            <div className="products-state">
              <div className="products-loader" />
              <p>Loading insurance products...</p>
            </div>
          )}

          {!loading && error && (
            <div className="products-state products-state-error">
              <h2>We couldn't load our products.</h2>

              <p>{error}</p>

              <button
                type="button"
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="products-state">
              <h2>No products available</h2>

              <p>
                There are currently no active insurance products
                available.
              </p>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <>
              <div className="products-header">
                <div>
                  <span className="products-section-eyebrow">
                    AVAILABLE COVER
                  </span>

                  <h2>Choose your protection.</h2>
                </div>

                <p>
                  Select a product to learn more about the cover,
                  pricing and available options.
                </p>
              </div>

              <div className="products-grid">
                {products.map((product) => {
                  const Icon =
                    iconMap[product.category] || ShieldCheck;

                  return (
                    <Link
                      key={product._id}
                      to={`/products/${product._id}`}
                      className="product-card"
                    >
                      <div className="product-card-top">
                        <div className="product-icon">
                          <Icon
                            size={26}
                            strokeWidth={1.8}
                          />
                        </div>

                        <span className="product-category">
                          {product.category}
                        </span>
                      </div>

                      <div className="product-card-content">
                        <h3>{product.name}</h3>

                        <p>{product.description}</p>
                      </div>

                      <div className="product-card-bottom">
                        <span>
                          From{" "}
                          <strong>
                            KSh{" "}
                            {Number(
                              product.premiumStartingFrom
                            ).toLocaleString()}
                          </strong>
                        </span>

                        <span className="product-learn-more">
                          Learn more
                          <ArrowRight size={17} />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}