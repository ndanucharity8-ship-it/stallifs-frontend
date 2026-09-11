import {
  FiEye,
  FiDownload,
} from "react-icons/fi";

export default function Documents({
  application,
}) {
  const documents = [
    {
      title: "Curriculum Vitae",
      file: application.cv,
    },
    {
      title: "National ID",
      file: application.nationalIdDocument,
    },
    {
      title: "KRA Certificate",
      file: application.kraCertificate,
    },
    {
      title: "IRA Certificate",
      file: application.iraCertificate,
    },
    {
      title: "Certificate of Good Conduct",
      file: application.goodConduct,
    },
    {
      title: "Other Supporting Document",
      file: application.otherDocument,
    },
  ];

  return (
    <div className="agent-section-card">

      <h2>Uploaded Documents</h2>

      <hr />

      <div className="documents-grid">

        {documents.map((doc) => (

          <div
            className="document-card"
            key={doc.title}
          >

            <div>

              <h4>{doc.title}</h4>

              <small>
                {doc.file
                  ? "Uploaded"
                  : "Not Uploaded"}
              </small>

            </div>

            {doc.file ? (

              <div className="document-actions">

                <a
                  href={doc.file}
                  target="_blank"
                  rel="noreferrer"
                  className="view-document-btn"
                >
                  <FiEye />

                  View
                </a>

                <a
                  href={doc.file}
                  download
                  className="download-document-btn"
                >
                  <FiDownload />

                  Download
                </a>

              </div>

            ) : (

              <span className="missing-document">
                —
              </span>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}