export default function CustomerProfile({
  application,
}) {
  return (
    <div className="profile-card">

      <h2>Customer Profile</h2>

      <hr />

      <p>
        <strong>Name:</strong>{" "}
        {application.fullName}
      </p>

      <p>
        <strong>Phone:</strong>{" "}
        {application.phone}
      </p>

      <p>
        <strong>National ID:</strong>{" "}
        {application.nationalId}
      </p>

      <p>
        <strong>Product:</strong>{" "}
        {application.product?.name}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {application.status}
      </p>

    </div>
  );
}