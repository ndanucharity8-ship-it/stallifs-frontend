export default function RequestInformation({
  application,
  informationRequest,
  setInformationRequest,
  requestInformation,
}) {
  return (
    <div className="request-info-card">

      <h2>Request Additional Information</h2>

      <p className="request-description">
        Ask the customer to provide additional
        documents or clarification before a final
        underwriting decision.
      </p>

      <hr className="section-divider" />

      <h2>Customer Response</h2>

      <div className="request-section">

        <strong>Reply</strong>

        <p>
          {application.customerResponse ||
            "No response submitted yet."}
        </p>

      </div>

      <div className="request-section">

        <strong>Submitted</strong>

        <p>
          {application.responseSubmittedAt
            ? new Date(
                application.responseSubmittedAt
              ).toLocaleString()
            : "-"}
        </p>

      </div>

      <div className="request-section">

        <strong>Uploaded Documents</strong>

        {application.responseDocuments?.length > 0 ? (

          <ul>

            {application.responseDocuments.map(
              (doc, index) => (

                <li key={index}>
                  <a
                    href={doc}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Document {index + 1}
                  </a>
                </li>

              )
            )}

          </ul>

        ) : (

          <p>No documents uploaded.</p>

        )}

      </div>

      <textarea
        value={informationRequest}
        onChange={(e) =>
          setInformationRequest(e.target.value)
        }
        placeholder="Example: Please upload your National ID, proof of income or previous insurance history..."
        rows={5}
        className="request-textarea"
      />

      <button
        className="request-button"
        onClick={requestInformation}
      >
        Request Information
      </button>

    </div>
  );
}