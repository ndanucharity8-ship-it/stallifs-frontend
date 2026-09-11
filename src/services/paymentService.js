import api from "../shared/api/axios";

const paymentService = {
  initiatePayment: async (policyId, phone) => {
    const response = await api.post("/mpesa/stkpush", {
      policyId,
      phone,
    });

    return response.data;
  },
};

export default paymentService;