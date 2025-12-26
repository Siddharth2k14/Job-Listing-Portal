import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const THEME_KEY = "recruiter_theme";
const SETTINGS_KEY = "recruiter_settings";

export default function SettingsR() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState("dark");
  const [settings, setSettings] = useState({
    compactMode: false,
    reduceMotion: false,
    emailNotify: true,
    appAlerts: true,
    interviewReminders: true,
    profileVisible: true,
    showContact: true,
    autoPublishJobs: false,
    autoSaveDrafts: true,
    rememberLogin: true,
    language: "English",
    defaultPage: "Dashboard"
  });

  // 🔁 Load settings
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
    const savedSettings = localStorage.getItem(SETTINGS_KEY);

    setTheme(savedTheme);
    applyTheme(savedTheme);

    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // 🔄 Persist settings
  const updateSetting = (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  };

  const applyTheme = (mode) => {
    document.body.style.background =
      mode === "dark" ? "#012c40" : "#f4f6f8";
    document.body.style.color =
      mode === "dark" ? "white" : "#003847";
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    applyTheme(newTheme);
  };

  // 🔐 Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container fluid style={{ width: "100vh" }}>
        <h2 className="mb-4" style={{ color: "cyan" }}>
          Settings
        </h2>

        <Row>

          {/* 🎨 Appearance */}
          <Col md={6}>
            <Card className="mb-4" style={{ background: "#004b66", color: "white" }}>
              <Card.Body>
                <Card.Title style={{ color: "cyan" }}>Appearance</Card.Title>

                <Form.Check
                  type="switch"
                  label={`Theme: ${theme === "dark" ? "Dark" : "Light"}`}
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                />

                <Form.Check
                  type="switch"
                  label="Compact Mode"
                  checked={settings.compactMode}
                  onChange={e => updateSetting("compactMode", e.target.checked)}
                />

                <Form.Check
                  type="switch"
                  label="Reduce Animations"
                  checked={settings.reduceMotion}
                  onChange={e => updateSetting("reduceMotion", e.target.checked)}
                />
              </Card.Body>
            </Card>
          </Col>

          {/* 👤 Account */}
          <Col md={6}>
            <Card className="mb-4" style={{ background: "#003847", color: "white" }}>
              <Card.Body>
                <Card.Title style={{ color: "cyan" }}>Account</Card.Title>

                <Button
                  variant="outline-info"
                  className="w-100 mb-2"
                  onClick={() => navigate("/RecruiterDashboard/ProfileR")}
                >
                  View / Edit Profile
                </Button>

                <Form.Select
                  className="mb-2"
                  value={settings.defaultPage}
                  onChange={e => updateSetting("defaultPage", e.target.value)}
                >
                  <option>Dashboard</option>
                  <option>Job Listings</option>
                  <option>Applications</option>
                </Form.Select>

                <Form.Select
                  value={settings.language}
                  onChange={e => updateSetting("language", e.target.value)}
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Spanish</option>
                </Form.Select>
              </Card.Body>
            </Card>
          </Col>

          {/* 🔔 Notifications */}
          <Col md={6}>
            <Card className="mb-4" style={{ background: "#004f66", color: "white" }}>
              <Card.Body>
                <Card.Title style={{ color: "cyan" }}>Notifications</Card.Title>

                <Form.Check
                  type="switch"
                  label="Email Notifications"
                  checked={settings.emailNotify}
                  onChange={e => updateSetting("emailNotify", e.target.checked)}
                />

                <Form.Check
                  type="switch"
                  label="Application Alerts"
                  checked={settings.appAlerts}
                  onChange={e => updateSetting("appAlerts", e.target.checked)}
                />

                <Form.Check
                  type="switch"
                  label="Interview Reminders"
                  checked={settings.interviewReminders}
                  onChange={e => updateSetting("interviewReminders", e.target.checked)}
                />
              </Card.Body>
            </Card>
          </Col>

          {/* 🔒 Privacy */}
          <Col md={6}>
            <Card className="mb-4" style={{ background: "#003847", color: "white" }}>
              <Card.Body>
                <Card.Title style={{ color: "cyan" }}>Privacy</Card.Title>

                <Form.Check
                  type="switch"
                  label="Profile Visible"
                  checked={settings.profileVisible}
                  onChange={e => updateSetting("profileVisible", e.target.checked)}
                />

                <Form.Check
                  type="switch"
                  label="Show Contact Information"
                  checked={settings.showContact}
                  onChange={e => updateSetting("showContact", e.target.checked)}
                />
              </Card.Body>
            </Card>
          </Col>

          {/* 💼 Job Preferences */}
          <Col md={12}>
            <Card className="mb-4" style={{ background: "#004b66", color: "white" }}>
              <Card.Body>
                <Card.Title style={{ color: "cyan" }}>Job Preferences</Card.Title>

                <Form.Check
                  type="switch"
                  label="Auto Publish New Jobs"
                  checked={settings.autoPublishJobs}
                  onChange={e => updateSetting("autoPublishJobs", e.target.checked)}
                />

                <Form.Check
                  type="switch"
                  label="Auto Save Job Drafts"
                  checked={settings.autoSaveDrafts}
                  onChange={e => updateSetting("autoSaveDrafts", e.target.checked)}
                />
              </Card.Body>
            </Card>
          </Col>

          {/* 🔐 Security */}
          <Col md={12}>
            <Card style={{ background: "#002f40", color: "white" }}>
              <Card.Body>
                <Card.Title style={{ color: "cyan" }}>Security</Card.Title>

                <Form.Check
                  type="switch"
                  label="Remember Login"
                  checked={settings.rememberLogin}
                  onChange={e => updateSetting("rememberLogin", e.target.checked)}
                />

                <Button
                  variant="danger"
                  className="mt-3"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
    </motion.div>
  );
}
