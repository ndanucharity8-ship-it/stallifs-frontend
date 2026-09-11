import { useEffect, useMemo, useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import api from "../../../shared/api/axios";

import {
  Users,
  ClipboardList,
  Shield,
  ShieldAlert,
  CreditCard,
  Search,
} from "../../../shared/icons";

import {
  Card,
} from "../../../shared/ui";

import {
  StatCard,
  EmptyState,
  StatusBadge,
} from "../../../shared/components";

import { useAuth } from "../../../hooks";

import "../styles/SearchResults.css";

const resultSections = [
  {
    key: "users",
    title: "Users",
    icon: Users,
    emptyTitle: "No users found",
    emptyMessage: "No users matched your search.",
  },
  {
    key: "customers",
    title: "Customers",
    icon: Users,
    emptyTitle: "No customers found",
    emptyMessage: "No customers matched your search.",
  },
  {
    key: "applications",
    title: "Applications",
    icon: ClipboardList,
    emptyTitle: "No applications found",
    emptyMessage:
      "No applications matched your search.",
  },
  {
    key: "policies",
    title: "Policies",
    icon: Shield,
    emptyTitle: "No policies found",
    emptyMessage:
      "No policies matched your search.",
  },
  {
    key: "claims",
    title: "Claims",
    icon: ShieldAlert,
    emptyTitle: "No claims found",
    emptyMessage:
      "No claims matched your search.",
  },
  {
    key: "payments",
    title: "Payments",
    icon: CreditCard,
    emptyTitle: "No payments found",
    emptyMessage:
      "No payments matched your search.",
  },
];

function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString(
    "en-KE",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

function ResultItem({
  type,
  item,
  onClick,
}) {
  if (
    type === "users" ||
    type === "customers"
  ) {
    return (
      <button
        type="button"
        className="search-result-item search-result-item--clickable"
        onClick={onClick}
      >
        <div className="search-result-main">
          <h3>
            {item.name || "Unnamed User"}
          </h3>

          <p>
            {item.email ||
              "No email available"}
          </p>

          <span>
            {item.phone ||
              "No phone available"}
          </span>
        </div>

        <div className="search-result-meta">
          <StatusBadge
            status={item.role}
          />

          {item.agentCode && (
            <span>{item.agentCode}</span>
          )}

          {item.county && (
            <span>{item.county}</span>
          )}
        </div>
      </button>
    );
  }

  if (type === "applications") {
    return (
      <button
        type="button"
        className="search-result-item search-result-item--clickable"
        onClick={onClick}
      >
        <div className="search-result-main">
          <h3>
            {item.applicationNumber ||
              item.fullName ||
              "Application"}
          </h3>

          <p>
            {item.user?.name ||
              item.fullName ||
              "Unknown customer"}
          </p>

          <span>
            {item.product?.name ||
              "Insurance application"}
          </span>
        </div>

        <div className="search-result-meta">
          <StatusBadge
            status={item.status}
          />

          <span>
            {formatDate(
              item.createdAt
            )}
          </span>
        </div>
      </button>
    );
  }

  if (type === "policies") {
    return (
      <button
        type="button"
        className="search-result-item search-result-item--clickable"
        onClick={onClick}
      >
        <div className="search-result-main">
          <h3>
            {item.policyNumber ||
              "Insurance Policy"}
          </h3>

          <p>
            {item.user?.name ||
              "Unknown customer"}
          </p>

          <span>
            {item.product?.name ||
              "Insurance policy"}
          </span>
        </div>

        <div className="search-result-meta">
          <StatusBadge
            status={item.status}
          />

          <span>
            {formatDate(
              item.createdAt
            )}
          </span>
        </div>
      </button>
    );
  }

  if (type === "claims") {
    return (
      <button
        type="button"
        className="search-result-item search-result-item--clickable"
        onClick={onClick}
      >
        <div className="search-result-main">
          <h3>
            {item.policy?.policyNumber ||
              "Insurance Claim"}
          </h3>

          <p>
            {item.user?.name ||
              "Unknown customer"}
          </p>

          <span>
            {item.reason ||
              item.description ||
              "No claim description"}
          </span>
        </div>

        <div className="search-result-meta">
          <StatusBadge
            status={item.status}
          />

          <span>
            {formatDate(
              item.createdAt
            )}
          </span>
        </div>
      </button>
    );
  }

  if (type === "payments") {
    return (
      <button
        type="button"
        className="search-result-item search-result-item--clickable"
        onClick={onClick}
      >
        <div className="search-result-main">
          <h3>
            {item.mpesaReceipt ||
              "Payment"}
          </h3>

          <p>
            {item.user?.name ||
              "Unknown customer"}
          </p>

          <span>
            {item.phone ||
              "No phone available"}
          </span>
        </div>

        <div className="search-result-meta">
          <StatusBadge
            status={item.status}
          />

          {item.amount && (
            <strong>
              KES{" "}
              {Number(
                item.amount
              ).toLocaleString()}
            </strong>
          )}
        </div>
      </button>
    );
  }

  return null;
}

export default function SearchResults() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [searchParams] =
    useSearchParams();

  const query =
    searchParams.get("q") || "";

  const [results, setResults] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const search = async () => {
      if (!query.trim()) {
        setResults(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response =
          await api.get("/search", {
            params: {
              q: query,
            },
          });

        setResults(response.data);
      } catch (error) {
        console.error(
          "SEARCH ERROR:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Unable to perform search."
        );
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [query]);

  const handleResultClick = (type) => {
    const role = user?.role;

    if (
      type === "users" ||
      type === "customers"
    ) {
      if (role === "admin") {
        navigate("/admin");
        return;
      }

      if (role === "agent") {
        navigate("/agent");
        return;
      }

      if (role === "customer") {
        navigate("/dashboard");
        return;
      }
    }

    if (type === "applications") {
      if (role === "admin") {
        navigate("/admin/applications");
        return;
      }

      if (role === "agent") {
        navigate("/agent");
        return;
      }

      if (role === "customer") {
        navigate("/applications");
        return;
      }
    }

    if (type === "policies") {
      if (role === "admin") {
        navigate("/admin/policies");
        return;
      }

      if (role === "agent") {
        navigate("/agent");
        return;
      }

      if (role === "customer") {
        navigate("/policies");
        return;
      }
    }

    if (type === "claims") {
      if (role === "admin") {
        navigate("/admin/claims");
        return;
      }

      if (role === "agent") {
        navigate("/agent");
        return;
      }

      if (role === "customer") {
        navigate("/claims");
        return;
      }
    }

    if (type === "payments") {
      if (role === "admin") {
        navigate("/admin/payments");
        return;
      }

      if (role === "agent") {
        navigate("/agent");
        return;
      }

      if (role === "customer") {
        navigate("/payments");
      }
    }
  };

  const summary = useMemo(() => {
    if (!results) {
      return {
        users: 0,
        applications: 0,
        policies: 0,
        claims: 0,
        payments: 0,
      };
    }

    return {
      users:
        results.users?.length ||
        results.customers?.length ||
        0,

      applications:
        results.applications?.length || 0,

      policies:
        results.policies?.length || 0,

      claims:
        results.claims?.length || 0,

      payments:
        results.payments?.length || 0,
    };
  }, [results]);

  if (loading) {
    return (
      <div className="search-results-page">
        <div className="search-results-loading">
          <Search size={28} />

          <h2>Searching...</h2>

          <p>
            Looking for results matching
            "{query}"
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results-page">
        <div className="search-results-error">
          <h2>Search unavailable</h2>

          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-page">
      <div className="search-results-header">
        <div>
          <span className="search-results-eyebrow">
            Global Search
          </span>

          <h1>Search Results</h1>

          <p>
            Results for{" "}
            <strong>"{query}"</strong>
          </p>
        </div>
      </div>

      <div className="search-summary-grid">
        <StatCard
          title="Users"
          value={summary.users}
          subtitle="Matching users"
          icon={Users}
          color="primary"
        />

        <StatCard
          title="Applications"
          value={summary.applications}
          subtitle="Matching applications"
          icon={ClipboardList}
          color="info"
        />

        <StatCard
          title="Policies"
          value={summary.policies}
          subtitle="Matching policies"
          icon={Shield}
          color="success"
        />

        <StatCard
          title="Claims"
          value={summary.claims}
          subtitle="Matching claims"
          icon={ShieldAlert}
          color="warning"
        />

        <StatCard
          title="Payments"
          value={summary.payments}
          subtitle="Matching payments"
          icon={CreditCard}
          color="secondary"
        />
      </div>

      <div className="search-result-sections">
        {resultSections.map(
          ({
            key,
            title,
            icon: Icon,
            emptyTitle,
            emptyMessage,
          }) => {
            const items =
              results?.[key] || [];

            return (
              <Card
                key={key}
                className="search-result-section"
              >
                <div className="search-section-header">
                  <div className="search-section-title">
                    <Icon size={20} />

                    <h2>{title}</h2>

                    <span className="search-section-count">
                      {items.length}
                    </span>
                  </div>
                </div>

                {!items.length ? (
                  <EmptyState
                    title={emptyTitle}
                    description={emptyMessage}
                  />
                ) : (
                  <div className="search-result-list">
                    {items.map((item) => (
                      <ResultItem
                        key={item._id}
                        type={key}
                        item={item}
                        onClick={() =>
                          handleResultClick(
                            key
                          )
                        }
                      />
                    ))}
                  </div>
                )}
              </Card>
            );
          }
        )}
      </div>
    </div>
  );
}