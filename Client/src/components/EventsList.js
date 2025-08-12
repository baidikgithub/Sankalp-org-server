// src/components/EventList.jsx
import React from "react";
import { Row, Col, Card, Tag, Typography, Space, Button } from "antd";
import { motion } from "framer-motion";

const { Title, Paragraph, Text } = Typography;

export default function EventList({ events, isUpcoming }) {
  return (
    <Row gutter={[24, 24]}>
      {events.map((event) => (
        <Col xs={24} md={12} key={event.id}>
          <motion.div whileHover={{ y: -5, scale: 1.01 }} transition={{ type: "spring" }}>
            <Card
              title={
                <Space direction="vertical">
                  <Title level={4} style={{ marginBottom: 0 }}>{event.title}</Title>
                  <Space>
                    <Tag color="blue">{event.type}</Tag>
                    <Tag>{event.location}</Tag>
                    {event.time && <Tag>{event.time}</Tag>}
                  </Space>
                </Space>
              }
              style={{ borderRadius: 12, boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }}
            >
              <Paragraph>{event.description}</Paragraph>

              {isUpcoming ? (
                <>
                  <Text strong>Participants:</Text> {event.participants} <br />
                  <Text strong>Duration:</Text> {event.duration}
                  <ul>{event.objectives.map((o, i) => <li key={i}>{o}</li>)}</ul>
                </>
              ) : (
                <>
                  <Text strong>Impact:</Text> <Tag color="green">{event.impact}</Tag>
                  <ul>{event.achievements.map((a, i) => <li key={i}>{a}</li>)}</ul>
                  {event.videoId && (
                    <iframe
                      width="100%"
                      height="200"
                      src={`https://www.youtube.com/embed/${event.videoId}`}
                      title={event.title}
                      allowFullScreen
                      style={{ borderRadius: 8, marginTop: 12 }}
                    />
                  )}
                </>
              )}

              <Space style={{ marginTop: 12 }}>
                {isUpcoming && <Button type="primary">Register</Button>}
                <Button>View Details</Button>
              </Space>
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  );
}
