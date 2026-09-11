import "../styles/dashboard.css";

export default function CustomerProfile({
  profile,
  stats,
  aiSummary,
}) {
  const initials =
    profile?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "CU";

  return (
    <div className="dashboard-card">

      <h2>Customer Profile</h2>

      <div className="profile-header">

        <div className="profile-avatar">
          {initials}
        </div>

        <div className="profile-info">

          <h3>{profile?.name}</h3>

          <p>{profile?.email}</p>

          <p>{profile?.phone}</p>

        </div>

      </div>

      <div className="profile-list">

        <div className="profile-row">
          <span>Member Since</span>

          <strong>
            {profile?.memberSince
              ? new Date(
                  profile.memberSince
                ).toLocaleDateString()
              : "-"}
          </strong>
        </div>

        <div className="profile-row">
          <span>Active Policies</span>

          <strong>
            {stats.activePolicies}
          </strong>
        </div>

        <div className="profile-row">
          <span>Total Applications</span>

          <strong>
            {stats.applications}
          </strong>
        </div>

        <div className="profile-row">
          <span>Total Claims</span>

          <strong>
            {stats.claims}
          </strong>
        </div>

        <div className="profile-row">
          <span>Total Payments</span>

          <strong>
            {stats.payments}
          </strong>
        </div>

        <div className="profile-row">
          <span>Risk Level</span>

          <strong
            style={{
              color:
                aiSummary?.riskLevel === "High"
                  ? "#D32F2F"
                  : aiSummary?.riskLevel === "Medium"
                  ? "#F9A825"
                  : "#2E7D32",
            }}
          >
            {aiSummary?.riskLevel}
          </strong>
        </div>

      </div>

    </div>
  );
}