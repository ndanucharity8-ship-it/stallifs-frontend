import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import api from "../../../shared/api/axios";

import Hero from "../components/Hero";
import PersonalInformation from "../components/PersonalInformation";
import ProfessionalInformation from "../components/ProfessionalInformation";
import Documents from "../components/Documents";
import Motivation from "../components/Motivation";
import Timeline from "../components/Timeline";
import DecisionCenter from "../components/DecisionCenter";

import "../styles/adminAgent.css";

export default function AdminAgentApplicationDetails() {
  const { id } = useParams();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminNotes, setAdminNotes] = useState("");
  const [informationRequest, setInformationRequest] =
    useState("");

  const loadApplication = useCallback(async () => {
    try {
      const res = await api.get(
        `/agent-applications/${id}`
      );

      setApplication(res.data);

      setAdminNotes(res.data.adminNotes || "");
      setInformationRequest(
        res.data.informationRequest || ""
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadApplication();
  }, [loadApplication]);

  if (loading) {
    return (
      <div className="agent-loading">
        Loading application...
      </div>
    );
  }

  if (!application) {
    return (
      <div className="agent-loading">
        Application not found.
      </div>
    );
  }

  return (
    <div className="agent-page">
      <Hero application={application} />

      <PersonalInformation
        application={application}
      />

      <ProfessionalInformation
        application={application}
      />

      <Documents application={application} />

      <Motivation application={application} />

      <Timeline application={application} />

      <DecisionCenter
        application={application}
        adminNotes={adminNotes}
        setAdminNotes={setAdminNotes}
        informationRequest={informationRequest}
        setInformationRequest={setInformationRequest}
        reload={loadApplication}
      />
    </div>
  );
}