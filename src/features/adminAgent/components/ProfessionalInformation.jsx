export default function ProfessionalInformation({
  application,
}) {
  return (
    <div className="agent-section-card">

      <h2>Professional Information</h2>

      <hr />

      <div className="agent-info-grid">

        <div className="agent-info-item">
          <label>Insurance Experience</label>
          <p>
            {application.experience} 
          </p>
        </div>

        <div className="agent-info-item">
          <label>Previous Company</label>
          <p>
            {application.previousCompany ||
              "Not Provided"}
          </p>
        </div>

        <div className="agent-info-item">
          <label>Business Name</label>
          <p>
            {application.businessName ||
              "Not Provided"}
          </p>
        </div>

        <div className="agent-info-item">
          <label>KRA PIN</label>
          <p>{application.kraPin}</p>
        </div>

        <div className="agent-info-item">
          <label>County</label>
          <p>{application.county}</p>
        </div>

        <div className="agent-info-item">
          <label>Application Status</label>

          <span
            className={`status ${application.status}`}
          >
            {application.status.replaceAll(
              "_",
              " "
            )}
          </span>
        </div>

      </div>

    </div>
  );
}