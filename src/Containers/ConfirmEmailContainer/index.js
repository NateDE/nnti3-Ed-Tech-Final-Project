import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { Spin, Icon, Button, Form, notification, Input, Col } from 'antd';

import '../../App.css'

// amplify
import { Auth } from 'aws-amplify';

/** Presentational */
import FullWidthWrapper from '../../Components/Styled/FullWidthWrapper';
import EmailConfirmFormWrapper from '../../Components/Styled/EmailConfirmFormWrapper';

/** App theme */
//import {colors} from '../../Themes/Colors'

class ConfirmEmailContainer extends React.Component {
  state = {
    username: '',
    loading: false,
    redirect: false,
    confirmationCode: '',
    error: ''
  };

  componentDidMount() {
    if (this.props.location.search) {
      // get username from url params
      let username = this.props.location.search.split('=')[1];

      this.setState({ username });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { confirmationCode } = this.state;

    // show progress spinner
    this.setState({ loading: true });

    Auth.confirmSignUp(this.state.username, confirmationCode)
      .then(() => {
        this.handleOpenNotification('success', 'Succesfully confirmed!', 'You will be redirected to login in a few!');
      })
      .catch(err => {
        this.handleOpenNotification('error', 'Invalid code', err.message);
        this.setState({
          loading: false
        });
      });
  };

  
  handleOpenNotification = (type, title, message) => {
    switch (type) {
      case 'success':
        notification['success']({
          message: title,
          description: message,
          placement: 'topRight',
          duration: 1.5,
          onClose: () => {
            this.setState({ redirect: true });
          }
        });
        break;

      case 'error':
        notification['error']({
          message: title,
          description: message,
          placement: 'topRight',
          duration: 1.5
        });
        break;
      default:
        //do nothing
    }
  };

  handleOnPaste = (event) => {
    event.preventDefault();

    let code = event.clipboardData.getData('Text').trim();

    /** Update input */
    this.setState({ confirmationCode: code });

    // regex to check if string is numbers only
    const reg = new RegExp('^[0-9]+$');

    if (reg.test(code) && code.length === 6) {
      // code is a valid number

      this.setState({ loading: true });

      Auth.confirmSignUp(this.state.username, code)
        .then(() => {
          this.handleOpenNotification('success', 'Succesfully confirmed!', 'You will be redirected to login in a few!');
        })
        .catch(err => {
          this.handleOpenNotification('error', 'Invalid code', err.message);
          this.setState({
            loading: false
          });
        });
    }
  };

  handleChange = (event) => {
    this.setState({ confirmationCode: event.currentTarget.value });
  };

  render() {
    const { loading, error, confirmationCode, redirect } = this.state;

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

      <FullWidthWrapper align="center">
        <EmailConfirmFormWrapper onSubmit={this.handleSubmit}>
          <Col md={24} lg={18}>
            <div className="full-width">
              <h2>Check your email</h2>
              <p>We've sent a six­ digit confirmation code</p>
            </div>
            <Form.Item validateStatus={error && 'error'} help={error} label="Confirmation Code"> 
              <Input
                size="large"
                type="number"
                placeholder="Enter confirmation code"
                onChange={this.handleChange}
                onPaste={this.handleOnPaste}
                value={confirmationCode}
              />
            </Form.Item>
          </Col>
          <Col md={24} lg={12}>
            <Button type="secondary" style={{color: "black"}} disabled={loading} htmlType="submit" size="large">
              {loading ? <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} /> : 'Confirm Email'}
            </Button>
          </Col>
        </EmailConfirmFormWrapper>
        {redirect && <Redirect to={{ pathname: '/login' }} />}
      </FullWidthWrapper>
      </div>
    );
  }
}

export default ConfirmEmailContainer;
