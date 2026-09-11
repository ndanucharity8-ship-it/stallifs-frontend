import { useAuth } from "../../../hooks";

export default function AgentHeader() {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString(
    "en-KE",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const displayName =
    user?.name || "Agent";

  const avatar =
    displayName
      .charAt(0)
      .toUpperCase();

  return (
    <div className="agent-header">
      <div className="agent-header-left">
        <h1>
          Welcome, {displayName}
        </h1>

        <p>
          Manage your customers, policies and
          commissions from one place.
        </p>

        <span className="agent-date">
          {today}
        </span>
      </div>

      <div className="agent-header-right">
        <div className="agent-profile-card">
          <div className="agent-avatar">
            {avatar}
          </div>

          <div className="agent-profile-info">
            <h3>
              {displayName}
            </h3>

            <p>
              {user?.email || ""}
            </p>

            <div className="agent-badges">
              <span className="agent-role">
                {user?.role?.toUpperCase() || "AGENT"}
              </span>

              {user?.agentCode && (
                <span className="agent-code">
                  {user.agentCode}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}