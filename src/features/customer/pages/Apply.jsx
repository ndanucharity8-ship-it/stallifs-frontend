import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import api from "../../../shared/api/axios";
import { ArrowRight, CheckCircle2, FileText, ShieldCheck } from "../../../shared/icons";
import { Button } from "../../../shared/ui";

export default function Apply() {
  const [searchParams] = useSearchParams();

  const quoteId = searchParams.get("quote");
  const productId = searchParams.get("product");

  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(Boolean(quoteId));
  const [error, setError] = useState("");

  useEffect(() => {
    const loadQuote = async () => {
      if (!quoteId) {
        setLoading(false);
        return;
      }

      try {
        setError("");

        const response = await api.get(`/quotes/${quoteId}`);

        setQuote(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load your quote. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadQuote();
  }, [quoteId]);

  const productName =
    quote?.product?.name ||
    "Insurance";

  const premium =
    quote?.estimatedPremium !== undefined
      ? new Intl.NumberFormat("en-KE", {
          style: "currency",
          currency: "KES",
          maximumFractionDigits: 0,
        }).format(Number(quote.estimatedPremium))
      : null;

  if (loading) {
    return (
      <main className="apply-page">
        <section className="apply-section">
          <div className="landing-container">
            <div className="apply-card">
              <p>Loading your quote...</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="apply-page">
      <section className="apply-hero">
        <div className="landing-container">
          <div className="apply-hero-content">
            <span className="quote-eyebrow">
              INSURANCE APPLICATION
            </span>

            <h1>
              Continue with your
              <span> application.</span>
            </h1>

            <p>
              You have completed your initial quote.
              Continue below to provide the information
              required to apply for your insurance cover.
            </p>
          </div>
        </div>
      </section>

      <section className="apply-section">
        <div className="landing-container">
          <div className="apply-card">
            {error && (
              <div className="quote-form-error" role="alert">
                {error}
              </div>
            )}

            <div className="apply-card-icon">
              <ShieldCheck size={30} strokeWidth={1.8} />
            </div>

            <span className="quote-section-eyebrow">
              READY TO APPLY
            </span>

            <h2>
              {productName}
            </h2>

            {premium && (
              <div className="apply-quote-summary">
                <span>ESTIMATED PREMIUM</span>

                <strong>{premium}</strong>

                <small>
                  Initial estimate subject to assessment
                  and underwriting.
                </small>
              </div>
            )}

            {quoteId && (
              <div className="apply-quote-id">
                <FileText size={18} />

                <span>
                  Quote ID: <strong>{quoteId}</strong>
                </span>
              </div>
            )}

            <div className="apply-next-steps">
              <h3>What happens next?</h3>

              <div className="apply-step">
                <CheckCircle2 size={19} />

                <span>
                  Provide your application details.
                </span>
              </div>

              <div className="apply-step">
                <CheckCircle2 size={19} />

                <span>
                  Submit your application for review.
                </span>
              </div>

              <div className="apply-step">
                <CheckCircle2 size={19} />

                <span>
                  STALLIFS will assess your application
                  and proceed with underwriting.
                </span>
              </div>
            </div>

            <div className="apply-actions">
              <Link
                to={
                  quoteId
                    ? `/login?redirect=/apply?quote=${quoteId}`
                    : "/login"
                }
              >
                <Button
                  size="lg"
                  rightIcon={ArrowRight}
                >
                  Login to Continue
                </Button>
              </Link>

              <Link
                to={
                  quoteId
                    ? `/register?redirect=/apply?quote=${quoteId}`
                    : "/register"
                }
              >
                <Button
                  variant="secondary"
                  size="lg"
                >
                  Create Account
                </Button>
              </Link>
            </div>

            <p className="apply-account-note">
              An account is required to submit and manage
              your insurance application.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}