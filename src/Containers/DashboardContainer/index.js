import * as React from 'react';
import { withRouter } from 'react-router';
import { Layout } from 'antd';
import Nav from "../../Navigation/Navbar";
import ChatBot from "./Chatbot";

/** App Theme */
import { colors } from '../../Themes/Colors';

const { Header, Content } = Layout;


const DashBoardContainer = (props) => {

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
