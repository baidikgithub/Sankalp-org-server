import React, { useState } from "react";
import { Layout, Input, Button, List, Typography } from "antd";
import { SendOutlined, CloseOutlined } from "@ant-design/icons";
import HeroCarousel from "../components/HeroCarousel";
import ImpactSection from "../components/ImpactSection";
import ProgrammesSection from "../components/ProgrammesSection";
import FinalCTA from "../components/FinalCTA";
import { heroImages, impactMetrics, programmes } from "../constants/home";
import WhatsAppFloatButton from "../components/WhatsAppFloatButton";
import ChatToggleButton from "../components/ChatToggleButton";


const { Content } = Layout;
const { Text } = Typography;

const Home = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const API_URL = "http://localhost:5000/api/chat";
  const whatsappLink = "https://wa.me/1234567890";
  
  const handleSend = async () => {
     if (!input.trim()) return;
  const userMessage = input;
  setMessages([...messages, { from: "user", text: userMessage }]);
  setInput("");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });
    const data = await response.json();
    setMessages((prev) => [...prev, { from: "bot", text: data.response }]);
  } catch (error) {
    setMessages((prev) => [...prev, { from: "bot", text: "Sorry, something went wrong." }]);
  }
  };

  return (
    <Layout style={{ background: "#fff", minHeight: "100vh" }}>
      {/* Hero Section */}
      <HeroCarousel heroImages={heroImages} />

      {/* Main Content */}
      <Content style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ marginTop: "80px" }}>
          <ImpactSection impactMetrics={impactMetrics} />
        </div>

        <div style={{ marginTop: "80px" }}>
          <ProgrammesSection programmes={programmes} />
        </div>

        <FinalCTA />
      </Content>

      {/* Use reusable WhatsApp button */}
      <WhatsAppFloatButton chatOpen={chatOpen} whatsappLink={whatsappLink} />

      {/* Use reusable chat toggle button */}
      {!chatOpen && <ChatToggleButton onClick={() => setChatOpen(true)} />}

      {/* Chat Window */}
      {chatOpen && (
        <div
          style={{
            position: "fixed",
            right: 24,
            bottom: 24,
            width: 320,
            height: 420,
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#3949ab",
              padding: "10px 12px",
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff" }}>Chat with us</Text>
            <CloseOutlined
              onClick={() => setChatOpen(false)}
              style={{ cursor: "pointer" }}
            />
          </div>

          <div style={{ flex: 1, padding: 10, overflowY: "auto" }}>
            <List
              dataSource={messages}
              renderItem={(msg, idx) => (
                <List.Item style={{ padding: "4px 0", border: "none" }}>
                  <div
                    style={{
                      background: msg.from === "user" ? "#e6f7ff" : "#f5f5f5",
                      padding: "8px 12px",
                      borderRadius: 6,
                      maxWidth: "80%",
                      alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    {msg.text}
                  </div>
                </List.Item>
              )}
            />
          </div>

          <div style={{ display: "flex", borderTop: "1px solid #ddd", padding: 8 }}>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPressEnter={handleSend}
              placeholder="Type a message..."
            />
            <Button type="primary" icon={<SendOutlined />} onClick={handleSend} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Home;
