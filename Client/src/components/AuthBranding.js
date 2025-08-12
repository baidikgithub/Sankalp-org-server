// components/auth/AuthBranding.jsx
import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const AuthBranding = ({ logo, orgName, tagline }) => {
  return (
    <div
      style={{
        padding: "3rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#333",
        textAlign: "center",
      }}
    >
      <img
        src={logo}
        alt={orgName}
        style={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: "#fff",
          marginBottom: "1.5rem",
          padding: 5,
        }}
      />
      <Title level={3} style={{ color: "#1a237e", marginBottom: "1rem" }}>
        {orgName}
      </Title>
      <Paragraph style={{ fontSize: "1.08rem", maxWidth: 280, color: "#555" }}>
        {tagline}
      </Paragraph>
    </div>
  );
};

export default AuthBranding;
