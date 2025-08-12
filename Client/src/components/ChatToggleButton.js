import React from "react";
import { FloatButton } from "antd";
import { MessageOutlined } from "@ant-design/icons";

const ChatToggleButton = ({ onClick }) => (
  <FloatButton
    shape="circle"
    icon={<MessageOutlined />}
    type="primary"
    style={{ right: 24, bottom: 90 }}
    onClick={onClick}
  />
);

export default ChatToggleButton;
