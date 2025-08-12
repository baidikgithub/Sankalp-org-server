import { motion } from "framer-motion";
import { Button, Input, Typography, Space } from "antd";

const { Title } = Typography;

export default function AmountSelector({ amount, setAmount, customAmount, setCustomAmount, amountOptions }) {
  return (
    <>
      <Title level={4}>Select Amount</Title>
      <Space wrap>
        {amountOptions.map((amt) => (
          <motion.div whileHover={{ scale: 1.05 }} key={amt.value}>
            <Button
              type={amount === amt.value ? "primary" : "default"}
              onClick={() => {
                setAmount(amt.value);
                setCustomAmount("");
              }}
            >
              {amt.label}
            </Button>
          </motion.div>
        ))}
      </Space>
      <Input
        type="number"
        placeholder="Enter custom amount"
        style={{ marginTop: 10, width: 200 }}
        value={customAmount}
        onChange={(e) => {
          setCustomAmount(e.target.value);
          setAmount("");
        }}
      />
    </>
  );
}
