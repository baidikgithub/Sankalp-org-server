const fetch = require("node-fetch");

const handleChat = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.json({ response: "Please type a message." });

  try {
    const response = await fetch("http://localhost:5001/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    res.json({ response: data.response });
  } catch (err) {
    console.error("Error in chatController:", err);
    res.json({ response: "Sorry, something went wrong." });
  }
};

module.exports = { handleChat };
