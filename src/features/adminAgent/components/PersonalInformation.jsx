export default function PersonalInformation({
  application,
}) {
  return (
    <div className="agent-section-card">

      <h2>Personal Information</h2>

      <hr />

      <div className="agent-info-grid">

        <div className="agent-info-item">
          <label>Full Name</label>
          <p>{application.fullName}</p>
        </div>

        <div className="agent-info-item">
          <label>Email Address</label>
          <p>{application.email}</p>
        </div>

        <div className="agent-info-item">
          <label>Phone Number</label>
          <p>{application.phone}</p>
        </div>

        <div className="agent-info-item">
          <label>National ID</label>
          <p>{application.nationalId}</p>
        </div>

        <div className="agent-info-item">
          <label>KRA PIN</label>
          <p>{application.kraPin}</p>
        </div>

        <div className="agent-info-item">
          <label>County</label>
          <p>{application.county}</p>
        </div>

      </div>

    </div>
  );
}