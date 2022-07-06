
import { useEffect } from "react";
import {
  Row,
  Col,
  Dropdown,
  Menu,
  Button
} from "antd";
import { UserOutlined } from '@ant-design/icons';
import UserModel from './../users/UserModel';
import { Auth } from 'aws-amplify';
import { MenuUnfoldOutlined, LockOutlined } from '@ant-design/icons';

function Header({onPress}) {


  useEffect(() => window.scrollTo(0, 0));

  const handleMenuClick = () => {
    Auth.signOut().then((res) => {
      window.location.reload();
    })
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<LockOutlined />} onClick={() => handleMenuClick()}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Row gutter={[24, 0]} justify="end" style={{marginRight: '0px !important'}}>
        <Col className="header-control">
          <Button
            type="link"
            className="sidebar-toggler"
            onClick={() => onPress()}
          >
            <MenuUnfoldOutlined />
          </Button>
          <Dropdown overlay={menu} trigger={["click"]} >
            <a
              href=""
              style={{ color: '#000' }}
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <UserOutlined /> &nbsp;&nbsp;{UserModel.userName}
            </a>
          </Dropdown>
        </Col>
      </Row>
    </>
  );
}

export default Header;
