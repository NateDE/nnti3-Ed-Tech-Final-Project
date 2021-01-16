import * as React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Form, Icon, Spin, Input, Button, notification, Col, Row } from 'antd';
import ProgressiveImage from "react-progressive-image"
import MediaQuery from 'react-responsive'

import '../../App.css'

/** Presentational */
import FormWrapper from '../../Components/Styled/FormWrapper';

/** App theme */
import { colors } from '../../Themes/Colors';

/** App constants */
import { AUTH_USER_TOKEN_KEY } from '../../Utils/constants';
import logo from '../../assets/logo.png'

class LoginContainer extends React.Component {
  state = {
    loading: false,
    confirm: false,
    email: ''
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.currentPathname = null;
    this.currentSearch = null;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        let { email, password } = values;

        this.setState({ loading: true });

        Auth.signIn(email, password)
          .then(user => {
            const { history, location } = this.props;
            const { from } = location.state || {
              from: {
                pathname: '/dashboard'
              }
            };

            history.listen((newLocation, action) => {
              if (action === "PUSH") {
                if (
                  newLocation.pathname !== this.currentPathname ||
                  newLocation.search !== this.currentSearch
                ) {
                  // Save new location
                  this.currentPathname = newLocation.pathname;
                  this.currentSearch = newLocation.search;
        
                  // Clone location object and push it to history
                  history.push({
                    pathname: newLocation.pathname,
                    search: newLocation.search
                  });
                }
              } else {
                // Send user back if they try to navigate back
                history.go(1);
              }
            });

            localStorage.setItem(AUTH_USER_TOKEN_KEY, user.signInUserSession.accessToken.jwtToken);

            notification.success({
              message: 'Succesfully logged in!',
              description: 'Logged in successfully, Redirecting you in a few!',
              placement: 'topRight',
              duration: 1.6
            });

            history.push(from);
          })
          .catch(err => {
            let m = err.message
            if (err.message === "User is not confirmed.") {
              this.setState({ email });
              this.setState({ confirm: true })
            }
            if (err.message === "Only radix 2, 4, 8, 16, 32 are supported"){
              m = "Account doesn't exist. Please register for an account."
            }
            notification.error({
              message: 'Error',
              description: m,
              placement: 'topRight',
              duration: 2.0
            });

            console.log(err);

            this.setState({ loading: false });
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    const { confirm } = this.state;


    if (confirm) {
      return <Redirect
      to={{
        pathname: '/verify-code',
        search: `?email=${this.state.email}`
      }}
    />
    } else {
      return (
          <div className="App">
            <MediaQuery maxWidth={767}>
              <br/>
              <ul className="flex-container wrap">
                <li className="flex-item">
                  <ProgressiveImage src={logo} placeholder={logo}>
                    {(src, loading) => <img src={src} alt="logo" style={{ width:"75%", marginBottom: '-10%', opacity: loading ? 0.5 : 1 }} />}
                  </ProgressiveImage>
                </li>
                <li>
                  <FormWrapper onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                      {getFieldDecorator('email', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input your email!'
                          }
                        ]
                      })(
                        <Input prefix={<Icon type="mail" style={{ color: colors.transparentBlack }} />} placeholder="Email" />
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator('password', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input your password!'
                          }
                        ]
                      })(
                        <Input
                          prefix={<Icon type="lock" style={{ color: colors.transparentBlack }} />}
                          type="password"
                          placeholder="Password"
                        />
                      )}
                    </Form.Item>
                    <Form.Item className="text-center">
                          <Link style={{ float: 'right', color: 'white', }} className="login-form-forgot" to="/forgot-password">
                            Forgot password
                          </Link>
                          <Button
                            style={{ width: '100%', fontWeight: 700 }}
                            type="secondary"
                            disabled={loading}
                            htmlType="submit"
                            className="login-form-button"
                          >
                            {loading ? <Spin indicator={<Icon type="loading" style={{ fontSize: 24, }} spin />} /> : 'Log in'}
                          </Button>
                          <Link style={{color: "white"}} to="/signup">Register!</Link>
                    </Form.Item>
                  </FormWrapper>
                </li>
              </ul>
            </MediaQuery>
            <MediaQuery minWidth={767}>
              <br/>
              <h1
                style={{
                  color: 'white',
                  fontWeight: 600,
                  textAlign: "center",
                  letterSpacing: '3px',
                  marginBottom: '-8%'
                }}>
                  <ProgressiveImage src={logo} placeholder={logo}>
                    {(src, loading) => <img src={src} alt="logo" style={{ width:"20%", opacity: loading ? 0.5 : 1 }} />}
                  </ProgressiveImage>
              </h1>

                  <FormWrapper onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                      {getFieldDecorator('email', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input your email!'
                          }
                        ]
                      })(
                        <Input prefix={<Icon type="mail" style={{ color: colors.transparentBlack }} />} placeholder="Email" />
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator('password', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input your password!'
                          }
                        ]
                      })(
                        <Input
                          prefix={<Icon type="lock" style={{ color: colors.transparentBlack }} />}
                          type="password"
                          placeholder="Password"
                        />
                      )}
                    </Form.Item>
                    <Form.Item className="text-center">
                      <Row type="flex" gutter={16}>
                        <Col lg={24}>
                          <Link style={{ float: 'right', color: 'white', }} className="login-form-forgot" to="/forgot-password">
                            Forgot password
                          </Link>
                        </Col>
                        <Col lg={24}>
                          <Button
                            style={{ width: '100%' }}
                            type="secondary"
                            disabled={loading}
                            htmlType="submit"
                            className="login-form-button"
                          >
                            {loading ? <Spin indicator={<Icon type="loading" style={{ fontSize: 24, }} spin />} /> : 'Log in'}
                          </Button>
                        </Col>
                        <Col lg={24}>
                          <Link style={{color: "white"}} to="/signup">Register!</Link>
                        </Col>
                      </Row>
                    </Form.Item>
                  </FormWrapper>
            </MediaQuery>
          </div>
      );
    }
  }
}

export default Form.create()(LoginContainer);
