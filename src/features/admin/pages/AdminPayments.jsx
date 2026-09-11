import { useEffect, useState } from "react";
import api from "../../../shared/api/axios";

export default function AdminPayments() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/payments").then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h1>Payments</h1>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>User</th>
            <th>Policy</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((p) => (
            <tr key={p._id}>
              <td>{p.user?.name}</td>
              <td>{p.policy?.policyNumber}</td>
              <td>{p.amount}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}