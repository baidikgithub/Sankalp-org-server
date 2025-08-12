import React from "react";
import { Layout, Row, Col, Typography, Space, Button } from "antd";
import {
  LinkedinOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Footer: AntFooter } = Layout;
const { Title, Paragraph } = Typography;

const Footer = () => {
  const socialLinks = [
    { icon: <LinkedinOutlined />, url: "https://www.linkedin.com/in/yourlinkedinprofile", label: "LinkedIn" },
    { icon: <InstagramOutlined />, url: "https://www.instagram.com/yourinstagramprofile", label: "Instagram" },
    { icon: <YoutubeOutlined />, url: "https://www.youtube.com/c/yourchannel", label: "YouTube" },
    { icon: <FacebookOutlined />, url: "https://www.facebook.com/yourfacebookpage", label: "Facebook" },
  ];

  return (
    <AntFooter style={{
      background: "#181818", // subtle black background
      padding: "50px 0 20px",
      color: "#eee",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        {/* Top content */}
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ color: "#66b3ff" }}>Sankalp Youth Organisation</Title>
            <Paragraph style={{ color: "#eee" }}>Building a world of hope</Paragraph>
            <Paragraph type="secondary" style={{ margin: 0, color: "#bbb" }}>
              Registered under SOCIETIES ACT OF XXI OF 1860
            </Paragraph>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: "#66b3ff" }}>Quick Links</Title>
            <Space direction="vertical">
              <Link to="/" style={{ color: "#ddd" }}>Home</Link>
              <Link to="/about" style={{ color: "#ddd" }}>About</Link>
              <Link to="/events" style={{ color: "#ddd" }}>Events</Link>
              <Link to="/contact" style={{ color: "#ddd" }}>Contact</Link>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: "#66b3ff" }}>Services</Title>
            <Space direction="vertical">
              <Link to="/watchlist" style={{ color: "#ddd" }}>Watchlist</Link>
              <Link to="/coupons" style={{ color: "#ddd" }}>Coupons</Link>
              <Link to="/payment" style={{ color: "#ddd" }}>Payment</Link>
              <Link to="/join" style={{ color: "#ddd" }}>Join Us</Link>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: "#66b3ff" }}>Contact Info</Title>
            <Space direction="vertical">
              <span style={{ color: "#ddd" }}><MailOutlined /> sankalpyouth@gmail.com</span>
              <span style={{ color: "#ddd" }}><PhoneOutlined /> +123456789</span>
              <span style={{ color: "#ddd" }}><EnvironmentOutlined /> 123, Main Street, Anytown, India</span>
            </Space>
          </Col>
        </Row>

        {/* Social Icons */}
        <div style={{
          textAlign: "center",
          margin: "40px 0 20px",
          borderTop: "1px solid #292929",
          paddingTop: 20
        }}>
          <Space size="large">
            {socialLinks.map((social, i) => (
              <Button
                key={i}
                type="primary"
                shape="circle"
                size="large"
                icon={social.icon}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#222",
                  borderColor: "#222",
                  color: "#fff"
                }}
              />
            ))}
          </Space>
        </div>

        {/* Footer bottom */}
        <div style={{ textAlign: "center", color: "#888" }}>
          © {new Date().getFullYear()} Sankalp Youth Organisation. All rights reserved.
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
