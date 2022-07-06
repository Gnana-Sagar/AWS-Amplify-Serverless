import React from 'react';
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import { EditOutlined, UsergroupAddOutlined, AppstoreOutlined, OrderedListOutlined, LayoutOutlined, DatabaseOutlined } from '@ant-design/icons';
import UserModel from './../users/UserModel';

function Sidenav() {
  return (
    <div style={{ minHeight: '100vh', height: '100%', backgroundColor: '#fff' }}>
      <div style={{ backgroundColor: '#fff', textAlign: 'center' }}>
        <h5>Logo</h5>
      </div>
      <Menu theme="light" mode="inline">
        <Menu.Item className="menu-item-header" key="8" disabled>
          Navigations
        </Menu.Item>
        <Menu.Item key="1" icon={<LayoutOutlined />}>
          <NavLink to="/dropdowns">
            <span className="label">MenuBars</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<DatabaseOutlined />}>
          <NavLink to="/configurations" >
            <span className="label">Configurations</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3" icon={<OrderedListOutlined />}>
          <NavLink to="/specifications">
            <span className="label">Specifications</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4" icon={<AppstoreOutlined />}>
          <NavLink to="/amenities">
            <span className="label">Amenities</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="6" icon={<EditOutlined />}>
          <NavLink to="/property">
            <span className="label">Property</span>
          </NavLink>
        </Menu.Item>
        {
          UserModel.roles.includes('Admin') && <Menu.Item key="7" icon={<UsergroupAddOutlined />}>
            <NavLink to="/users">
              <span className="label">Users</span>
            </NavLink>
          </Menu.Item>
        }
      </Menu>
    </div>
  );
}

export default Sidenav;
