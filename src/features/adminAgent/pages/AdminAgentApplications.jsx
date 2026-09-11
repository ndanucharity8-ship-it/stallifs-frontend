import { useEffect, useMemo, useState } from "react";
import api from "../../../shared/api/axios";
import { ErrorState} from "../../../shared/ui";
import LoadingState from "../../../shared/components/LoadingState";

import Header from "../components/Header";
import SummaryCards from "../components/SummaryCards";
import Filters from "../components/Filters";
import ApplicationsTable from "../components/ApplicationsTable";

import "../styles/adminAgent.css";

export default function AdminAgentApplications() {
  const [loading, setLoading] = useState(true);

  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [countyFilter, setCountyFilter] = useState("all");

  async function loadApplications() {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/agent-applications");

      setApplications(res.data || []);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Unable to load agent applications."
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredApplications = useMemo(() => {
    let data = [...applications];

    if (search) {
      data = data.filter((item) =>
        (
          item.fullName +
          item.email +
          item.phone
        )
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      data = data.filter(
        (item) => item.status === statusFilter
      );
    }

    if (countyFilter !== "all") {
      data = data.filter(
        (item) => item.county === countyFilter
      );
    }

    return data;
  }, [applications, search, statusFilter, countyFilter]);

  useEffect(() => {
    loadApplications();
  }, []);

  if (loading) {
    return (
      <LoadingState
        message="Loading agent applications..."
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to Load Agent Applications"
        description={error}
        action={loadApplications}
        actionLabel="Try Again"
      />
    );
  }

  return (
    <div className="agent-page">

      <Header
        total={applications.length}
        refresh={loadApplications}
      />

      <SummaryCards
        applications={applications}
      />

      <Filters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        countyFilter={countyFilter}
        setCountyFilter={setCountyFilter}
        applications={applications}
      />

      <ApplicationsTable
        applications={filteredApplications}
      />

    </div>
  );
}
