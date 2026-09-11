export default function Timeline({
  application,
}) {
  const timeline =
    application.timeline || [];

  return (
    <div className="agent-section-card">

      <h2>Application Timeline</h2>

      <hr />

      {timeline.length === 0 ? (

        <div className="timeline-empty">
          No activity has been recorded.
        </div>

      ) : (

        <div className="timeline">

          {timeline.map((item, index) => (

            <div
              key={index}
              className="timeline-item"
            >

              <div className="timeline-dot"></div>

              <div className="timeline-content">

                <div className="timeline-header">

                  <h4>{item.action}</h4>

                  <small>
                    {item.createdAt
                      ? new Date(
                          item.createdAt
                        ).toLocaleString()
                      : ""}
                  </small>

                </div>

                <p>

                  <strong>Status:</strong>{" "}

                  {item.status
                    ?.replaceAll("_", " ")}

                </p>

                {item.notes && (
                  <p>

                    <strong>Notes:</strong>{" "}

                    {item.notes}

                  </p>
                )}

                {item.performedByName && (
                  <p>

                    <strong>Performed By:</strong>{" "}

                    {item.performedByName}

                  </p>
                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}