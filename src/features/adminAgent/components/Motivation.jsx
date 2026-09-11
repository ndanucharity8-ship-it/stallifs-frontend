export default function Motivation({
  application,
}) {
  return (
    <div className="agent-section-card">

      <h2>Applicant Motivation</h2>

      <hr />

      <div className="motivation-box">

        {application.motivation ? (
          <p>{application.motivation}</p>
        ) : (
          <p className="no-motivation">
            No motivation statement was provided.
          </p>
        )}

      </div>

    </div>
  );
}