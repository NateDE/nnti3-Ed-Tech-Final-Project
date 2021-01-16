import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { RouteComponentProps, withRouter } from 'react-router';
import { Layout, Menu, Breadcrumb, Icon, notification } from 'antd';
import { ThemeProvider } from 'styled-components';

import { useMediaQuery } from 'react-responsive'

import { Link } from "react-router-dom";

/** App Theme */
import { colors } from '../Themes/Colors';

/** App Constatns */
import { AUTH_USER_TOKEN_KEY } from '../Utils/constants';
import { ClickParam } from 'antd/lib/menu';
import logo from '../assets/homeLogo2.png'
import ChatBot from 'react-simple-chatbot';

import { DashboardOutlined, AccountBookOutlined, NotificationOutlined } from '@ant-design/icons';

const Navbar = (props) => {
    let [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cognitoID, setCognitoID] = useState("")
    const [collapsed, setCollapsed] = React.useState(false);
    const [subscriber, setSubscriber] = useState() 
  
    const toggleCollapsed = () => {
      setCollapsed(!collapsed)
    }
  
    const handleLogout = async (event) => {
      const { history } = props;
      try {
        await Auth.signOut({ global: true }).then(() => {
          localStorage.removeItem(AUTH_USER_TOKEN_KEY);
          history.push("/login");
        });
      } catch (err) {
        setIsAuthenticated(true);
        notification.error({ message: err.message });
      }
    };
  
    let [username, setUserName] = useState("");

    useEffect(() => {
        Auth.currentAuthenticatedUser({bypassCache: true}).then((user) => {
          //console.log(user);
          setCognitoID(user.username);
          setUserName(user.attributes.name);
        })
        .catch((error) => {
            setIsAuthenticated(true)
            console.log (error)
        });
    });
    if (isAuthenticated){
        return <Redirect
        to={{
          pathname: '/login',
        }}
      />
    } else {
        return (
            <div className="cover">
                <div className="logo" />
                <Menu 
                theme="dark" 
                mode="horizontal" 
                defaultSelectedKeys={['1']}
                style={{
                    overflow: 'hidden',
                    width: 'inherit',
                    display: "flex",
                    paddingLeft: "20px",
                    backgroundColor: "inherit",
                }}      
                >
                <Menu.Item 
                    style={{float: "left", backgroundColor: 'inherit'}}
                >
                    <img style={{width: '40%'}} src={logo} />
                </Menu.Item>
                
                <Menu.Item 
                    key="1"
                    style={{float: "right", backgroundColor: 'inherit'}}
                >
                    ChatBot
                </Menu.Item>
                <Menu.Item 
                    style={{float: "right", backgroundColor: 'inherit'}} 
                    onClick={(event) => handleLogout(event)}
                >
                    Logout
                </Menu.Item>
                </Menu>
            </div>
        );
    }
};

export default Navbar;