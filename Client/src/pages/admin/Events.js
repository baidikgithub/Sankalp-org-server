import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Input,
  Select,
  Button,
  Modal,
  Form,
  DatePicker,
  TimePicker,
  InputNumber,
  Tag,
  Typography,
  Space,
  Tooltip,
  message,
  Progress,
} from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Option } = Select;

const Events = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Youth Leadership Workshop",
      description:
        "A comprehensive workshop to develop leadership skills among young volunteers",
      date: "2024-02-15",
      time: "10:00 AM",
      location: "Mumbai Community Center",
      capacity: 50,
      registered: 35,
      status: "upcoming",
      organizer: "Priya Sharma",
    },
    {
      id: 2,
      title: "Environmental Cleanup Drive",
      description:
        "Community cleanup initiative to promote environmental awareness",
      date: "2024-02-20",
      time: "8:00 AM",
      location: "Beach Front, Mumbai",
      capacity: 100,
      registered: 78,
      status: "upcoming",
      organizer: "Rahul Kumar",
    },
    {
      id: 3,
      title: "Blood Donation Camp",
      description:
        "Annual blood donation drive in collaboration with local hospitals",
      date: "2024-01-30",
      time: "9:00 AM",
      location: "City Hospital",
      capacity: 200,
      registered: 156,
      status: "completed",
      category: "Health",
      organizer: "Dr. Amit Patel",
    },
    {
      id: 4,
      title: "Digital Literacy Program",
      description:
        "Teaching basic computer skills to underprivileged children",
      date: "2024-02-10",
      time: "2:00 PM",
      location: "Local School",
      capacity: 30,
      registered: 25,
      status: "ongoing",
      category: "Education",
      organizer: "Neha Singh",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [form] = Form.useForm();

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || event.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || event.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleAddEvent = (values) => {
    const event = {
      id: events.length + 1,
      title: values.title,
      description: values.description,
      date: values.date.format("YYYY-MM-DD"),
      time: values.time.format("hh:mm A"),
      location: values.location,
      capacity: values.capacity,
      registered: 0,
      status: "upcoming",
      category: values.category,
      organizer: values.organizer,
    };
    setEvents([...events, event]);
    form.resetFields();
    setShowAddModal(false);
    message.success("Event created successfully!");
  };

  const handleStatusChange = (eventId, newStatus) => {
    setEvents(
      events.map((event) =>
        event.id === eventId ? { ...event, status: newStatus } : event
      )
    );
    message.success(`Event status updated to ${newStatus}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "blue";
      case "ongoing":
        return "green";
      case "completed":
        return "default";
      case "cancelled":
        return "red";
      default:
        return "default";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Workshop":
        return "blue";
      case "Community Service":
        return "green";
      case "Health":
        return "red";
      case "Education":
        return "orange";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "upcoming":
        return <CalendarOutlined />;
      case "ongoing":
        return <SyncOutlined spin />;
      case "completed":
        return <CheckCircleOutlined />;
      case "cancelled":
        return <ClockCircleOutlined />;
      default:
        return <CalendarOutlined />;
    }
  };

  return (
    <div style={{ padding: "0px", margin:"0" }}>
    
      {/* Stats Cards */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
        style={{ marginBottom: 24 }}
      >
        <Row gutter={[16, 16]}>
          {[
            {
              title: "Total Events",
              value: events.length,
              icon: <CalendarOutlined style={{ color: "#1890ff" }} />,
              color: "#1890ff",
            },
            {
              title: "Upcoming",
              value: events.filter((e) => e.status === "upcoming").length,
              icon: <ClockCircleOutlined style={{ color: "#faad14" }} />,
              color: "#faad14",
            },
            {
              title: "Ongoing",
              value: events.filter((e) => e.status === "ongoing").length,
              icon: <SyncOutlined style={{ color: "#52c41a" }} />,
              color: "#52c41a",
            },
            {
              title: "Completed",
              value: events.filter((e) => e.status === "completed").length,
              icon: <CheckCircleOutlined style={{ color: "#13c2c2" }} />,
              color: "#13c2c2",
            },
          ].map((stat, i) => (
            <Col xs={24} sm={12} md={6} key={i}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card>
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    prefix={stat.icon}
                    valueStyle={{ color: stat.color }}
                  />
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>

      {/* Controls */}
      <Card style={{ marginBottom: 2, padding: "2px", border: "none" }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={8}>
            <Input
              placeholder="Search events..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: "100%" }}
            >
              <Option value="all">All Status</Option>
              <Option value="upcoming">Upcoming</Option>
              <Option value="ongoing">Ongoing</Option>
              <Option value="completed">Completed</Option>
              <Option value="cancelled">Cancelled</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              value={categoryFilter}
              onChange={setCategoryFilter}
              style={{ width: "100%" }}
            > 
              <Option value="all">All Categories</Option>
              <Option value="Workshop">Workshop</Option>
              <Option value="Community Service">Community Service</Option>
              <Option value="Health">Health</Option>
              <Option value="Education">Education</Option>
            </Select>
          </Col>
          <Col xs={24} md={8}>
            <Button
            style={{ width: "50%" }}
              type="primary"
              icon={<PlusOutlined />}
              block
              onClick={() => setShowAddModal(true)}
            >
              Create Event
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Event Cards */}
      <Row gutter={[16, 16]}>
        {filteredEvents.map((event) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={event.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                hoverable
                style={{ height: "100%" }}
                actions={[
                  <Tooltip title="Edit">
                    <EditOutlined key="edit" />
                  </Tooltip>,
                  <Tooltip title="View Details">
                    <EyeOutlined key="view" />
                  </Tooltip>,
                ]}
              >
                <Space style={{ marginBottom: 12 }}>
                  <Tag
                    color={getStatusColor(event.status)}
                    icon={getStatusIcon(event.status)}
                  >
                    {event.status.toUpperCase()}
                  </Tag>
                </Space>

                <Title level={4} style={{ marginBottom: 8 }}>
                  {event.title}
                </Title>

                <Space direction="vertical" size="small">
                  <div>
                    <CalendarOutlined style={{ color: "#1890ff" }} />{" "}
                    <Text>{new Date(event.date).toLocaleDateString()}</Text>
                  </div>
                  <div>
                    <ClockCircleOutlined style={{ color: "#1890ff" }} />{" "}
                    <Text>{event.time}</Text>
                  </div>
                  <div>
                    <EnvironmentOutlined style={{ color: "#1890ff" }} />{" "}
                    <Text>{event.location}</Text>
                  </div>
                  <div>
                    <TeamOutlined style={{ color: "#1890ff" }} />{" "}
                    <Text>
                      {event.registered}/{event.capacity} registered
                    </Text>
                  </div>
                </Space>

              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Create Event Modal */}
      <Modal
        title="Create New Event"
        open={showAddModal}
        onCancel={() => {
          setShowAddModal(false);
          form.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleAddEvent}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Event Title"
                rules={[{ required: true, message: "Please enter event title" }]}
              >
                <Input placeholder="Enter event title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: "Please select category" }]}
              >
                <Select placeholder="Select category">
                  <Option value="Workshop">Workshop</Option>
                  <Option value="Community Service">Community Service</Option>
                  <Option value="Health">Health</Option>
                  <Option value="Education">Education</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea rows={3} placeholder="Enter event description" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="date"
                label="Date"
                rules={[{ required: true, message: "Please select date" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="time"
                label="Time"
                rules={[{ required: true, message: "Please select time" }]}
              >
                <TimePicker style={{ width: "100%" }} format="hh:mm A" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="location"
                label="Location"
                rules={[{ required: true, message: "Please enter location" }]}
              >
                <Input placeholder="Enter event location" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="capacity"
                label="Capacity"
                rules={[{ required: true, message: "Please enter capacity" }]}
              >
                <InputNumber
                  min={1}
                  placeholder="Enter capacity"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="organizer"
            label="Organizer"
            rules={[{ required: true, message: "Please enter organizer name" }]}
          >
            <Input placeholder="Enter organizer name" />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Space>
              <Button
                onClick={() => {
                  setShowAddModal(false);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Create Event
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Events;
