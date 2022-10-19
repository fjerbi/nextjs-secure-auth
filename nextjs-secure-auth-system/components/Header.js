import { motion } from "framer-motion";
import React from "react";
import { SocialIcon } from "react-social-icons";
import { HiOutlineHome, HiOutlineLogin, HiLogin } from "react-icons/hi";
import { Menu } from "antd";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

function Header() {
  const { Item, SubMenu, ItemGroup } = Menu;
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const [current, setCurrent] = useState("");
  return (
    <header >
      <motion.div
        initial={{
          x: -500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className="flex flex-row items-center justify-center"
      >
        <Menu
          selectedKeys={[current]}
          style={{ width: 315 }}
          mode="horizontal"
          theme="light"
        >
          <Item
            key="/"
            onClick={(e) => setCurrent(e.key)}
            icon={<AppstoreOutlined />}
          >
            <Link href="/">
              <a>Home</a>
            </Link>
          </Item>

          <>
            <Item
              key="/login"
              onClick={(e) => setCurrent(e.key)}
              icon={<LoginOutlined />}
            >
              <Link href="/login">
                <a>Login</a>
              </Link>
            </Item>

            <Item
              key="/register"
              onClick={(e) => setCurrent(e.key)}
              icon={<UserAddOutlined />}
            >
              <Link href="/register">
                <a>Register</a>
              </Link>
            </Item>
          </>
        </Menu>
      </motion.div>
    </header>
  );
}

export default Header;
