import React from "react";
import { Card, Statistic } from "antd";

const StatCard = ({ title, value, prefix, bgColor }) => (
  <Card variant="borderless" style={{ textAlign: "center", background: bgColor }}>
    <Statistic title={title} value={value} prefix={prefix} />
  </Card>
);

export default StatCard;
