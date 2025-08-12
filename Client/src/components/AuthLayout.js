// components/auth/AuthLayout.jsx
import React from "react";
import { Layout, Row, Col } from "antd";

const { Content } = Layout;

const AuthLayout = ({ leftContent, rightContent }) => {
  return (
    <Layout style={{ background: "#fff", minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Content style={{ width: "100%" }}>
        <Row justify="center" align="middle" style={{ padding: "20px" }}>
          <Col xs={24} sm={22} md={20} lg={18} xl={16}>
            <Row
              gutter={0}
              style={{
                borderRadius: 0,
                overflow: "hidden",
                background: "#fff",
              }}
            >
              {/* Left Column (Branding / Info) */}
              <Col xs={24} md={12} style={{ background: "#fff" }}>
                {leftContent}
              </Col>

              {/* Right Column (Form) */}
              <Col xs={24} md={12} style={{ background: "#fff" }}>
                {rightContent}
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
