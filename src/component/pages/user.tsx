import { Button, Table } from 'antd';
const { Column } = Table;
import React from 'react';
import { Link } from 'react-router-dom';

import {inform} from '../../App';
import { userSource } from '../../data';

class User extends React.Component {
  constructor(props) {
    super(props);
  }
  delete() {
    inform('One Item is deleted');
  }
  render() {
    return (
      <div className="trends index content">
        <header className="homeheader">
          <h5 className="header">Manage Users</h5>
        </header>
        <div className="PageNav">
          <Link to={'/adduser'}>
            <Button
              type="primary"
              ghost
              className="buttonRed"
              style={{ marginLeft: '30px' }}>
              Add new User
            </Button>
          </Link>
        </div>
        <div className="table table-hover">
          <Table className="table" dataSource={userSource}>
            <Column title="Username" dataIndex="username" key="username" />
            <Column title="Password" dataIndex="password" key="password" />
            <Column title="Role" dataIndex="role" key="role" />
            <Column
              title="Action"
              key="action"
              render={(item) => (
                <>
                  <Link to={`/edituser?id=${item.id}`}>Edit</Link>
                  <li></li>
                  <Button danger className="buttonRed" onClick={this.delete}>
                    Delete
                  </Button>
                </>
              )}></Column>
          </Table>
        </div>
      </div>
    );
  }
}

export default User;
