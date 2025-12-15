import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Fade, Row, Col } from "react-bootstrap";

export default function JobSettingsPage() {
  const [open] = useState(true);

  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState({
    applicationUpdates: false,
    newJobAlerts: false,
    resumeViews: false,
  });
  const [privacy, setPrivacy] = useState({
    allowEmployers: false,
    showActivity: false,
    twoFactor: false,
  });
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("GMT");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedNotifications = localStorage.getItem("notifications");
    const savedPrivacy = localStorage.getItem("privacy");
    const savedLanguage = localStorage.getItem("language");
    const savedTimezone = localStorage.getItem("timezone");

    if (savedTheme) setTheme(savedTheme);
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
    if (savedPrivacy) setPrivacy(JSON.parse(savedPrivacy));
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedTimezone) setTimezone(savedTimezone);
  }, []);

  const handleSave = () => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("notifications", JSON.stringify(notifications));
    localStorage.setItem("privacy", JSON.stringify(privacy));
    localStorage.setItem("language", language);
    localStorage.setItem("timezone", timezone);
    alert("Settings Saved!");
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  const bgColor = theme === "dark" ? "#001f2e" : "#dff6ff";
  const cardColor = theme === "dark" ? "#013548" : "#ffffff";
  const textColor = theme === "dark" ? "white" : "#002b3a";

  return (
    <div className="page-container">
    <div style={{ minHeight: "100vh", background: bgColor, padding: "40px" }}>
      <Container style={{ maxWidth: "750px" }}>
        <Fade in={open}>
          <Card
            style={{
              background: cardColor,
              color: textColor,
              borderRadius: "20px",
              padding: "30px",
              boxShadow: "0 0 25px rgba(0,255,255,0.2)",
            }}
          >
            <h2 className="text-center mb-4" style={{ color: "cyan" }}>Settings</h2>

            {/* Appearance */}
            <h4 style={{ color: "cyan" }}>Appearance</h4>
            <Form.Group className="mb-4">
              <Form.Check
                type="switch"
                id="theme"
                label={theme === "dark" ? "Dark Mode" : "Light Mode"}
                checked={theme === "dark"}
                onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              />
            </Form.Group>

            {/* Notifications */}
            <h4 style={{ color: "cyan" }}>Notifications</h4>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Job Application Updates"
                checked={notifications.applicationUpdates}
                onChange={() =>
                  setNotifications({ ...notifications, applicationUpdates: !notifications.applicationUpdates })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="New Job Alerts"
                checked={notifications.newJobAlerts}
                onChange={() =>
                  setNotifications({ ...notifications, newJobAlerts: !notifications.newJobAlerts })
                }
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Check
                type="checkbox"
                label="Resume Views & Profile Insights"
                checked={notifications.resumeViews}
                onChange={() =>
                  setNotifications({ ...notifications, resumeViews: !notifications.resumeViews })
                }
              />
            </Form.Group>

            {/* Account */}
            <h4 style={{ color: "cyan" }}>Account Preferences</h4>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Language</Form.Label>
                  <Form.Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>Hindi</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Time Zone</Form.Label>
                  <Form.Select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                    <option>GMT</option>
                    <option>UTC</option>
                    <option>PST</option>
                    <option>EST</option>
                    <option>IST</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* Privacy */}
            <h4 style={{ color: "cyan" }}>Privacy</h4>
            <Form.Group className="mb-4">
              <Form.Check
                type="checkbox"
                label="Allow Employers to View Profile"
                checked={privacy.allowEmployers}
                onChange={() => setPrivacy({ ...privacy, allowEmployers: !privacy.allowEmployers })}
              />

              <Form.Check
                type="checkbox"
                label="Show Activity Status"
                checked={privacy.showActivity}
                onChange={() => setPrivacy({ ...privacy, showActivity: !privacy.showActivity })}
              />

              <Form.Check
                type="checkbox"
                label="Enable 2FA"
                checked={privacy.twoFactor}
                onChange={() => setPrivacy({ ...privacy, twoFactor: !privacy.twoFactor })}
              />
            </Form.Group>

            {/* Buttons */}
            <Button
              variant="info"
              style={{ width: "100%", fontWeight: "bold", marginBottom: "15px" }}
              onClick={handleSave}
            >
              Save Settings
            </Button>

            <Button
              variant="danger"
              style={{ width: "100%", fontWeight: "bold" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Card>
        </Fade>
      </Container>
    </div>
    </div>
  );
}