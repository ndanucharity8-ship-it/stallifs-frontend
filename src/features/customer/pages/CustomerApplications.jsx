import { useEffect, useState } from "react";
import api from "../../../shared/api/axios";

export default function CustomerApplications() {
  const [data, setData] = useState([]);
  const [customerResponse, setCustomerResponse] = useState("");
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const res = await api.get("/applications/my");
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const submitResponse = async (applicationId) => {
    try {
      const formData = new FormData();

      formData.append("customerResponse", customerResponse);

      documents.forEach((file) => {
        formData.append("documents", file);
      });

      await api.patch(
        `/applications/${applicationId}/respond`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Response submitted successfully.");

      setCustomerResponse("");
      setDocuments([]);

      loadApplications();
    } catch (err) {
      console.error(err);
      alert("Unable to submit response.");
    }
  };

  return (
    <div>
      <h1>My Applications</h1>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Product</th>
            <th>Full Name</th>
            <th>Status</th>
            <th>Information Request</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {data.map((a) => (
            <tr key={a._id}>
              <td>{a.product?.name}</td>

              <td>{a.fullName}</td>

              <td>{a.status}</td>

              <td>
                {a.status === "information_requested" ? (
                  <>
                    <div
                      style={{
                        background: "#fff3cd",
                        border: "1px solid #ffeeba",
                        padding: 15,
                        borderRadius: 8,
                        marginBottom: 15,
                      }}
                    >
                      <strong
                        style={{
                          color: "#856404",
                        }}
                      >
                        Additional Information Required
                      </strong>

                      <p
                        style={{
                          marginTop: 10,
                        }}
                      >
                        {a.informationRequest}
                      </p>
                    </div>

                    <textarea
                      placeholder="Reply to the underwriter..."
                      value={customerResponse}
                      onChange={(e) =>
                        setCustomerResponse(e.target.value)
                      }
                      rows={4}
                      style={{
                        width: "100%",
                        padding: 12,
                        borderRadius: 8,
                        border: "1px solid #ccc",
                        marginBottom: 15,
                      }}
                    />

                    <input
                      type="file"
                      multiple
                      onChange={(e) =>
                        setDocuments([...e.target.files])
                      }
                      style={{
                        marginBottom: 15,
                      }}
                    />

                    <button
                      onClick={() => submitResponse(a._id)}
                      style={{
                        background: "#1976d2",
                        color: "#fff",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                    >
                      Submit Response
                    </button>
                  </>
                ) : (
                  "-"
                )}
              </td>

              <td>{new Date(a.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}