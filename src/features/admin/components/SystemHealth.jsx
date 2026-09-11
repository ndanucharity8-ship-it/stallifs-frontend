import {
  Queue,
  StatusBadge,
} from "../../../shared/components";

export default function SystemHealth({
  health = {},
}) {
  const services = [
    {
      name: "API Server",
      status: health.api || "Online",
    },
    {
      name: "MongoDB",
      status: health.database || "Online",
    },
    {
      name: "Socket.IO",
      status: health.socket || "Online",
    },
    {
      name: "M-Pesa",
      status: health.mpesa || "Online",
    },
    {
      name: "Email Service",
      status: health.email || "Online",
    },
    {
      name: "SMS Service",
      status: health.sms || "Online",
    },
    {
      name: "Cloud Storage",
      status: health.storage || "Online",
    },
    {
      name: "Authentication",
      status: health.auth || "Online",
    },
  ];

  return (
    <Queue
      title="System Health"
      description="Live system service monitoring."
      items={services}
      emptyMessage="No system health information available."
      renderItem={(service) => (
        <div className="health-card">
          <div className="health-left">
            <span>{service.name}</span>
          </div>

          <StatusBadge
            status={service.status}
          >
            {service.status}
          </StatusBadge>
        </div>
      )}
    />
  );
}