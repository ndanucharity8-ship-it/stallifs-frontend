import { useEffect, useState } from "react";
import api from "../../../shared/api/axios";

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    const res = await api.get("/audit-logs");
    setLogs(res.data);
  };

  return (
    <div>
      <h1>Audit Logs</h1>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Admin</th>
            <th>Action</th>
            <th>Target</th>
            <th>Details</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td>{log.admin?.name}</td>
              <td>{log.action}</td>
              <td>{log.targetType}</td>
              <td>{log.details}</td>
              <td>
                {new Date(log.createdAt)
                  .toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}