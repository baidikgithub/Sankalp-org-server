import { motion } from "framer-motion";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function DonationHero({ backgroundImage, fadeUp, title, subtitle }) {
  return (
    <motion.div
      style={{
        position: "relative",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "45vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        marginBottom: "40px"
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)"
      }} />
      <div style={{ position: "relative", zIndex: 2, padding: 40, textAlign: "center", width: "100%" }}>
        <motion.div variants={fadeUp}>
          <Title style={{ color: "#fff" }}>{title}</Title>
        </motion.div>
        <motion.div variants={fadeUp}>
          <Paragraph style={{ color: "#eee" }}>{subtitle}</Paragraph>
        </motion.div>
      </div>
    </motion.div>
  );
}
