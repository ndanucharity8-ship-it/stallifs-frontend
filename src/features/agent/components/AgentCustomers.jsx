import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import api from "../../../shared/api/axios";

export default function AgentCustomers() {
  const navigate = useNavigate();

  const [customers, setCustomers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get(
        "/agent/customers"
      );

      setCustomers(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "AGENT CUSTOMERS ERROR:",
        error
      );

      setCustomers([]);

      setError(
        error.response?.data?.message ||
          "Unable to load customers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return customers;
    }

    return customers.filter((customer) =>
      [
        customer.name,
        customer.email,
        customer.phone,
      ]
        .filter(Boolean)
        .some((value) =>
          value
            .toLowerCase()
            .includes(query)
        )
    );
  }, [customers, search]);

  return (
    <div className="agent-section-card">
      <div className="section-header">
        <h2>Assigned Customers</h2>

        <div className="section-header-actions">
          <input
            type="search"
            placeholder="Search customer..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            className="search-input"
            aria-label="Search customers"
          />

          <button
            type="button"
            className="refresh-btn"
            onClick={loadCustomers}
            disabled={loading}
          >
            {loading
              ? "Refreshing..."
              : "Refresh"}
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading customers...</p>
      ) : error ? (
        <div className="error-state">
          <h3>
            Unable to Load Customers
          </h3>

          <p>{error}</p>

          <button
            type="button"
            className="refresh-btn"
            onClick={loadCustomers}
          >
            Try Again
          </button>
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="empty-state">
          <h3>
            {search
              ? "No Customers Found"
              : "No Assigned Customers"}
          </h3>

          <p>
            {search
              ? "Try a different search term."
              : "Customers assigned to you will appear here."}
          </p>
        </div>
      ) : (
        <div className="agent-table-wrapper">
          <table className="agent-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Policies</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map(
                (customer) => (
                  <tr
                    key={customer._id}
                  >
                    <td>
                      {customer.name ||
                        "Unknown"}
                    </td>

                    <td>
                      {customer.email || "-"}
                    </td>

                    <td>
                      {customer.phone || "-"}
                    </td>

                    <td>
                      {customer.policyCount || 0}
                    </td>

                    <td>
                      <span
                        className={
                          customer.active
                            ? "status-approved"
                            : "status-pending"
                        }
                      >
                        {customer.active
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="view-btn"
                        onClick={() =>
                          navigate(
                            `/agent/customers/${customer._id}`
                          )
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}