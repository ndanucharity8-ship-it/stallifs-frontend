export default function ApplicationDetails({
  application,
}) {
  return (
    <div className="application-details-card">

      <h2>Application Details</h2>

      <hr className="section-divider" />

      <div className="application-field">

        <strong>Product</strong>

        <p>{application.product?.name}</p>

      </div>

      <div className="application-field">

        <strong>Additional Information</strong>

        <p>
          {application.additionalInfo ||
            "None provided"}
        </p>

      </div>

    </div>
  );
}