import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Form, Icon, Spin, Input, Button, notification, Row, Col } from 'antd';

import '../../App.css'

/** Presentational */
import FormWrapper from '../../Components/Styled/FormWrapper';

/** App theme */
import { colors } from '../../Themes/Colors';


class ForgotPasswordContainer extends React.Component {
  state = {
    email: '',
    redirect: false,
    loading: false
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        let { email } = values;

        this.setState({
          loading: true,
          email
        });

        Auth.forgotPassword(email)
          .then(data => {
            notification.success({
              message: 'Redirecting you in a few!',
              description: 'Account confirmed successfully!',
              placement: 'topRight',
              duration: 1.5,
              onClose: () => {
                this.setState({ redirect: true });
              }
            });
          })
          .catch(err => {
            notification.error({
              message: 'User confirmation failed',
              description: err.message,
              placement: 'topRight',
              duration: 1.5
            });
            this.setState({ loading: false });
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, redirect, email } = this.state;

    return (
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
          <Form.Item className="text-center">
            <Row>
              <Col lg={24}>
                <Button style={{ width: '100%', color: "black" }} type="secondary" htmlType="submit" className="login-form-button">
                  {loading ? (
                    <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
                  ) : (
                    'Confirm email'
                  )}
                </Button>
              </Col>
              <Col lg={24}>
                <Link style={{color: "white"}} to="/login">Ooh! Wait! I've remembered!</Link>
              </Col>
            </Row>
          </Form.Item>
        </FormWrapper>
        {redirect && (
          <Redirect
            to={{
              pathname: '/reset-password',
              search: `?email=${email}`
            }}
          />
        )}
      </div>
    );
  }
}

export default Form.create()(ForgotPasswordContainer);
