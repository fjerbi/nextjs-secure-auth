import { motion } from "framer-motion";
import React, { useContext } from "react";
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
  UserOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function Header() {
  const { Item, SubMenu, ItemGroup } = Menu;

  const [current, setCurrent] = useState("");
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);
  const router = useRouter();

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/");
  };

  return (
    <header>
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
          {user === null && (
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
          )}

          {user !== null && (
            <>
              <SubMenu icon={<UserOutlined />} title={user && user.name}>
                <Item
                  key="/logout"
                  onClick={logout}
                  icon={<LogoutOutlined />}
                  className="float-right"
                >
                  <a>Logout</a>
                </Item>
              </SubMenu>
            </>
          )}
        </Menu>
      </motion.div>
    </header>
  );
}

export default Header;
