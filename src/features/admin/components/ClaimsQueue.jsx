import { useNavigate } from "react-router-dom";

import {
  Queue,
  StatusBadge,
} from "../../../shared/components";

export default function ClaimsQueue({
  claims = [],
}) {
  const navigate = useNavigate();

  const columns = [
    { key: "customer", label: "Customer" },
    { key: "policy", label: "Policy" },
    { key: "claimType", label: "Claim Type" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
    { key: "date", label: "Date" },
    { key: "action", label: "" },
  ];

  return (
    <Queue
      title="Claims Queue"
      description="Claims requiring administrator action."
      items={claims}
      variant="table"
      columns={columns}
      emptyMessage="No claims waiting."
      actions={
        <button
          type="button"
          onClick={() =>
            navigate("/admin/claims")
          }
        >
          View All
        </button>
      }
      renderRow={(claim) => (
        <>
          <td>
            {claim.user?.name ||
              claim.fullName ||
              "Unknown"}
          </td>

          <td>
            {claim.policy?.policyNumber || "—"}
          </td>

          <td>{claim.claimType || "—"}</td>

          <td>
            KSh{" "}
            {Number(
              claim.amount || 0
            ).toLocaleString()}
          </td>

          <td>
            <StatusBadge
              status={claim.status || "pending"}
            >
              {claim.status || "pending"}
            </StatusBadge>
          </td>

          <td>
            {claim.createdAt
              ? new Date(
                  claim.createdAt
                ).toLocaleDateString()
              : "—"}
          </td>

          <td>
            <button
              type="button"
              onClick={() =>
                navigate("/admin/claims")
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