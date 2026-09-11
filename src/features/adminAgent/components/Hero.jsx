export default function Hero({
  application,
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

  return (
    <div className="agent-details-hero">

      <div className="agent-details-left">

        <div className="agent-details-avatar">

          {application.fullName
            ?.split(" ")
            .map((x) => x[0])
            .join("")
            .substring(0, 2)
            .toUpperCase()}

        </div>

        <div>

          <h1>{application.fullName}</h1>

          <p>{application.email}</p>

          <p>{application.phone}</p>

        </div>

      </div>

      <div className="agent-details-right">

        <div className="hero-card">

          <small>Status</small>

          <span
            className={statusClass(
              application.status
            )}
          >
            {application.status.replaceAll(
              "_",
              " "
            )}
          </span>

        </div>

        <div className="hero-card">

          <small>County</small>

          <h3>{application.county}</h3>

        </div>

        <div className="hero-card">

          <small>Experience</small>

          <h3>
            {application.experience} Years
          </h3>

        </div>

        <div className="hero-card">

          <small>Applied</small>

          <h3>
            {new Date(
              application.createdAt
            ).toLocaleDateString()}
          </h3>

        </div>

      </div>

    </div>
  );
}