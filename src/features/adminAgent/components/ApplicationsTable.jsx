import { Link } from "react-router-dom";
import {
  DataTable,
  SectionHeader,
  StatusBadge,
} from "../../../shared/components";

export default function ApplicationsTable({
  applications,
}) {
  const statusClass = (status) => {
    switch (status) {
      case "approved":
        return "status approved";

      case "rejected":
        return "status rejected";

      case "under_review":
        return "status review";

      case "information_requested":
        return "status info";

      default:
        return "status submitted";
    }
  };

  const columns = [
    {
      key: "applicant",
      label: "Applicant",
      render: (_, application) => (
        <div className="agent-user">
          <div className="agent-avatar">
            {application.fullName
              ?.split(" ")
              .map((name) => name[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()}
          </div>

          <div>
            <strong>{application.fullName}</strong>
            <small>{application.email}</small>
          </div>
        </div>
      ),
    },
    { key: "county", label: "County" },
    { key: "experience", label: "Experience" },
    {
      key: "status",
      label: "Status",
      render: (status) => (
        <StatusBadge
          status={status}
          className={statusClass(status)}
        >
          {status?.replaceAll("_", " ")}
        </StatusBadge>
      ),
    },
    {
      key: "createdAt",
      label: "Applied",
      render: (createdAt) =>
        createdAt
          ? new Date(createdAt).toLocaleDateString()
          : "-",
    },
    {
      key: "action",
      label: "Action",
      render: (_, application) => (
        <Link
          className="view-btn"
          to={`/admin/agent-applications/${application._id}`}
        >
          View
        </Link>
      ),
    },
  ];

  return (
    <section className="agent-table-card">
      <SectionHeader
        className="table-header"
        title="Agent Applications"
      />

      <DataTable
        className="agent-table-wrapper"
        columns={columns}
        data={applications}
        emptyMessage="No applications found."
      />
    </section>
  );
}
