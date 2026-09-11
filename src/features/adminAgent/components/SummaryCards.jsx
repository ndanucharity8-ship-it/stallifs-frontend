export default function SummaryCards({
  applications,
}) {
  const submitted = applications.filter(
    (a) => a.status === "submitted"
  ).length;

  const underReview = applications.filter(
    (a) => a.status === "under_review"
  ).length;

  const informationRequested = applications.filter(
    (a) => a.status === "information_requested"
  ).length;

  const approved = applications.filter(
    (a) => a.status === "approved"
  ).length;

  const rejected = applications.filter(
    (a) => a.status === "rejected"
  ).length;

  return (
    <StatsGrid
      columns={5}
      className="agent-summary-grid"
    >
      <StatCard
        className="agent-summary-card submitted"
        title="Submitted"
        value={submitted}
      />

      <StatCard
        className="agent-summary-card review"
        title="Under Review"
        value={underReview}
      />

      <StatCard
        className="agent-summary-card info"
        title="Information Requested"
        value={informationRequested}
      />

      <StatCard
        className="agent-summary-card approved"
        title="Approved"
        value={approved}
      />

      <StatCard
        className="agent-summary-card rejected"
        title="Rejected"
        value={rejected}
      />
    </StatsGrid>
  );
}
import {
  StatCard,
  StatsGrid,
} from "../../../shared/components";
