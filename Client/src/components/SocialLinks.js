import React from "react";
import { motion } from "framer-motion";

const SocialLinks = ({ socialLinks }) => (
  <div>
    {socialLinks.map((s, i) => (
      <motion.a
        key={i}
        href={s.url}
        target="_blank"
        whileHover={{ scale: 1.2 }}
        style={{ fontSize: 24, color: "#007BFF", marginRight: 12 }}
      >
        {s.icon}
      </motion.a>
    ))}
  </div>
);

export default SocialLinks;
