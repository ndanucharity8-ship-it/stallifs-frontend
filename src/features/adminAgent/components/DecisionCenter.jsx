import { useState } from "react";
import api from "../../../shared/api/axios";

const formatDateTimeLocal = (date) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const timezoneOffset =
    parsedDate.getTimezoneOffset() * 60000;

  return new Date(
    parsedDate.getTime() - timezoneOffset
  )
    .toISOString()
    .slice(0, 16);
};

export default function DecisionCenter({
  application,
  adminNotes,
  setAdminNotes,
  informationRequest,
  setInformationRequest,
  reload,
}) {
  const [loading, setLoading] = useState(false);

  const [creatingAccount, setCreatingAccount] =
    useState(false);

  const [credentials, setCredentials] =
    useState(null);

  const [interview, setInterview] = useState({
    scheduledAt: formatDateTimeLocal(
      application.interview?.scheduledAt
    ),

    type:
      application.interview?.type ||
      "physical",

    location:
      application.interview?.location ||
      "",

    meetingLink:
      application.interview?.meetingLink ||
      "",

    notes:
      application.interview?.notes ||
      "",
  });

  const [interviewFeedback, setInterviewFeedback] =
    useState(
      application.interview?.feedback || ""
    );

  const updateStatus = async (
    status,
    extra = {}
  ) => {
    try {
      setLoading(true);

      await api.patch(
        `/agent-applications/${application._id}`,
        {
          status,
          adminNotes,
          ...extra,
        }
      );

      await reload();

      alert(
        "Application updated successfully."
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to update application."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateInterviewField = (
    field,
    value
  ) => {
    setInterview((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const requestInformation = () => {
    if (!informationRequest.trim()) {
      alert(
        "Please explain what information is required."
      );

      return;
    }

    updateStatus(
      "information_requested",
      {
        informationRequest,
      }
    );
  };

  const scheduleInterview = () => {
    if (!interview.scheduledAt) {
      alert(
        "Please select an interview date and time."
      );

      return;
    }

    if (
      interview.type === "physical" &&
      !interview.location.trim()
    ) {
      alert(
        "Please enter the interview location."
      );

      return;
    }

    if (
      interview.type === "online" &&
      !interview.meetingLink.trim()
    ) {
      alert(
        "Please enter the meeting link."
      );

      return;
    }

    updateStatus(
      "interview_scheduled",
      {
        interview,
      }
    );
  };

  const completeInterview = () => {
    if (!interviewFeedback.trim()) {
      alert(
        "Please enter interview feedback."
      );

      return;
    }

    updateStatus(
      "interview_completed",
      {
        interviewFeedback,
      }
    );
  };

  const submitInterviewResult = (
    result
  ) => {
    if (!interviewFeedback.trim()) {
      alert(
        "Please enter interview feedback."
      );

      return;
    }

    const confirmed = window.confirm(
      `Mark this applicant as ${result}?`
    );

    if (!confirmed) {
      return;
    }

    updateStatus(
      result,
      {
        interviewFeedback,
      }
    );
  };

  const createAgentAccount = async () => {
    const confirmed = window.confirm(
      "Create an Agent account for this applicant?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setCreatingAccount(true);

      const { data } = await api.post(
        `/agent-applications/${application._id}/create-account`
      );

      setCredentials(data);

      await reload();

      alert(
        "Agent account created successfully."
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to create agent account."
      );
    } finally {
      setCreatingAccount(false);
    }
  };

  const copyCredentials = async () => {
    if (!credentials) {
      return;
    }

    const text = `Agent Code: ${credentials.agentCode}
Email: ${credentials.email}
Temporary Password: ${credentials.temporaryPassword}`;

    try {
      await navigator.clipboard.writeText(
        text
      );

      alert("Credentials copied.");
    } catch {
      alert(
        "Unable to copy credentials."
      );
    }
  };

  return (
    <div className="agent-section-card">
      <h2>Decision Center</h2>

      <hr />

      {/* ADMIN REVIEW */}

      <div className="decision-grid">
        <div className="decision-field">
          <label>
            Admin Notes
          </label>

          <textarea
            rows={6}
            value={adminNotes}
            onChange={(event) =>
              setAdminNotes(
                event.target.value
              )
            }
            placeholder="Internal notes visible only to administrators..."
          />
        </div>

        <div className="decision-field">
          <label>
            Request Additional Information
          </label>

          <textarea
            rows={5}
            value={informationRequest}
            onChange={(event) =>
              setInformationRequest(
                event.target.value
              )
            }
            placeholder="Explain what documents or information the applicant must provide..."
          />

          <button
            type="button"
            className="request-btn"
            disabled={loading}
            onClick={requestInformation}
          >
            Request Information
          </button>
        </div>
      </div>

      {/* APPLICATION REVIEW ACTIONS */}

      <div className="decision-actions">
        <button
          type="button"
          className="review-btn"
          disabled={loading}
          onClick={() =>
            updateStatus(
              "under_review"
            )
          }
        >
          Mark Under Review
        </button>

        <button
          type="button"
          className="approve-btn"
          disabled={loading}
          onClick={() =>
            updateStatus(
              "shortlisted"
            )
          }
        >
          Shortlist Applicant
        </button>

        <button
          type="button"
          className="reject-btn"
          disabled={loading}
          onClick={() => {
            const confirmed =
              window.confirm(
                "Reject this application?"
              );

            if (confirmed) {
              updateStatus(
                "rejected"
              );
            }
          }}
        >
          Reject Application
        </button>
      </div>

      {/* INTERVIEW SCHEDULING */}

      {application.status ===
        "shortlisted" && (
        <div className="agent-next-step">
          <h3>
            Schedule Interview
          </h3>

          <div className="decision-grid">
            <div className="decision-field">
              <label>
                Interview Date & Time
              </label>

              <input
                type="datetime-local"
                value={
                  interview.scheduledAt
                }
                onChange={(event) =>
                  updateInterviewField(
                    "scheduledAt",
                    event.target.value
                  )
                }
              />
            </div>

            <div className="decision-field">
              <label>
                Interview Type
              </label>

              <select
                value={interview.type}
                onChange={(event) =>
                  updateInterviewField(
                    "type",
                    event.target.value
                  )
                }
              >
                <option value="physical">
                  Physical
                </option>

                <option value="online">
                  Online
                </option>

                <option value="phone">
                  Phone
                </option>
              </select>
            </div>

            {interview.type ===
              "physical" && (
              <div className="decision-field">
                <label>
                  Location
                </label>

                <input
                  type="text"
                  value={
                    interview.location
                  }
                  onChange={(event) =>
                    updateInterviewField(
                      "location",
                      event.target.value
                    )
                  }
                  placeholder="Interview location"
                />
              </div>
            )}

            {interview.type ===
              "online" && (
              <div className="decision-field">
                <label>
                  Meeting Link
                </label>

                <input
                  type="url"
                  value={
                    interview.meetingLink
                  }
                  onChange={(event) =>
                    updateInterviewField(
                      "meetingLink",
                      event.target.value
                    )
                  }
                  placeholder="https://..."
                />
              </div>
            )}

            <div className="decision-field">
              <label>
                Interview Notes
              </label>

              <textarea
                rows={4}
                value={
                  interview.notes
                }
                onChange={(event) =>
                  updateInterviewField(
                    "notes",
                    event.target.value
                  )
                }
                placeholder="Additional interview instructions or notes..."
              />
            </div>
          </div>

          <button
            type="button"
            className="approve-btn"
            disabled={loading}
            onClick={
              scheduleInterview
            }
          >
            Schedule Interview
          </button>
        </div>
      )}

      {/* INTERVIEW COMPLETION */}

      {application.status ===
        "interview_scheduled" && (
        <div className="agent-next-step">
          <h3>
            Complete Interview
          </h3>

          <div className="decision-field">
            <label>
              Interview Feedback
            </label>

            <textarea
              rows={6}
              value={
                interviewFeedback
              }
              onChange={(event) =>
                setInterviewFeedback(
                  event.target.value
                )
              }
              placeholder="Enter notes and feedback from the interview..."
            />
          </div>

          <button
            type="button"
            className="review-btn"
            disabled={loading}
            onClick={
              completeInterview
            }
          >
            Mark Interview Completed
          </button>
        </div>
      )}

      {/* INTERVIEW RESULT */}

      {application.status ===
        "interview_completed" && (
        <div className="agent-next-step">
          <h3>
            Interview Result
          </h3>

          <div className="decision-field">
            <label>
              Final Interview Feedback
            </label>

            <textarea
              rows={6}
              value={
                interviewFeedback
              }
              onChange={(event) =>
                setInterviewFeedback(
                  event.target.value
                )
              }
              placeholder="Enter final interview feedback..."
            />
          </div>

          <div className="decision-actions">
            <button
              type="button"
              className="approve-btn"
              disabled={loading}
              onClick={() =>
                submitInterviewResult(
                  "passed"
                )
              }
            >
              Pass Applicant
            </button>

            <button
              type="button"
              className="reject-btn"
              disabled={loading}
              onClick={() =>
                submitInterviewResult(
                  "failed"
                )
              }
            >
              Fail Applicant
            </button>
          </div>
        </div>
      )}

      {/* CREATE AGENT ACCOUNT */}

      {application.status ===
        "passed" && (
        <div className="agent-next-step">
          <h3>
            Applicant Passed
          </h3>

          <p>
            The applicant passed the
            interview and is now eligible
            for an Agent account.
          </p>

          {!application.accountCreated ? (
            <button
              type="button"
              className="create-agent-btn"
              disabled={
                creatingAccount
              }
              onClick={
                createAgentAccount
              }
            >
              {creatingAccount
                ? "Creating Account..."
                : "Create Agent Account"}
            </button>
          ) : (
            <button
              type="button"
              className="create-agent-btn"
              disabled
            >
              ✓ Agent Account Created
            </button>
          )}

          {credentials && (
            <div className="agent-account-result">
              <h4>
                Agent Account Created
              </h4>

              <p>
                <strong>
                  Agent Code:
                </strong>{" "}
                {
                  credentials.agentCode
                }
              </p>

              <p>
                <strong>
                  Email:
                </strong>{" "}
                {
                  credentials.email
                }
              </p>

              <p>
                <strong>
                  Temporary Password:
                </strong>{" "}
                {
                  credentials.temporaryPassword
                }
              </p>

              <button
                type="button"
                className="copy-btn"
                onClick={
                  copyCredentials
                }
              >
                Copy Credentials
              </button>
            </div>
          )}
        </div>
      )}

      {/* FINAL STATUS */}

      {application.status ===
        "failed" && (
        <div className="agent-next-step">
          <h3>
            Applicant Failed
          </h3>

          <p>
            The applicant did not pass
            the interview process.
          </p>
        </div>
      )}

      {application.status ===
        "rejected" && (
        <div className="agent-next-step">
          <h3>
            Application Rejected
          </h3>

          <p>
            This application has been
            rejected.
          </p>
        </div>
      )}

      {application.status ===
        "converted" && (
        <div className="agent-next-step">
          <h3>
            Agent Account Created
          </h3>

          <p>
            This applicant has been
            successfully converted into
            an Agent.
          </p>
        </div>
      )}
    </div>
  );
}