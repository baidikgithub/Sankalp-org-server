import React, { useState } from "react";
import { message } from "antd";

import BannerSection from "../components/BannerSection";
import GallerySection from "../components/GallerySection";
import BenefitsSection from "../components/BenefitsSection";
import RegistrationForm from "../components/RegistrationForm";

import {
  BookOutlined, HeartOutlined, EnvironmentOutlined, TeamOutlined,
  CalendarOutlined, UserOutlined, GiftOutlined, TrophyOutlined
} from "@ant-design/icons";

import home2 from "../assets/home/home2.jpg";
import home3 from "../assets/home/home3.jpg";
import home4 from "../assets/home/home4.jpg";
import home5 from "../assets/home/home5.jpg";
import home6 from "../assets/home/home6.jpg";

const JoinUs = () => {
  const [loading, setLoading] = useState(false);

  const interestOptions = [
    { value: "education", label: "Education & Teaching", icon: <BookOutlined /> },
    { value: "health", label: "Health & Medical", icon: <HeartOutlined /> },
    { value: "environment", label: "Environment & Conservation", icon: <EnvironmentOutlined /> },
    { value: "social", label: "Social Welfare", icon: <TeamOutlined /> },
    { value: "fundraising", label: "Fundraising & Events", icon: <CalendarOutlined /> },
    { value: "technology", label: "Technology & Digital", icon: <UserOutlined /> },
    { value: "communication", label: "Communication & Media", icon: <GiftOutlined /> },
    { value: "administration", label: "Administration", icon: <TrophyOutlined /> },
  ];

  const benefits = [
    { icon: <BookOutlined />, title: "Volunteer Certificates", description: "Get recognition for your service hours" },
    { icon: <CalendarOutlined />, title: "Priority Access", description: "Early registration for events and programs" },
    { icon: <TeamOutlined />, title: "Community Network", description: "Connect with like-minded individuals" },
    { icon: <UserOutlined />, title: "Skill Development", description: "Free workshops and training sessions" },
    { icon: <GiftOutlined />, title: "Member Discounts", description: "Special discounts on merchandise and events" },
    { icon: <TrophyOutlined />, title: "Awards & Recognition", description: "Annual volunteer appreciation events" },
  ];

  const galleryItems = [
    { img: home3, title: "Education Volunteers", desc: "Teaching and mentoring children" },
    { img: home4, title: "Healthcare Volunteers", desc: "Providing medical care & support" },
    { img: home5, title: "Community Outreach", desc: "Connecting with local communities" },
    { img: home6, title: "Youth Development", desc: "Empowering young leaders" },
  ];

  const onFinish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Thank you for joining us! We will contact you soon.");
    }, 2000);
  };

  return (
    <div>
      <BannerSection
        background={home2}
        title="Join Our Community"
        subtitle="Be part of the change you want to see in the world"
      />

      <div style={{ padding: "50px" }}>
        <GallerySection items={galleryItems} />
        <div style={{ marginTop: 60 }}>
          <BenefitsSection benefits={benefits} />
        </div>
        <div style={{ marginTop: 60 }}>
          <RegistrationForm
            onFinish={onFinish}
            loading={loading}
            interestOptions={interestOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
