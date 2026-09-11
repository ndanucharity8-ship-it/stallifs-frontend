import { useEffect, useState } from "react";
import api from "../../../shared/api/axios";

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      const res = await api.get("/quotes");
      setQuotes(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/quotes/${id}`, { status });
      loadQuotes();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <h1>Quotes Management</h1>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>User</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {quotes.length === 0 ? (
            <tr>
              <td colSpan="6">No quotes found</td>
            </tr>
          ) : (
            quotes.map((q) => (
              <tr key={q._id}>
                <td>{q.user?.name}</td>
                <td>{q.product?.name}</td>
                <td>{q.amount}</td>
                <td>{q.status}</td>
                <td>{new Date(q.createdAt).toLocaleString()}</td>

                <td>
                  <button onClick={() => updateStatus(q._id, "approved")}>
                    Approve
                  </button>

                  <button onClick={() => updateStatus(q._id, "rejected")}>
                    Reject
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}