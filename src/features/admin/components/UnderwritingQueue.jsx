import { useNavigate } from "react-router-dom";

import {
  Queue,
  StatusBadge,
} from "../../../shared/components";

export default function UnderwritingQueue({
  applications = [],
}) {
  const navigate = useNavigate();

  const columns = [
    { key: "applicant", label: "Applicant" },
    { key: "product", label: "Product" },
    { key: "riskScore", label: "Risk Score" },
    { key: "risk", label: "Risk" },
    { key: "recommendation", label: "Recommendation" },
    { key: "status", label: "Status" },
    { key: "date", label: "Date" },
    { key: "action", label: "" },
  ];

  return (
    <Queue
      title="Underwriting Queue"
      description="Applications requiring underwriting review."
      items={applications}
      variant="table"
      columns={columns}
      emptyMessage="No applications waiting."
      actions={
        <button
          type="button"
          onClick={() =>
            navigate("/admin/applications")
          }
        >
          View All
        </button>
      }
      renderRow={(item) => (
        <>
          <td>{item.fullName}</td>

          <td>
            {item.product?.name || "Insurance"}
          </td>

          <td>{item.riskScore ?? "—"}</td>

          <td>
            <StatusBadge
              variant={
                item.riskLevel === "Low"
                  ? "approved"
                  : item.riskLevel === "Medium"
                  ? "pending"
                  : item.riskLevel === "High"
                  ? "rejected"
                  : "default"
              }
            >
              {item.riskLevel || "Unknown"}
            </StatusBadge>
          </td>

          <td>
            <StatusBadge
              variant={
                item.recommendation === "Approve"
                  ? "approved"
                  : item.recommendation === "Review"
                  ? "escalated"
                  : item.recommendation === "Reject"
                  ? "rejected"
                  : "pending"
              }
            >
              {item.recommendation || "Pending"}
            </StatusBadge>
          </td>

          <td>
            <StatusBadge
              status={item.status || "pending"}
            >
              {item.status
                ?.replaceAll("_", " ")
                .toUpperCase() || "PENDING"}
            </StatusBadge>
          </td>

          <td>
            {item.createdAt
              ? new Date(
                  item.createdAt
                ).toLocaleDateString()
              : "—"}
          </td>

          <td>
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/admin/underwriting/${item._id}`
                )
              }
            >
              Review
            </button>
          </td>
        </>
      )}
    />
  );
}