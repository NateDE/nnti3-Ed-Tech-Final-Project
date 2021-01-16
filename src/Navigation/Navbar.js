import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Menu, notification } from 'antd';

/** App Constatns */
import { AUTH_USER_TOKEN_KEY } from '../Utils/constants';
import logo from '../assets/homeLogo2.png'

const Navbar = (props) => {
    let [isAuthenticated, setIsAuthenticated] = useState(false);
  
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
  
    useEffect(() => {
        Auth.currentAuthenticatedUser({bypassCache: true}).then((user) => {
          //console.log(user);
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
                    <img style={{width: '40%'}} src={logo} alt="logo" />
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