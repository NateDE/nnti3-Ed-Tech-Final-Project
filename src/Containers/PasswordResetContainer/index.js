import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Form, Input, Icon, Button, notification, Popover, Spin, Row, Col } from 'antd';

/** App theme */
import { colors } from '../../Themes/Colors';
import FormWrapper from '../../Components/Styled/FormWrapper';

import '../../App.css'


class PasswordResetContainer extends React.Component {
  state = {
    confirmDirty: false,
    redirect: false,
    loading: false
  };

  handleBlur = (event) => {
    const value = event.currentTarget.value;

    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;

    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let { password, code } = values;
        let username = this.props.location.search.split('=')[1];

        Auth.forgotPasswordSubmit(username.trim(), code.trim(), password.trim())
          .then(() => {
            notification.success({
              message: 'Success!',
              description: 'Password reset successful, Redirecting you in a few!',
              placement: 'topRight',
              duration: 1.5,
              onClose: () => {
                this.setState({ redirect: true });
              }
            });
          })
          .catch(err => {
            notification['error']({
              message: 'Error reseting password',
              description: err.message,
              placement: 'topRight',
              duration: 1.5
            });

            this.setState({ loading: false });
          });

        // show loader
        this.setState({ loading: true });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { redirect, loading } = this.state;

    const title = 'Password Policy';
    const passwordPolicyContent = (
      <React.Fragment>
        <h4>Your password should contain: </h4>
        <ul>
          <li>Minimum length of 8 characters</li>
          <li>Numerical characters (0-9)</li>
          <li>Special characters</li>
          <li>Uppercase letter</li>
          <li>Lowercase letter</li>
        </ul>
      </React.Fragment>
    );

    return (
      <React.Fragment>
      <div className="App">
        <br/>
        <h1
          style={{
            color: 'white',
            fontWeight: 600,
            textAlign: "center",
            marginTop: '40px',
            letterSpacing: '3px',
          }}>
          ABU SIMBEL LIVESTREAMING
        </h1>
          
        <FormWrapper onSubmit={this.handleSubmit}>
          <div className="text-center" style={{ textAlign: "center", fontSize: "14px", fontWeight: "500"}}>
            <p>Check your email for the confirmation code</p>
          </div>
          <Form.Item>
            <Row>
              <Col lg={24}>
                {getFieldDecorator('code', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your confirmation code!'
                    }
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: colors.transparentBlack }} />}
                    placeholder="Enter your verification code"
                  />
                )}
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Popover placement="right" title={title} content={passwordPolicyContent} trigger="focus">
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: colors.transparentBlack }} />}
                  type="password"
                  placeholder="New Password"
                />
              )}
            </Popover>
          </Form.Item>

          <Form.Item>
            <Row>
              <Col lg={24}>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!'
                    },
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: colors.transparentBlack }} />}
                    type="password"
                    placeholder="Confirm Password"
                    onBlur={this.handleBlur}
                  />
                )}
              </Col>
            </Row>
          </Form.Item>

          <Form.Item className="text-center">
            <Row>
              <Col lg={24}>
                <Button style={{ width: '100%', color: "black" }} type="secondary" htmlType="submit" className="login-form-button">
                  {loading ? (
                    <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
                  ) : (
                    'Confirm username'
                  )}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </FormWrapper>
        {redirect && <Redirect to={{ pathname: '/login' }} />}
        </div>
      </React.Fragment>
      
    );
  }
}

export default Form.create()(PasswordResetContainer);
