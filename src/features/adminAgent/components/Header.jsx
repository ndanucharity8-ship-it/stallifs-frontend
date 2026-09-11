import {
  RefreshButton,
  SectionHeader,
} from "../../../shared/components";

export default function Header({
  total,
  refresh,
}) {
  return (
    <SectionHeader
      className="agent-header"
      title="Agent Applications"
      subtitle="Review, approve and manage prospective Stallifs Insurance Agents."
      actions={
        <div className="agent-header-right">
          <div className="agent-total-card">
            <small>Total Applications</small>
            <h2>{total}</h2>
          </div>

          <RefreshButton
            className="agent-refresh-btn"
            onClick={refresh}
          />
        </div>
      }
    />
  );
}
