import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Card,
  Typography,
  Space,
  Avatar
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  YoutubeFilled
} from "@ant-design/icons";

import home1 from "../assets/home/home1.jpg";
import home2 from "../assets/home/home2.jpg";
import home3 from "../assets/home/home3.jpg";
import home4 from "../assets/home/home4.jpg";

const { Title, Paragraph, Text } = Typography;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const contactInfo = [
    {
      icon: <MailOutlined />,
      title: "Email",
      value: "abc@gmail.com",
      link: "mailto:abc@gmail.com"
    },
    {
      icon: <PhoneOutlined />,
      title: "Phone",
      value: "+123 456 789",
      link: "tel:+123456789"
    },
    {
      icon: <EnvironmentOutlined />,
      title: "Address",
      value: "123 Community Street, City, State 12345"
    },
    {
      icon: <ClockCircleOutlined />,
      title: "Office Hours",
      value: "Mon - Fri: 9:00 AM - 6:00 PM"
    }
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

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage("Thank you for your message! We will get back to you soon.");
      setTimeout(() => setSubmitMessage(""), 5000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `url(${home1})`,
          minHeight: "50vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "center",
          color: "white"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1
          }}
        />
        <div
          style={{
            position: "relative",
            width: "100%",
            padding: "60px 0",
            textAlign: "center",
            zIndex: 2
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Title style={{ color: "white" }}>Contact Us</Title>
            <Paragraph style={{ color: "white", fontSize: "16px" }}>
              Get in touch with us for any questions or collaborations
            </Paragraph>
          </motion.div>
        </div>
      </div>


      <motion.div
        style={{ padding: "40px" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Gallery */}
        <motion.div variants={itemVariants} style={{ textAlign: "center" }}>
          <Title level={2}>Our Work in Action</Title>
          <Paragraph>See the impact of our community initiatives</Paragraph>
        </motion.div>

        <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
          {gallery.map((g, i) => (
            <Col xs={24} sm={12} md={8} key={i}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card
                  hoverable
                  cover={<img src={g.img} alt={g.title} style={{ height: 200, objectFit: "cover" }} />}
                >
                  <Card.Meta title={g.title} description={g.desc} />
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        <Row gutter={[40, 40]} style={{ marginTop: 60 }}>
          {/* Contact Form */}
          <Col xs={24} md={14}>
            <motion.div variants={itemVariants}>
              <Card title="Send Us a Message" bordered={false}>
                {submitMessage && (
                  <motion.div
                    style={{ marginBottom: 20, color: "green" }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {submitMessage}
                  </motion.div>
                )}
                <Form layout="vertical" onFinish={handleSubmit}>
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item name="name" rules={[{ required: true, message: "Name is required" }]}>
                        <Input placeholder="Your Name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="email"
                        rules={[
                          { required: true, message: "Email is required" },
                          { type: "email", message: "Enter a valid email" }
                        ]}
                      >
                        <Input placeholder="Your Email" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item name="subject" rules={[{ required: true }]}>
                    <Input placeholder="Subject" />
                  </Form.Item>
                  <Form.Item
                    name="message"
                    rules={[{ required: true, message: "Message cannot be empty" }]}
                  >
                    <Input.TextArea placeholder="Your Message" rows={6} />
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                    block
                  >
                    Send Message
                  </Button>
                </Form>
              </Card>
            </motion.div>
          </Col>

          {/* Contact Info */}
          <Col xs={24} md={10}>
            <motion.div variants={itemVariants}>
              <Card title="Get in Touch" bordered={false}>
                <Paragraph>
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </Paragraph>
                <Space direction="vertical" style={{ width: "100%" }}>
                  {contactInfo.map((info, idx) => (
                    <motion.div key={idx} whileHover={{ scale: 1.02 }}>
                      <Space>
                        <Avatar
                          style={{
                            background: "linear-gradient(135deg,#007BFF,#0056b3)"
                          }}
                          icon={info.icon}
                        />
                        <div>
                          <Text strong>{info.title}</Text>
                          <br />
                          {info.link ? (
                            <a href={info.link}>{info.value}</a>
                          ) : (
                            <Text>{info.value}</Text>
                          )}
                        </div>
                      </Space>
                    </motion.div>
                  ))}
                </Space>

                <div style={{ marginTop: 30 }}>
                  <Title level={4}>Follow Us</Title>
                  <Space>
                    {socialLinks.map((s, i) => (
                      <motion.a
                        key={i}
                        href={s.url}
                        target="_blank"
                        whileHover={{ scale: 1.2 }}
                        style={{
                          fontSize: 24,
                          color: "#007BFF"
                        }}
                      >
                        {s.icon}
                      </motion.a>
                    ))}
                  </Space>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </motion.div>
    </div>
  );
};

export default Contact;
