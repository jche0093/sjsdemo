import { Button, Form, Input } from 'antd';
import React from 'react';

import Footer from '../footer';
import { userSource } from '../../data';
import { Navigate } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.changename = this.changename.bind(this);
    this.changepass = this.changepass.bind(this);
    this.state = {
      status: false,
      username: '',
      password: '',
    };
  }
  onFinish() {
    console.log('success');
  }
  onFinishFailed() {
    console.log('fail');
  }
  changename(event) {
    this.setState({
      username: event.target.value,
    });
  }
  changepass(event) {
    this.setState({
      password: event.target.value,
    });
  }
  submit() {
    for (let i = 0; i < userSource.length; i++) {
      if (
        userSource[i].username == this.state.username &&
        userSource[i].password == this.state.password
      ) {
        this.setState({
          status: true,
        });
      }
    }
  }
  render() {
    if (this.state.status) {
      return <Navigate to={'/'} />;
    }
    return (
      <div className="loginForm" style={{ marginTop: '30vh' }}>
        <div className="Inputform">
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish.bind(this)}
            onFinishFailed={this.onFinishFailed.bind(this)}
            autoComplete="off">
            <div className="item">
              <Form.Item
                label="Username"
                name="username"
                className=" loginItem "
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}>
                <Input onChange={this.changename} />
              </Form.Item>
            </div>

            <div className="item">
              <Form.Item
                label="Password"
                name="password"
                className=" loginItem "
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}>
                <Input.Password onChange={this.changepass} />
              </Form.Item>
            </div>

            <Form.Item>
              <Button
                type="primary"
                className="loginButton"
                htmlType="submit"
                onClick={this.submit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className=" footer " style={{ width: '100%' }}>
          <Footer />
        </div>
      </div>
    );
  }
}
export default Login;
