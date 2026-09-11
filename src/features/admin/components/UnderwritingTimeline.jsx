export default function UnderwritingTimeline({
  application,
}) {
  return (
    <div className="timeline-card">

      <h2>📈 Underwriting Timeline</h2>

      <hr className="section-divider" />

      {(application.timeline || []).length === 0 ? (

        <p>No underwriting activity recorded.</p>

      ) : (

        application.timeline.map((item, index) => (

          <div
            key={index}
            className="timeline-item"
          >

            <div className="timeline-marker">

              <div className="timeline-dot"></div>

            </div>

            <div className="timeline-content">

              <div className="timeline-header">

                <strong>{item.action}</strong>

                <span>
                  {new Date(
                    item.createdAt
                  ).toLocaleString()}
                </span>

              </div>

              <div className="timeline-user">

                {item.performedBy?.name ||
                  "System"}

              </div>

              {item.status && (

                <div className="timeline-status">

                  <strong>Status:</strong>{" "}
                  {item.status}

                </div>

              )}

              {item.notes && (

                <div className="timeline-notes">

                  {item.notes}

                </div>

              )}

            </div>

          </div>

        ))

      )}

    </div>
  );
}