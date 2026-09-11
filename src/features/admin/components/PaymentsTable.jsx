import { useNavigate } from "react-router-dom";

import {
  DataTable,
  StatusBadge,
} from "../../../shared/components";

export default function PaymentsTable({
  payments = [],
}) {
  const navigate = useNavigate();

  const columns = [
    {
      key: "receipt",
      label: "Receipt",
      accessor: (payment) =>
        payment.receiptNumber ||
        payment.mpesaReceipt ||
        "—",
    },
    {
      key: "customer",
      label: "Customer",
      accessor: (payment) =>
        payment.user?.name ||
        payment.fullName ||
        "—",
    },
    {
      key: "policy",
      label: "Policy",
      accessor: (payment) =>
        payment.policy?.policyNumber ||
        "—",
    },
    {
      key: "amount",
      label: "Amount",
      accessor: (payment) =>
        `KSh ${Number(
          payment.amount || 0
        ).toLocaleString()}`,
    },
    {
      key: "method",
      label: "Method",
      accessor: (payment) =>
        payment.paymentMethod ||
        "M-Pesa",
    },
    {
      key: "status",
      label: "Status",
      accessor: (payment) =>
        payment.status || "pending",
      render: (value) => (
        <StatusBadge status={value}>
          {value}
        </StatusBadge>
      ),
    },
    {
      key: "date",
      label: "Date",
      accessor: (payment) =>
        payment.createdAt
          ? new Date(
              payment.createdAt
            ).toLocaleDateString()
          : "—",
    },
  ];

  return (
    <section className="queue">
      <header className="queue-header">
        <div className="queue-heading">
          <h2 className="queue-title">
            Recent Premium Payments
          </h2>

          <p className="queue-description">
            Recent customer premium payment activity.
          </p>
        </div>

        <div className="queue-actions">
          <button
            type="button"
            onClick={() =>
              navigate("/admin/payments")
            }
          >
            View All
          </button>
        </div>
      </header>

      <div className="queue-content">
        <DataTable
          columns={columns}
          data={payments}
          emptyMessage="No premium payments found."
          rowKey="_id"
        />
      </div>
    </section>
  );
}