import { motion } from "framer-motion";
import { Card, Row, Col, Button, Typography } from "antd";
const { Title, Paragraph } = Typography;

export default function ImpactGallery({ fadeUp, galleryData, onDonateClick }) {
  return (
    <motion.div
      style={{ maxWidth: 1000, margin: "0 auto", padding: 20, marginBottom: "40px" }}
      variants={fadeUp}
    >
      <Title level={2}>Your Impact in Action</Title>
      <Paragraph>See how your donations are transforming lives and communities</Paragraph>
      
      <Row gutter={[52, 16]}>
        {galleryData.map((item, i) => (
          <Col xs={24} sm={8} key={i}>
            <motion.div whileHover={{ scale: 1.05 }} variants={fadeUp} custom={i}>
              <Card
                hoverable
                cover={
                  <motion.img
                    src={item.img}
                    alt={item.title}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                }
              >
                <Card.Meta title={item.title} description={item.desc} />
                
                {/* Buttons Side-by-Side */}
                <div style={{ display: "flex", gap: "8px", marginTop: 12 }}>
                  <Button
                    block
                    style={{ flex: 1 }}
                    onClick={() => console.log(`View details for ${item.title}`)}
                  >
                    Details
                  </Button>
                  <Button
                    type="primary"
                    block
                    style={{ flex: 1 }}
                    onClick={onDonateClick}
                  >
                    Donate
                  </Button>
                </div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </motion.div>
  );
}
