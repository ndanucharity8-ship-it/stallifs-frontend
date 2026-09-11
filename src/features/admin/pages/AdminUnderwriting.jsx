import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";

import api from "../../../shared/api/axios";

import Header from "../components/Header";
import ExecutiveSummary from "../components/ExecutiveSummary";
import AIDecision from "../components/AIDecision";
import FraudAnalysis from "../components/FraudAnalysis";
import CustomerProfile from "../components/CustomerProfile";
import CustomerHistory from "../components/CustomerHistory";
import AIUnderwritingAnalysis from "../components/AIUnderwritingAnalysis";
import ApplicationDetails from "../components/ApplicationDetails";
import RequestInformation from "../components/RequestInformation";
import UnderwritingTimeline from "../components/UnderwritingTimeline";
import DecisionCenter from "../components/DecisionCenter";

export default function AdminUnderwriting() {
  const { id } = useParams();

  const [application, setApplication] = useState(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [informationRequest, setInformationRequest] =
    useState("");

  const [adminNotes] = useState("");

  const [loadingAction, setLoadingAction] =
    useState(false);

  const loadApplication = useCallback(async () => {
    try {
      const res = await api.get(
        `/applications/${id}`
      );

      setApplication(res.data);
    } catch (err) {
      console.error(
        "Failed to load underwriting application:",
        err
      );
    }
  }, [id]);

  useEffect(() => {
    loadApplication();
  }, [loadApplication]);

  const updateStatus = async (status) => {
    try {
      setLoadingAction(true);

      await api.patch(
        `/applications/${application._id}`,
        {
          status,
          notes: adminNotes,
        }
      );

      setMessage(
        `Application ${status} successfully.`
      );

      setMessageType("success");

      await loadApplication();
    } catch (err) {
      console.error(err);

      setMessage(
        err.response?.data?.message ||
          "Unable to update application."
      );

      setMessageType("error");
    } finally {
      setLoadingAction(false);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const requestInformation = async () => {
    if (!informationRequest.trim()) {
      setMessage(
        "Please enter the requested information."
      );

      setMessageType("error");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      return;
    }

    try {
      setLoadingAction(true);

      await api.patch(
        `/applications/${application._id}`,
        {
          status: "information_requested",
          informationRequest,
          notes: adminNotes,
        }
      );

      setMessage(
        "Information request sent successfully."
      );

      setMessageType("success");

      setInformationRequest("");

      await loadApplication();
    } catch (err) {
      console.error(err);

      setMessage(
        err.response?.data?.message ||
          "Unable to request information."
      );

      setMessageType("error");
    } finally {
      setLoadingAction(false);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  if (!application) {
    return (
      <div className="loading-screen">
        Loading underwriting assessment...
      </div>
    );
  }

  return (
    <div className="underwriting-page">
      <Header
        application={application}
        message={message}
        messageType={messageType}
      />

      <ExecutiveSummary
        application={application}
      />

      <AIDecision
        application={application}
      />

      <FraudAnalysis
        application={application}
      />

      <CustomerProfile
        application={application}
      />

      <CustomerHistory
        application={application}
      />

      <AIUnderwritingAnalysis
        application={application}
      />

      <ApplicationDetails
        application={application}
      />

      <RequestInformation
        application={application}
        informationRequest={informationRequest}
        setInformationRequest={
          setInformationRequest
        }
        requestInformation={requestInformation}
      />

      <UnderwritingTimeline
        application={application}
      />

      <DecisionCenter
        application={application}
        loadingAction={loadingAction}
        updateStatus={updateStatus}
        loadApplication={loadApplication}
        setMessage={setMessage}
        setMessageType={setMessageType}
      />
    </div>
  );
}