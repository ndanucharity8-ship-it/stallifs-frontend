import { useNavigate } from "react-router-dom";

import {
  Queue,
  StatusBadge,
} from "../../../shared/components";

export default function AgentApplicationsQueue({
  applications = [],
}) {
  const navigate = useNavigate();

  const pendingApplications =
    applications.filter((application) =>
      [
        "submitted",
        "under_review",
        "information_requested",
        "shortlisted",
        "interview_scheduled",
        "interview_completed",
      ].includes(application.status)
    );

  const columns = [
    { key: "applicant", label: "Applicant" },
    { key: "county", label: "County" },
    { key: "status", label: "Status" },
    { key: "submitted", label: "Submitted" },
    { key: "action", label: "Action" },
  ];

  return (
    <Queue
      title="Agent Recruitment"
      description="Applications requiring recruitment review."
      items={pendingApplications.slice(0, 5)}
      variant="table"
      columns={columns}
      emptyMessage="No agent applications require attention."
      actions={
        <button
          type="button"
          onClick={() =>
            navigate(
              "/admin/agent-applications"
            )
          }
        >
          View All
        </button>
      }
      renderRow={(application) => (
        <>
          <td>
            <strong>
              {application.fullName}
            </strong>

            <small>
              {application.email}
            </small>
          </td>

          <td>
            {application.county || "—"}
          </td>

          <td>
            <StatusBadge
              status={
                application.status ||
                "pending"
              }
            >
              {application.status?.replace(
                /_/g,
                " "
              ) || "Pending"}
            </StatusBadge>
          </td>

          <td>
            {application.createdAt
              ? new Date(
                  application.createdAt
                ).toLocaleDateString()
              : "—"}
          </td>

          <td>
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/admin/agent-applications/${application._id}`
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