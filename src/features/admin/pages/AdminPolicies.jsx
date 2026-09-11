import { useEffect, useState } from "react";
import api from "../../../shared/api/axios";

export default function AdminPolicies() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const res = await api.get("/policies");
      setData(res.data);
    } catch (error) {
      console.error("Failed to fetch policies:", error);
    }
  };

  const downloadPDF = async (policyId) => {
    try {
      const response = await api.get(
        `/pdf/policy/${policyId}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        response.data
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = "policy.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Failed to download policy PDF:",
        error
      );

      alert("Failed to download PDF");
    }
  };

  return (
    <div>
      <h1>Policies</h1>

      <table
        border="1"
        width="100%"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>Policy No</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Premium</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>PDF</th>
          </tr>
        </thead>

        <tbody>
          {data.map((policy) => (
            <tr key={policy._id}>
              <td>{policy.policyNumber}</td>

              <td>
                {policy.user?.name || "-"}
              </td>

              <td>
                {policy.product?.name || "-"}
              </td>

              <td>
                KES{" "}
                {policy.premiumAmount
                  ? policy.premiumAmount.toLocaleString()
                  : "0"}
              </td>

              <td>
                {policy.status || "-"}
              </td>

              <td>
                {policy.startDate
                  ? new Date(
                      policy.startDate
                    ).toLocaleDateString()
                  : "-"}
              </td>

              <td>
                {policy.endDate
                  ? new Date(
                      policy.endDate
                    ).toLocaleDateString()
                  : "-"}
              </td>

              <td>
                <button
                  type="button"
                  onClick={() =>
                    downloadPDF(policy._id)
                  }
                >
                  Download PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}