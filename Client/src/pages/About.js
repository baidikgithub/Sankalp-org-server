import React from 'react';
import { motion } from 'framer-motion';
import { Row, Col, Card, Typography, Button, Statistic } from 'antd';
import {
  organizationStats,
  missionVision,
  focusAreas,
  leadership,
} from '../config/about';

import heroImage from '../assets/about/about1.jpg';
import impactImage from '../assets/about/about4.jpeg';
import teamImage from '../assets/about/about5.jpeg';
import communityImage from '../assets/about/about6.jpeg';

const { Title, Paragraph } = Typography;

// A reusable animation variant for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = () => {
  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>

      {/* === HERO SECTION === */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="show"
        style={{
          background: '#fafafa',
          padding: '80px 20px',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Row gutter={[40, 40]} align="middle" style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Text */}
          <Col xs={24} md={14}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Title level={1} style={{ color: '#1890ff', marginBottom: 20 }}>
                About <span style={{ color: '#000' }}>Us</span>
              </Title>
              <Paragraph style={{ fontSize: '1.1rem', color: '#555', marginBottom: 20 }}>
                Sankalp Youth Organisation is a non-profit committed to empowering communities
                across India. Since our inception in 2018, we have worked relentlessly to create
                sustainable solutions that address pressing social issues.
              </Paragraph>
              <Paragraph style={{ color: '#777', marginBottom: 30 }}>
                Our work spans education, healthcare, livelihood, and environmental sustainability —
                impacting millions of lives through grassroots action, advocacy, and collaboration.
              </Paragraph>
              <Button type="primary" size="large" href="#focus">
                Learn More About Our Mission
              </Button>
            </motion.div>
          </Col>

          {/* Image */}
          <Col xs={24} md={10}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src={heroImage}
                alt="About our journey"
                style={{
                  width: '100%',
                  borderRadius: 12,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  objectFit: 'cover'
                }}
              />
            </motion.div>
          </Col>
        </Row>
      </motion.section>

      {/* === MISSION & VISION === */}
      {missionVision.map((item, index) => (
        <motion.section
          key={index}
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            padding: '80px 20px',
            background: index % 2 === 0 ? '#fff' : '#fafafa'
          }}
        >
          <Row
            gutter={[40, 40]}
            align="middle"
            style={{ maxWidth: 1200, margin: '0 auto', flexDirection: index % 2 ? 'row-reverse' : 'row' }}
          >
            {/* Text */}
            <Col xs={24} md={12}>
              <Title level={2} style={{ color: '#1890ff' }}>{item.title}</Title>
              <Paragraph>{item.description}</Paragraph>
              <ul>
                {item.points.map((point, idx) => (
                  <li key={idx} style={{ marginBottom: 8 }}>{point}</li>
                ))}
              </ul>
            </Col>

            {/* Image */}
            <Col xs={24} md={12}>
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                src={item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  borderRadius: 12,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                }}
              />
            </Col>
          </Row>
        </motion.section>
      ))}

      {/* === IMPACT STATS (IMPROVED) === */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          padding: '80px 20px',
          background: '#fafafa',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Title style={{ textAlign: 'center', marginBottom: 50, color: '#1890ff' }}>
            Our Impact at a Glance
          </Title>

          <Row gutter={[24, 24]} justify="center">
            {organizationStats.map((stat, i) => (
              <Col xs={24} sm={12} md={8} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    background: '#fff',
                    padding: '30px 20px',
                    borderRadius: 12,
                    textAlign: 'center',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                    border: '1px solid #f0f0f0',
                    cursor: 'default',
                  }}
                >
                  <div
                    style={{
                      fontSize: 40,
                      color: '#1890ff',
                      marginBottom: 15,
                    }}
                  >
                    {stat.icon}
                  </div>
                  <Title
                    level={3}
                    style={{
                      color: '#333',
                      marginBottom: 5,
                    }}
                  >
                    {stat.number}
                  </Title>
                  <Paragraph
                    style={{
                      color: '#666',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                    }}
                  >
                    {stat.label}
                  </Paragraph>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </motion.section>


      {/* === FOCUS AREAS === */}
      <motion.section
        id="focus"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{ padding: '80px 20px', background: '#fff' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Title level={2} style={{ textAlign: 'center' }}>Our Core Focus Areas</Title>
          <Paragraph style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            We work across multiple sectors to create comprehensive and sustainable impact.
          </Paragraph>
          <Row gutter={[24, 24]} style={{ marginTop: 40 }}>
            {focusAreas.map((area, idx) => (
              <Col xs={24} sm={12} md={8} key={idx}>
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Card
                    title={<span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 24 }}>{area.icon}</span> {area.area}
                    </span>}
                    bordered
                    style={{ borderRadius: 12 }}
                  >
                    <Paragraph>{area.description}</Paragraph>
                    <ul>
                      {area.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                    <div style={{
                      background: '#52c41a',
                      color: '#fff',
                      padding: '10px',
                      textAlign: 'center',
                      borderRadius: 8,
                      marginTop: 12,
                    }}>
                      {area.impact}
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </motion.section>

      {/* === LEADERSHIP === */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{ padding: '80px 20px', background: '#fafafa' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={40} align="middle" style={{ marginBottom: 50 }}>
            <Col xs={24} md={12}>
              <Title level={2}>Our Leadership Team</Title>
              <Paragraph>
                Led by experienced professionals committed to social change and sustainable development.
              </Paragraph>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            {leadership.map((leader, idx) => (
              <Col xs={24} sm={12} md={6} key={idx}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card style={{ textAlign: 'center', borderRadius: 12 }}>
                    <div style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: '#1890ff',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 22,
                      margin: '0 auto 16px',
                    }}>
                      {leader.initials}
                    </div>
                    <Title level={4}>{leader.name}</Title>
                    <Paragraph style={{ color: '#1890ff' }}>{leader.role}</Paragraph>
                    <Paragraph>{leader.experience}</Paragraph>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </motion.section>

      {/* === COMMUNITY === */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{ padding: '80px 20px', background: '#fff' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={40} align="middle">
            <Col xs={24} md={12}>
              <Title level={2}>Building Stronger Communities</Title>
              <Paragraph>
                Our approach is community-centered, evidence-based, and sustainable. We partner with
                like-minded institutions to implement high-impact programmes that enable access,
                enhance quality, and drive long-term change.
              </Paragraph>
              <Row gutter={[16, 16]}>
                <Col span={24}><Card bordered style={{ borderLeft: '4px solid #1890ff' }}>Community Participation</Card></Col>
                <Col span={24}><Card bordered style={{ borderLeft: '4px solid #1890ff' }}>Evidence-Based Approach</Card></Col>
                <Col span={24}><Card bordered style={{ borderLeft: '4px solid #1890ff' }}>Sustainable Solutions</Card></Col>
              </Row>
            </Col>
            <Col xs={24} md={12}>
              <img src={communityImage} alt="Community" style={{ width: '100%', borderRadius: 12 }} />
            </Col>
          </Row>
        </div>
      </motion.section>

     
    </div>
  );
};

export default About;
