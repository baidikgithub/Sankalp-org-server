import { Result, Button } from "antd";

export default function SuccessMessage({ amount, resetForm }) {
  return (
    <Result
      status="success"
      title="Payment Successful!"
      subTitle={`Thank you for donating ₹${amount}`}
      extra={
        <Button type="primary" onClick={resetForm}>
          Make Another Donation
        </Button>
      }
      style={{ marginTop: "40px" }}
    />
  );
}
