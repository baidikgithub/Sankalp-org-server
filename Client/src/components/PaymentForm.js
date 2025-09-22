import { motion } from "framer-motion";
import { Form, Input, Select, Divider, Button, Card, Row, Col, Spin, Typography } from "antd";

const { Text } = Typography;

export default function PaymentForm({ selectedOption, getFinalAmount, isProcessing, onFinish }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card style={{ marginTop: 30 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          {/* Credit/Debit Card */}
          {selectedOption === "card" && (
            <>
              <Form.Item name="cardNumber" label="Card Number" rules={[{ required: true }]}>
                <Input placeholder="1234 5678 9012 3456" />
              </Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="expiryDate" label="Expiry Date" rules={[{ required: true }]}>
                    <Input placeholder="MM/YY" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="cvv" label="CVV" rules={[{ required: true }]}>
                    <Input placeholder="123" />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}

          {/* UPI */}
          {selectedOption === "upi" && (
            <Form.Item name="upiId" label="UPI ID" rules={[{ required: true }]}>
              <Input placeholder="yourname@upi" />
            </Form.Item>
          )}


          <Divider />
          <Text strong>Donation Amount: ₹{getFinalAmount() || 0}</Text>
          <Divider />

          <Form.Item>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                disabled={!getFinalAmount() || isProcessing}
              >
                {isProcessing ? <Spin /> : `Donate ₹${getFinalAmount() || 0}`}
              </Button>
            </motion.div>
          </Form.Item>
        </Form>
      </Card>
    </motion.div>
  );
}
