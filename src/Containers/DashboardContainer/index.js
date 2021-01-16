import * as React from 'react';
import { withRouter } from 'react-router';
import { Layout, Menu, Breadcrumb, Icon, notification } from 'antd';
import Nav from "../../Navigation/Navbar";
import ChatBot from "./Chatbot";

/** App Theme */
import { colors } from '../../Themes/Colors';

/** App Constatns */
import { AUTH_USER_TOKEN_KEY } from '../../Utils/constants';
import { ClickParam } from 'antd/lib/menu';
import logo from '../../assets/homeLogo2.png'

import { DashboardOutlined, AccountBookOutlined, NotificationOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;


const DashBoardContainer = (props) => {

  const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#85f8db',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor:  colors.black,
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };

  return (
    <Layout className="cover" id="app-header">
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: colors.logoColor }}>
      <Nav {...props} />
    </Header>
    <Content className="site-layout" style={{ display: 'block', alignSelf: 'center', padding: '0 50px', marginTop: 64 }}>
      <div className="site-layout-background" style={{ paddingTop: 24, minHeight: 380}}>
        <ChatBot {...props} />
      </div>
    </Content>
    <div style={{ textAlign: 'center' }}>Ed Tech ©2020 Created by Nathan N</div>

    </Layout>
  );
};

export default withRouter(DashBoardContainer);
