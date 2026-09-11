import {
  useEffect,
  useState,
} from "react";

import {
  User,
  Shield,
  Bell,
  Palette,
  SlidersHorizontal,
  Lock,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from "../../../shared/icons";

import {
  Card,
  Button,
  Input,
  Select,
  Switch,
} from "../../../shared/ui";

import { useAuth } from "../../../hooks";

import api from "../../../shared/api/axios";

import "./Settings.css";

const defaultSettings = {
  appearance: {
    theme: "system",
    accentColor: "blue",
    compactMode: false,
  },

  notifications: {
    email: true,
    push: true,
    sms: false,
    applicationUpdates: true,
    policyUpdates: true,
    paymentUpdates: true,
    claimUpdates: true,
    marketing: false,
  },

  preferences: {
    language: "en",
    timezone: "Africa/Nairobi",
    dateFormat: "DD/MM/YYYY",
    currency: "KES",
  },

  privacy: {
    showPhone: true,
    showEmail: true,
  },
};

const sections = [
  {
    id: "profile",
    label: "Profile",
    description: "Your account information",
    icon: User,
  },
  {
    id: "security",
    label: "Security",
    description: "Password and account security",
    icon: Shield,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Control how we contact you",
    icon: Bell,
  },
  {
    id: "appearance",
    label: "Appearance",
    description: "Customize your experience",
    icon: Palette,
  },
  {
    id: "preferences",
    label: "Preferences",
    description: "Language and regional settings",
    icon: SlidersHorizontal,
  },
  {
    id: "privacy",
    label: "Privacy",
    description: "Control your visibility",
    icon: Lock,
  },
];

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString(
    "en-KE",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
}

export default function Settings() {
  const { user } = useAuth();

  const [activeSection, setActiveSection] =
    useState("profile");

  const [settings, setSettings] =
    useState(defaultSettings);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [passwordForm, setPasswordForm] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);

        const response =
          await api.get("/settings");

        setSettings({
          ...defaultSettings,
          ...response.data.settings,
          appearance: {
            ...defaultSettings.appearance,
            ...response.data.settings?.appearance,
          },
          notifications: {
            ...defaultSettings.notifications,
            ...response.data.settings?.notifications,
          },
          preferences: {
            ...defaultSettings.preferences,
            ...response.data.settings?.preferences,
          },
          privacy: {
            ...defaultSettings.privacy,
            ...response.data.settings?.privacy,
          },
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load your settings."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const clearFeedback = () => {
    setMessage("");
    setError("");
  };

  const updateSection = (
    section,
    key,
    value
  ) => {
    setSettings((previous) => ({
      ...previous,

      [section]: {
        ...previous[section],
        [key]: value,
      },
    }));
  };

  const saveSection = async (
    section,
    endpoint,
    successMessage
  ) => {
    try {
      clearFeedback();

      setSaving(section);

      const response =
        await api.patch(
          `/settings/${endpoint}`,
          settings[section]
        );

      if (response.data.settings) {
        setSettings((previous) => ({
          ...previous,
          [section]:
            response.data.settings[section],
        }));
      }

      setMessage(successMessage);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to save your settings."
      );
    } finally {
      setSaving("");
    }
  };

  const handlePasswordChange = async (
    event
  ) => {
    event.preventDefault();

    clearFeedback();

    if (
      passwordForm.newPassword !==
      passwordForm.confirmPassword
    ) {
      setError(
        "New passwords do not match."
      );

      return;
    }

    if (
      passwordForm.newPassword.length < 6
    ) {
      setError(
        "New password must be at least 6 characters."
      );

      return;
    }

    try {
      setSaving("password");

      await api.patch(
        "/settings/password",
        passwordForm
      );

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setMessage(
        "Password changed successfully."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to change password."
      );
    } finally {
      setSaving("");
    }
  };

  const renderProfile = () => (
    <div className="settings-content">
      <Section
        title="Profile"
        description="View your account information."
      >
        <div className="settings-profile-card">
          <div className="settings-avatar">
            {getInitials(user?.name)}
          </div>

          <div>
            <h3>
              {user?.name || "User"}
            </h3>

            <p>
              {user?.email || "No email available"}
            </p>

            <span className="settings-role">
              {user?.role || "User"}
            </span>
          </div>
        </div>

        <div className="settings-form-grid">
          <Input
            label="Full Name"
            value={user?.name || ""}
            disabled
          />

          <Input
            label="Email Address"
            value={user?.email || ""}
            disabled
          />

          <Input
            label="Phone Number"
            value={user?.phone || ""}
            disabled
          />

          <Input
            label="Account Role"
            value={user?.role || ""}
            disabled
          />
        </div>

        <div className="settings-info-box">
          <strong>Account information</strong>

          <p>
            Your personal account information is
            managed securely by STALLIFS Insurance.
          </p>

          <p>
            Account created:{" "}
            {formatDate(user?.createdAt)}
          </p>
        </div>
      </Section>
    </div>
  );

  const renderSecurity = () => (
    <div className="settings-content">
      <Section
        title="Security"
        description="Protect your STALLIFS account."
      >
        <div className="settings-security-status">
          <div className="settings-status-icon">
            <CheckCircle size={22} />
          </div>

          <div>
            <strong>
              Your account is protected
            </strong>

            <p>
              Keep your password private and
              update it regularly.
            </p>
          </div>
        </div>

        <form
          className="settings-form"
          onSubmit={handlePasswordChange}
        >
          <div className="settings-password-field">
            <Input
              label="Current Password"
              type={
                showCurrentPassword
                  ? "text"
                  : "password"
              }
              value={
                passwordForm.currentPassword
              }
              onChange={(event) =>
                setPasswordForm((previous) => ({
                  ...previous,
                  currentPassword:
                    event.target.value,
                }))
              }
              required
            />

            <button
              type="button"
              className="settings-password-toggle"
              onClick={() =>
                setShowCurrentPassword(
                  (previous) => !previous
                )
              }
              aria-label={
                showCurrentPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showCurrentPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          <div className="settings-password-field">
            <Input
              label="New Password"
              type={
                showNewPassword
                  ? "text"
                  : "password"
              }
              value={
                passwordForm.newPassword
              }
              onChange={(event) =>
                setPasswordForm((previous) => ({
                  ...previous,
                  newPassword:
                    event.target.value,
                }))
              }
              minLength={6}
              required
            />

            <button
              type="button"
              className="settings-password-toggle"
              onClick={() =>
                setShowNewPassword(
                  (previous) => !previous
                )
              }
              aria-label={
                showNewPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showNewPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          <div className="settings-password-field">
            <Input
              label="Confirm New Password"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              value={
                passwordForm.confirmPassword
              }
              onChange={(event) =>
                setPasswordForm((previous) => ({
                  ...previous,
                  confirmPassword:
                    event.target.value,
                }))
              }
              minLength={6}
              required
            />

            <button
              type="button"
              className="settings-password-toggle"
              onClick={() =>
                setShowConfirmPassword(
                  (previous) => !previous
                )
              }
              aria-label={
                showConfirmPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          <div className="settings-actions">
            <Button
              type="submit"
              loading={saving === "password"}
              leftIcon={Save}
            >
              Change Password
            </Button>
          </div>
        </form>
      </Section>
    </div>
  );

  const renderNotifications = () => (
    <div className="settings-content">
      <Section
        title="Notifications"
        description="Choose the updates you want to receive."
      >
        <div className="settings-option-list">
          <SettingsSwitch
            label="Email Notifications"
            description="Receive important updates by email."
            checked={
              settings.notifications.email
            }
            onChange={(value) =>
              updateSection(
                "notifications",
                "email",
                value
              )
            }
          />

          <SettingsSwitch
            label="Push Notifications"
            description="Receive notifications inside the application."
            checked={
              settings.notifications.push
            }
            onChange={(value) =>
              updateSection(
                "notifications",
                "push",
                value
              )
            }
          />

          <SettingsSwitch
            label="SMS Notifications"
            description="Receive important updates by SMS."
            checked={
              settings.notifications.sms
            }
            onChange={(value) =>
              updateSection(
                "notifications",
                "sms",
                value
              )
            }
          />

          <SettingsSwitch
            label="Application Updates"
            description="Updates about your insurance applications."
            checked={
              settings.notifications
                .applicationUpdates
            }
            onChange={(value) =>
              updateSection(
                "notifications",
                "applicationUpdates",
                value
              )
            }
          />

          <SettingsSwitch
            label="Policy Updates"
            description="Important updates about your policies."
            checked={
              settings.notifications
                .policyUpdates
            }
            onChange={(value) =>
              updateSection(
                "notifications",
                "policyUpdates",
                value
              )
            }
          />

          <SettingsSwitch
            label="Payment Updates"
            description="Payment confirmations and reminders."
            checked={
              settings.notifications
                .paymentUpdates
            }
            onChange={(value) =>
              updateSection(
                "notifications",
                "paymentUpdates",
                value
              )
            }
          />

          <SettingsSwitch
            label="Claim Updates"
            description="Updates about your insurance claims."
            checked={
              settings.notifications
                .claimUpdates
            }
            onChange={(value) =>
              updateSection(
                "notifications",
                "claimUpdates",
                value
              )
            }
          />

          <SettingsSwitch
            label="Marketing Communications"
            description="Receive STALLIFS news and offers."
            checked={
              settings.notifications.marketing
            }
            onChange={(value) =>
              updateSection(
                "notifications",
                "marketing",
                value
              )
            }
          />
        </div>

        <SaveButton
          saving={saving === "notifications"}
          onClick={() =>
            saveSection(
              "notifications",
              "notifications",
              "Notification settings saved successfully."
            )
          }
        />
      </Section>
    </div>
  );

  const renderAppearance = () => (
    <div className="settings-content">
      <Section
        title="Appearance"
        description="Customize how STALLIFS looks for you."
      >
        <div className="settings-form-grid">
          <Select
            label="Theme"
            value={
              settings.appearance.theme
            }
            onChange={(event) =>
              updateSection(
                "appearance",
                "theme",
                event.target.value
              )
            }
            options={[
              {
                label: "System Default",
                value: "system",
              },
              {
                label: "Light",
                value: "light",
              },
              {
                label: "Dark",
                value: "dark",
              },
            ]}
          />

          <Select
            label="Accent Color"
            value={
              settings.appearance.accentColor
            }
            onChange={(event) =>
              updateSection(
                "appearance",
                "accentColor",
                event.target.value
              )
            }
            options={[
              {
                label: "Blue",
                value: "blue",
              },
              {
                label: "Green",
                value: "green",
              },
              {
                label: "Purple",
                value: "purple",
              },
              {
                label: "Orange",
                value: "orange",
              },
            ]}
          />
        </div>

        <SettingsSwitch
          label="Compact Mode"
          description="Use a denser layout with less spacing."
          checked={
            settings.appearance.compactMode
          }
          onChange={(value) =>
            updateSection(
              "appearance",
              "compactMode",
              value
            )
          }
        />

        <SaveButton
          saving={saving === "appearance"}
          onClick={() =>
            saveSection(
              "appearance",
              "appearance",
              "Appearance settings saved successfully."
            )
          }
        />
      </Section>
    </div>
  );

  const renderPreferences = () => (
    <div className="settings-content">
      <Section
        title="Preferences"
        description="Configure your regional and display preferences."
      >
        <div className="settings-form-grid">
          <Select
            label="Language"
            value={
              settings.preferences.language
            }
            onChange={(event) =>
              updateSection(
                "preferences",
                "language",
                event.target.value
              )
            }
            options={[
              {
                label: "English",
                value: "en",
              },
            ]}
          />

          <Select
            label="Timezone"
            value={
              settings.preferences.timezone
            }
            onChange={(event) =>
              updateSection(
                "preferences",
                "timezone",
                event.target.value
              )
            }
            options={[
              {
                label: "Africa/Nairobi",
                value: "Africa/Nairobi",
              },
              {
                label: "UTC",
                value: "UTC",
              },
            ]}
          />

          <Select
            label="Date Format"
            value={
              settings.preferences.dateFormat
            }
            onChange={(event) =>
              updateSection(
                "preferences",
                "dateFormat",
                event.target.value
              )
            }
            options={[
              {
                label: "DD/MM/YYYY",
                value: "DD/MM/YYYY",
              },
              {
                label: "MM/DD/YYYY",
                value: "MM/DD/YYYY",
              },
              {
                label: "YYYY-MM-DD",
                value: "YYYY-MM-DD",
              },
            ]}
          />

          <Select
            label="Currency"
            value={
              settings.preferences.currency
            }
            onChange={(event) =>
              updateSection(
                "preferences",
                "currency",
                event.target.value
              )
            }
            options={[
              {
                label: "KES — Kenyan Shilling",
                value: "KES",
              },
              {
                label: "USD — US Dollar",
                value: "USD",
              },
              {
                label: "EUR — Euro",
                value: "EUR",
              },
            ]}
          />
        </div>

        <SaveButton
          saving={saving === "preferences"}
          onClick={() =>
            saveSection(
              "preferences",
              "preferences",
              "Preference settings saved successfully."
            )
          }
        />
      </Section>
    </div>
  );
  function Section({
  title,
  description,
  children,
}) {
  return (
    <section className="settings-section">
      <div className="settings-section-header">
        <h2>{title}</h2>

        {description && (
          <p>{description}</p>
        )}
      </div>

      <div className="settings-section-body">
        {children}
      </div>
    </section>
  );
}

  const renderPrivacy = () => (
    <div className="settings-content">
      <Section
        title="Privacy"
        description="Control how your account information is displayed."
      >
        <div className="settings-option-list">
          <SettingsSwitch
            label="Show Phone Number"
            description="Allow your phone number to be visible where appropriate."
            checked={
              settings.privacy.showPhone
            }
            onChange={(value) =>
              updateSection(
                "privacy",
                "showPhone",
                value
              )
            }
          />
          

          <SettingsSwitch
            label="Show Email Address"
            description="Allow your email address to be visible where appropriate."
            checked={
              settings.privacy.showEmail
            }
            onChange={(value) =>
              updateSection(
                "privacy",
                "showEmail",
                value
              )
            }
          />
        </div>

        <SaveButton
          saving={saving === "privacy"}
          onClick={() =>
            saveSection(
              "privacy",
              "privacy",
              "Privacy settings saved successfully."
            )
          }
        />
      </Section>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case "security":
        return renderSecurity();

      case "notifications":
        return renderNotifications();

      case "appearance":
        return renderAppearance();

      case "preferences":
        return renderPreferences();

      case "privacy":
        return renderPrivacy();

      case "profile":
      default:
        return renderProfile();
    }
  };

  if (loading) {
    return (
      <div className="settings-page">
        <div className="settings-loading">
          Loading your settings...
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div>
          <span className="settings-eyebrow">
            Account Settings
          </span>

          <h1>Settings</h1>

          <p>
            Manage your account, security,
            preferences, and notifications.
          </p>
        </div>
      </div>

      {message && (
        <div className="settings-feedback settings-feedback-success">
          <CheckCircle size={18} />

          <span>{message}</span>

          <button
            type="button"
            onClick={() =>
              setMessage("")
            }
          >
            ×
          </button>
        </div>
      )}

      {error && (
        <div className="settings-feedback settings-feedback-error">
          <AlertCircle size={18} />

          <span>{error}</span>

          <button
            type="button"
            onClick={() =>
              setError("")
            }
          >
            ×
          </button>
        </div>
      )}

      <div className="settings-layout">
        <Card className="settings-sidebar">
          <div className="settings-sidebar-title">
            Settings
          </div>

          <nav>
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <button
                  key={section.id}
                  type="button"
                  className={[
                    "settings-nav-item",
                    activeSection ===
                      section.id
                      ? "active"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() =>
                    setActiveSection(
                      section.id
                    )
                  }
                >
                  <Icon size={19} />

                  <span>
                    <strong>
                      {section.label}
                    </strong>

                    <small>
                      {section.description}
                    </small>
                  </span>
                </button>
              );
            })}
          </nav>
        </Card>

        <main className="settings-main">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
}

function SettingsSwitch({
  label,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="settings-option">
      <div>
        <strong>{label}</strong>

        <p>{description}</p>
      </div>

      <Switch
        checked={checked}
        onChange={(event) =>
          onChange(event.target.checked)
        }
      />
    </div>
  );
}

function SaveButton({
  saving,
  onClick,
}) {
  return (
    <div className="settings-actions">
      <Button
        type="button"
        loading={saving}
        leftIcon={Save}
        onClick={onClick}
      >
        Save Changes
      </Button>
    </div>
  );
}