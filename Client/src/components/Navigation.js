import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Drawer, Button } from "antd";
import { MenuOutlined, LogoutOutlined } from "@ant-design/icons";
import logo from "../assets/logo/logo.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const updateLoginState = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };
    updateLoginState();
    // Update on storage change (cross-tab) and route change
    window.addEventListener('storage', updateLoginState);
    return () => {
      window.removeEventListener('storage', updateLoginState);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/signin");
  };

  const guestNavItems = [
    { key: "/", label: <Link to="/">Home</Link> },
    { key: "/about", label: <Link to="/about">About</Link> },
    { key: "/join", label: <Link to="/join">Join</Link> },
    { key: "/signin", label: <Link to="/signin">Sign In</Link> },
    { key: "/contact", label: <Link to="/contact">Contact</Link> },

  ];

  const userNavItems = [
    { key: "/", label: <Link to="/">Home</Link> },
    { key: "/about", label: <Link to="/about">About</Link> },
    { key: "/join", label: <Link to="/join">Join</Link> },
    { key: "/contact", label: <Link to="/contact">Contact</Link> },
    { key: "/emergency", label: <Link to="/emergency">Emergency Help</Link> },
    { key: "/payment", label: <Link to="/payment">Payment</Link> },
  ];

  const desktopMenuItems = isLoggedIn ? userNavItems : guestNavItems;


  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        zIndex: 1000,
        background: "#fff",
        borderBottom: "1px solid #f0f0f0",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="Logo" style={{ height: 40 }} />
      </Link>

      {/* Desktop Navigation */}
      <div className="desktop-menu" style={{ flex: 1, marginLeft: 30 }}>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={desktopMenuItems}
          style={{ borderBottom: "none" }}
        />
      </div>

      {/* Right Side (User Menu)
      {isLoggedIn && (
        <Dropdown overlay={userMenu} placement="bottomRight">
          <Space style={{ cursor: "pointer", marginLeft: 20 }}>
            <UserOutlined /> Profile
          </Space>
        </Dropdown>
      )} */}

      {/* Mobile Hamburger Button */}
      <Button
        className="mobile-menu-btn"
        icon={<MenuOutlined />}
        onClick={toggleMenu}
      // style={{ display: "none" }} Remove this inline style
      />

      {/* Drawer for Mobile */}
      <Drawer
        title={
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img
              src="/logo.png"
              alt="Sankalp Youth Organisation Logo"
              style={{ height: 32 }}
            />
            Sankalp Youth Organisation
          </span>
        }
        placement="right"
        onClose={closeMenu}
        open={isMenuOpen}
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          onClick={closeMenu}
          items={desktopMenuItems}
        />
        {isLoggedIn && (
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{ marginTop: 20 }}
            block
          >
            Logout
          </Button>
        )}
      </Drawer>

      {/* Add in your CSS file: */}
      {/* 
        @media (max-width: 900px) {
          .desktop-menu { display: none !important; }
          .mobile-menu-btn { display: inline-flex !important; }
        }
        @media (min-width: 900px) {
          .desktop-menu { display: block !important; }
          .mobile-menu-btn { display: none !important; }
        }
      */}
    </nav>
  );
};

export default Navigation;
