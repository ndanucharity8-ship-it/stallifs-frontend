import { useEffect, useState } from "react";
import api from "../../../shared/api/axios";

export default function CustomerClaims() {
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);

  const [policy, setPolicy] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    api.get("/policies/my").then(res => setPolicies(res.data));
    loadClaims();
  }, []);

  const loadClaims = async () => {
    const res = await api.get("/claims/my");
    setClaims(res.data);
  };

  const submit = async () => {
    const form = new FormData();
    form.append("policy", policy);
    form.append("reason", reason);
    form.append("description", description);

    for (let f of files) form.append("documents", f);

    await api.post("/claims", form);
    loadClaims();
  };

  return (
    <div>
      <h1>Claims</h1>

      {/* FORM */}
      <select onChange={(e) => setPolicy(e.target.value)}>
        <option>Select Policy</option>
        {policies.map(p => (
          <option key={p._id} value={p._id}>
            {p.policyNumber}
          </option>
        ))}
      </select>

      <input placeholder="Reason" onChange={(e) => setReason(e.target.value)} />
      <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
      <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />

      <button onClick={submit}>Submit Claim</button>

      {/* TABLE */}
      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Policy</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Files</th>
          </tr>
        </thead>

        <tbody>
          {claims.map(c => (
            <tr key={c._id}>
              <td>{c.policy?.policyNumber}</td>
              <td>{c.reason}</td>
              <td>{c.status}</td>
              <td>
                {c.documents?.map((d,i)=>(
                  <a
  key={i}
  href={d}
  target="_blank"
  rel="noopener noreferrer"
>
                    File {i+1}
                  </a>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}