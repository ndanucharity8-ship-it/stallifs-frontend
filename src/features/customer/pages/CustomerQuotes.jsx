import { useEffect, useState } from "react";
import api from "../../../shared/api/axios";

export default function CustomerQuotes() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/quotes/my").then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h1>My Quotes</h1>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((q) => (
            <tr key={q._id}>
              <td>{q.product?.name}</td>
              <td>{q.amount}</td>
              <td>{q.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}