import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../api/authService";
import "./Settings.css";

export function Settings() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("account");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Account Settings State
  const [accountData, setAccountData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: ""
  });

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Notification Settings State
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    courseUpdates: true,
    promotionalEmails: false,
    weeklyDigest: true
  });

  // ⭐ Load user ONCE
  useEffect(() => {
    const u = getCurrentUser();
    setUser(u);
  }, []);

  // ⭐ Update account data WHEN user loads
  useEffect(() => {
    if (user) {
      setAccountData({
        name: user.email.split('@')[0],
        email: user.email,
        phone: "",
        bio: ""
      });
    }
  }, [user]);

  const handleAccountUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage("Account updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to update account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage("New passwords do not match!");
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage("Password must be at least 6 characters!");
      setLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationToggle = (key, value) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    setMessage("Notification preferences updated!");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="fw-bold mb-4">
        <i className="bi bi-gear-fill text-primary me-2"></i>
        Settings
      </h2>

      {message && (
        <div className={`alert ${message.includes("success") ? "alert-success" : "alert-danger"} alert-dismissible fade show`}>
          {message}
          <button type="button" className="btn-close" onClick={() => setMessage("")}></button>
        </div>
      )}

      <div className="row g-4">
        <div className="col-md-3">
          <div className="settings-sidebar card shadow-sm border-0">
            <div className="list-group list-group-flush">
              <button
                className={`list-group-item list-group-item-action ${activeTab === "account" ? "active" : ""}`}
                onClick={() => setActiveTab("account")}
              >
                <i className="bi bi-person-circle me-2"></i>
                Account
              </button>
              <button
                className={`list-group-item list-group-item-action ${activeTab === "security" ? "active" : ""}`}
                onClick={() => setActiveTab("security")}
              >
                <i className="bi bi-shield-lock me-2"></i>
                Security
              </button>
              <button
                className={`list-group-item list-group-item-action ${activeTab === "notifications" ? "active" : ""}`}
                onClick={() => setActiveTab("notifications")}
              >
                <i className="bi bi-bell me-2"></i>
                Notifications
              </button>
              <button
                className={`list-group-item list-group-item-action ${activeTab === "privacy" ? "active" : ""}`}
                onClick={() => setActiveTab("privacy")}
              >
                <i className="bi bi-eye-slash me-2"></i>
                Privacy
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="settings-content card shadow-sm border-0 p-4">

            {/* ACCOUNT TAB */}
            {activeTab === "account" && (
              <div>
                <h4 className="mb-4">Account Settings</h4>
                <form onSubmit={handleAccountUpdate}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={accountData.name}
                      onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={accountData.email}
                      disabled
                    />
                    <small className="text-muted">Email cannot be changed</small>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={accountData.phone}
                      onChange={(e) => setAccountData({ ...accountData, phone: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Bio</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      value={accountData.bio}
                      onChange={(e) => setAccountData({ ...accountData, bio: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Save Changes
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === "security" && (
              <div>
                <h4 className="mb-4">Security Settings</h4>
                <form onSubmit={handlePasswordChange}>
                  <div className="mb-3">
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Changing...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-shield-check me-2"></i>
                        Change Password
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* NOTIFICATION TAB */}
            {activeTab === "notifications" && (
              <div>
                <h4 className="mb-4">Notification Preferences</h4>

                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={notifications.emailNotifications}
                    onChange={(e) =>
                      handleNotificationToggle("emailNotifications", e.target.checked)
                    }
                  />
                  <label className="form-check-label">
                    Email Notifications
                  </label>
                </div>

                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={notifications.courseUpdates}
                    onChange={(e) =>
                      handleNotificationToggle("courseUpdates", e.target.checked)
                    }
                  />
                  <label className="form-check-label">Course Updates</label>
                </div>

                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={notifications.promotionalEmails}
                    onChange={(e) =>
                      handleNotificationToggle("promotionalEmails", e.target.checked)
                    }
                  />
                  <label className="form-check-label">Promotional Emails</label>
                </div>

                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={notifications.weeklyDigest}
                    onChange={(e) =>
                      handleNotificationToggle("weeklyDigest", e.target.checked)
                    }
                  />
                  <label className="form-check-label">Weekly Digest</label>
                </div>
              </div>
            )}

            {/* PRIVACY TAB */}
            {activeTab === "privacy" && (
              <div>
                <h4 className="mb-4">Privacy Settings</h4>
                <p>Profile visibility controls coming soon</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
