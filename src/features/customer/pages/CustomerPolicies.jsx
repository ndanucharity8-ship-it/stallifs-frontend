import { useEffect, useState } from "react";
import api from "../../../shared/api/axios";
import paymentService from "../../../services/paymentService";

export default function CustomerPolicies() {
  const [policies, setPolicies] = useState([]);
  const [phone, setPhone] = useState("");
  const [payingPolicyId, setPayingPolicyId] = useState(null);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    loadPolicies();
  }, []);

  const loadPolicies = async () => {
    try {
      const res = await api.get("/policies/my");
      setPolicies(res.data);
    } catch (error) {
      console.error("Failed to load policies:", error);
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

  const canPay = (status) => {
    return [
      "pending_payment",
      "pending",
      "draft",
    ].includes(status);
  };

  const handlePayment = async (policy) => {
    setPaymentMessage("");
    setPaymentError("");

    if (!phone.trim()) {
      setPaymentError(
        "Please enter the M-Pesa phone number."
      );
      return;
    }

    try {
      setPayingPolicyId(policy._id);

      const response =
        await paymentService.initiatePayment(
          policy._id,
          phone.trim()
        );

      setPaymentMessage(
        response.message ||
          "STK Push sent. Complete payment on your phone."
      );

      setPhone("");
    } catch (error) {
      console.error(
        "Failed to initiate M-Pesa payment:",
        error
      );

      setPaymentError(
        error.response?.data?.message ||
          "Unable to initiate M-Pesa payment."
      );
    } finally {
      setPayingPolicyId(null);
    }
  };

  return (
    <div>
      <h1>My Policies</h1>

      {paymentMessage && (
        <div role="alert">
          {paymentMessage}
        </div>
      )}

      {paymentError && (
        <div role="alert">
          {paymentError}
        </div>
      )}

      <div>
        <label htmlFor="mpesa-phone">
          M-Pesa Phone Number
        </label>

        <input
          id="mpesa-phone"
          type="tel"
          value={phone}
          onChange={(event) =>
            setPhone(event.target.value)
          }
          placeholder="07XXXXXXXX"
        />
      </div>

      <table
        border="1"
        width="100%"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>Policy Number</th>
            <th>Product</th>
            <th>Premium</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Payment</th>
            <th>PDF</th>
          </tr>
        </thead>

        <tbody>
          {policies.length > 0 ? (
            policies.map((policy) => (
              <tr key={policy._id}>
                <td>{policy.policyNumber}</td>

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
                  {canPay(policy.status) ? (
                    <button
                      type="button"
                      onClick={() =>
                        handlePayment(policy)
                      }
                      disabled={
                        payingPolicyId ===
                        policy._id
                      }
                    >
                      {payingPolicyId ===
                      policy._id
                        ? "Sending..."
                        : `Pay KES ${
                            policy.premiumAmount?.toLocaleString() ||
                            "0"
                          }`}
                    </button>
                  ) : (
                    "Not required"
                  )}
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
            ))
          ) : (
            <tr>
              <td colSpan="8">
                No policies found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}