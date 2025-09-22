import { Input } from "antd";

export default function AmountSelector({ amount, setAmount, customAmount, setCustomAmount }) {
  return (
    <>
      <Input
        type="number"
        placeholder="Enter custom amount"
        style={{ marginTop: 10, width: 500 }}
        value={customAmount}
        onChange={(e) => {
          setCustomAmount(e.target.value);
          setAmount("");
        }}
      />
    </>
  );
}
