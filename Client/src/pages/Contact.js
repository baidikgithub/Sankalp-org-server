import React, { useState } from "react";
import { motion } from "framer-motion";
import { Row, Col, Card, Typography, Space, Avatar, Button, Form, Input } from "antd";
import {
  MailOutlined, PhoneOutlined, EnvironmentOutlined, ClockCircleOutlined,
  FacebookFilled, InstagramFilled, LinkedinFilled, YoutubeFilled
} from "@ant-design/icons";

import home1 from "../assets/home/home1.jpg";
import home2 from "../assets/home/home2.jpg";
import home3 from "../assets/home/home3.jpg";
import home4 from "../assets/home/home4.jpg";

// Components
import HeroSection from "../components/HeroSection";
import GallerySection from "../components/ContactGallerySection";
import ContactForm from "../components/ContactForm.js";
import ContactInfoList from "../components/ContactInfoList";
import SocialLinks from "../components/SocialLinks";

const { Title, Paragraph } = Typography;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Static data
  const contactInfo = [
    { icon: <MailOutlined />, title: "Email", value: "abc@gmail.com", link: "mailto:abc@gmail.com" },
    { icon: <PhoneOutlined />, title: "Phone", value: "+123 456 789", link: "tel:+123456789" },
    { icon: <EnvironmentOutlined />, title: "Address", value: "123 Community Street, City, State 12345" },
    { icon: <ClockCircleOutlined />, title: "Office Hours", value: "Mon - Fri: 9:00 AM - 6:00 PM" }
  ];

  const socialLinks = [
    { icon: <FacebookFilled />, url: "https://facebook.com" },
    { icon: <InstagramFilled />, url: "https://instagram.com" },
    { icon: <LinkedinFilled />, url: "https://linkedin.com" },
    { icon: <YoutubeFilled />, url: "https://youtube.com" }
  ];

  const gallery = [
    { img: home2, title: "Community Outreach", desc: "Connecting with communities" },
    { img: home3, title: "Healthcare Programs", desc: "Bringing health to all" },
    { img: home4, title: "Education Initiatives", desc: "Empowering through knowledge" }
  ];

  // Functions
  const handleSubmit = (values) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage("Thank you! We’ll get back to you soon.");
      setTimeout(() => setSubmitMessage(""), 5000);
    }, 1500);
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        image={home1}
        title="Contact Us"
        subtitle="Get in touch with us for any questions or collaborations"
      />

      <div style={{ padding: "40px" }}>
        
        {/* Gallery */}
        <GallerySection gallery={gallery} />

        <Row gutter={[40, 40]} style={{ marginTop: 60 }}>
          {/* Contact Form */}
          <Col xs={24} md={14}>
            <ContactForm
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitMessage={submitMessage}
            />
          </Col>

          {/* Contact Info */}
          <Col xs={24} md={10}>
            <Card title="Get in Touch" bordered={false}>
              <Paragraph>
                We'd love to hear from you. Send us a message and we'll respond quickly.
              </Paragraph>
              <ContactInfoList contactInfo={contactInfo} />
              <div style={{ marginTop: 30 }}>
                <Title level={4}>Follow Us</Title>
                <SocialLinks socialLinks={socialLinks} />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Contact;
