// src/pages/Events.jsx
import React, { useState } from "react";
import { Layout, Divider, Tabs } from "antd";
import { AnimatePresence, motion } from "framer-motion";

import HeroSection from "../components/EventHeroSection";
import GallerySection from "../components/EventGallerySection";
import CategoryFilter from "../components/CategoryFilter";
import EventList from "../components/EventsList";  // Importing EventList instead of EventCard

import home1 from "../assets/home/home1.jpg";
import home2 from "../assets/home/home2.jpg";
import home3 from "../assets/home/home3.jpg";
import home4 from "../assets/home/home4.jpg";
import home5 from "../assets/home/home5.jpg";
import home6 from "../assets/home/home6.jpg";
import home8 from "../assets/home/home8.jpg";

const { Content } = Layout;

// Data
const eventCategories = [
  { id: "all", label: "All Events", icon: "📅" },
  { id: "education", label: "Education", icon: "📚" },
  { id: "health", label: "Healthcare", icon: "🏥" },
  { id: "women", label: "Women Empowerment", icon: "👩" },
  { id: "youth", label: "Youth Development", icon: "🎯" },
  { id: "community", label: "Community Outreach", icon: "🤝" },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Digital Literacy Drive - Rural Schools",
    description: "Comprehensive digital literacy programme for rural Rajasthan & MP students.",
    date: "2024-02-15",
    time: "10:00 AM",
    location: "Multiple Locations",
    category: "education",
    type: "Programme Launch",
    participants: "2000+ students",
    duration: "6 months",
    objectives: ["Bridge digital divide", "Train teachers", "Provide access"],
  },
];

const pastEvents = [
  {
    id: 3,
    title: "Project Udaan - Education Initiative",
    description: "Successfully completed an education programme.",
    date: "2023-12-15",
    location: "UP & Bihar",
    category: "education",
    type: "Programme Completion",
    impact: "10,000+ children impacted",
    achievements: ["80% improvement in learning outcomes", "200+ teachers trained"],
    videoId: "dQw4w9WgXcQ",
  },
];

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("upcoming");

  const filteredEvents =
    (activeTab === "upcoming" ? upcomingEvents : pastEvents).filter(
      (event) => selectedCategory === "all" || event.category === selectedCategory
    );

  return (
    <Layout style={{ background: "#f9fafb" }}>
      <HeroSection
        backgroundImage={home8}
        title="Our Events & Programmes"
        subtitle="Driving social change through impactful events and community programmes"
      />

      <Content style={{ padding: "50px 20px", maxWidth: 1200, margin: "0 auto" }}>
        <GallerySection
          images={[home1, home2, home3, home4, home5, home6]}
          titles={[
            "Community Events",
            "Education Programs",
            "Health Camps",
            "Women Empowerment",
            "Youth Development",
            "Rural Development",
          ]}
          descriptions={[
            "Bringing communities together",
            "Empowering through knowledge",
            "Healthcare for all",
            "Building strong women leaders",
            "Nurturing future leaders",
            "Transforming rural communities",
          ]}
        />

        <Divider />

        <CategoryFilter
          categories={eventCategories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          items={[
            { key: "upcoming", label: "Upcoming Events" },
            { key: "past", label: "Past Events & Impact" },
          ]}
        />

        {/* Event List without EventCard */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <EventList
              events={filteredEvents}
              isUpcoming={activeTab === "upcoming"}
            />
          </motion.div>
        </AnimatePresence>
      </Content>
    </Layout>
  );
}
