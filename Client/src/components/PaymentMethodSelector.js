import { motion } from "framer-motion";
import { Radio, Typography } from "antd";

const { Title } = Typography;

export default function PaymentMethodSelector({ paymentMethods, selectedOption, setSelectedOption }) {
  return (
    <>
      <Title level={4}>Choose Payment Method</Title>
      <Radio.Group
        style={{ marginBottom: 20 }}
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {paymentMethods.map((m) => (
          <motion.div
            key={m.id}
            whileHover={{ scale: 1.05 }}
            style={{ display: "inline-block", marginRight: 8 }}
          >
            <Radio.Button value={m.id}>
              {m.icon} {m.title}
            </Radio.Button>
          </motion.div>
        ))}
      </Radio.Group>
    </>
  );
}
