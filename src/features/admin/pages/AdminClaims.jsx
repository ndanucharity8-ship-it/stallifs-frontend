import { useEffect, useState } from "react";
import api from "../../../shared/api/axios";

export default function AdminClaims() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/claims").then(res => setData(res.data));
  }, []);

  const update = async (id, status) => {
    await api.patch(`/claims/${id}`, { status });
    setData(prev =>
      prev.map(c => c._id === id ? { ...c, status } : c)
    );
  };

  return (
    <div>
      <h1>Claims</h1>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>User</th>
            <th>Policy</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((c) => (
            <tr key={c._id}>
              <td>{c.user?.name}</td>
              <td>{c.policy?.policyNumber}</td>
              <td>{c.reason}</td>
              <td>{c.status}</td>
              <td>
                <button onClick={() => update(c._id, "under_review")}>
                  Review
                </button>
                <button onClick={() => update(c._id, "approved")}>
                  Approve
                </button>
                <button onClick={() => update(c._id, "rejected")}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}