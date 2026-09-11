import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../shared/api/axios";

export default function AdminApplications() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get("/applications");
    setData(res.data);
  };

  const updateStatus = async (id, status) => {
    await api.patch(`/applications/${id}`, { status });
    load();
  };

  return (
    <div>
      <h1>Applications</h1>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>User</th>
            <th>Product</th>
            <th>Status</th>
            <th>Risk</th>
            <th>Recommendation</th>
            <th>AI Notes</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((a) => (
            <tr key={a._id}>
              <td>{a.user?.name}</td>
              <td>{a.product?.name}</td>
              <td>{a.status}</td>
              <td>{a.riskLevel}</td>
              <td>{a.recommendation}</td>
               <td>
              {a.underwritingNotes?.map((note, i) => (
             <div key={i}>• {note}</div>
              ))}
              </td>
              <td>
                <button onClick={() => updateStatus(a._id, "approved")}>
                  Approve
                </button>
                <button onClick={() => updateStatus(a._id, "rejected")}>
                  Reject
                </button>
                <button onClick={() => navigate(`/admin/underwriting/${a._id}`)}>
                 View Assessment
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}