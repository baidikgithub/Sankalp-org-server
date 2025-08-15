// WhatsAppButton.jsx
import { Button } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";

const WhatsAppButton = ({ phone }) => (
  <Button
    type="primary"
    icon={<WhatsAppOutlined />}
    style={{ backgroundColor: "#25D366", borderColor: "#25D366" }}
    href={`https://wa.me/${phone.replace(/\D/g, "")}`}
    target="_blank"
  />
);

export default WhatsAppButton;
