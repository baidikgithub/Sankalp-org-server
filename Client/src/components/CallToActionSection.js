import React from "react";
import { motion } from "framer-motion";
import { Typography, Button } from "antd";

const { Title, Paragraph } = Typography;

const CallToActionSection = () => (
  <motion.section
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    style={{ padding: "80px 20px", background: "#fff" }}
  >
    <div style={{ textAlign: "center", color: "#fff", maxWidth: 700, margin: "0 auto" }}>
      <Title style={{ color: "black" }}>Join Our Mission for Change</Title>
      <Paragraph style={{ color: "black" }}>
        Be part of our journey towards creating a more equitable and sustainable society.
        Together, we can make a lasting difference in the lives of millions.
      </Paragraph>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 16 }}>
        <Button type="primary" size="large" href="/join">
          Become a Volunteer
        </Button>
        <Button type="default" size="large" href="/collaborations">
          Partner With Us
        </Button>
        <Button style={{ background: "#fff0f6" }} size="large" href="/payment">
          Support Our Work
        </Button>
      </div>
    </div>
  </motion.section>
);

export default CallToActionSection;
