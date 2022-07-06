import React, { useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Drawer } from "antd";
import Sidenav from "./Sidenav";
import Header from './Header';
import PrivateRoute from "../ProtectedRoute";
import { Route, Routes } from 'react-router-dom';
import CreateHookForm from "./../property/Create_hook_form";
const Dropdowns = React.lazy(() => import('./../Dropdowns'));
const Specifications = React.lazy(() => import('./../Specifications'));
const Amenities = React.lazy(() => import('./../Amenities'));
const Configurations = React.lazy(() => import('./../Configuration'));
const Property = React.lazy(() => import('./../property'));
// const CreateHookForm = React.lazy(() => import('./../property/Create_hook_form'));
const Users = React.lazy(() => import('./../users/Users'));


const { Header: AntHeader, Content, Sider } = Layout;

function Main() {
  const [visible, setVisible] = useState(false);
  const [sidenavType, setSidenavType] = useState("transparent");
  const openDrawer = () => setVisible(!visible);
  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  useEffect(() => {
  }, [pathname]);

  return (
    <Layout
      className="layout-dashboard layout-profile">
      <Drawer
        title={false}
        placement={"left"}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key={"left"}
        width={250}
        className={`drawer-sidebar`}
      >
        <Layout
          className={`layout-dashboard`}
        >
          <Sider
            trigger={null}
            width={250}
            theme="light"
          >
            <Sidenav />
          </Sider>
        </Layout>
      </Drawer>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={250}
        theme="light"
        className={`sider-primary ant-layout-sider-primary ${sidenavType === "#fff" ? "active-route" : ""
          }`}
        style={{ background: sidenavType }}
      >
        <Sidenav />
      </Sider>
      <Layout>
        <AntHeader>
          <Header onPress={openDrawer}
            className="site-layout-sub-header-background" style={{ padding: 0 }}
          />
        </AntHeader>
        <Content className="content-ant">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route exact path="/" element={<PrivateRoute roles={['Admin', 'Editor']}><Dropdowns /></PrivateRoute>} />
              <Route path="configurations" element={<PrivateRoute roles={['Admin', 'Editor']}><Configurations /></PrivateRoute>} />
              <Route path="specifications" element={<PrivateRoute roles={['Admin', 'Editor']}><Specifications /></PrivateRoute>} />
              <Route path="amenities" element={<PrivateRoute roles={['Admin', 'Editor']}><Amenities /></PrivateRoute>} />
              <Route path="dropdowns" element={<PrivateRoute roles={['Admin', 'Editor']}><Dropdowns /></PrivateRoute>} />
              <Route path="property" element={<PrivateRoute roles={['Admin', 'Editor']}><Property /></PrivateRoute>} />
              <Route path="users" element={<PrivateRoute roles={['Admin']}><Users /></PrivateRoute>} />
              <Route path="createProperty" element={<PrivateRoute roles={['Admin', 'Editor']}><CreateHookForm /></PrivateRoute>} />
              <Route path="createProperty/:id" element={<PrivateRoute roles={['Admin', 'Editor']}><CreateHookForm /></PrivateRoute>} />
            </Routes>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Main;
