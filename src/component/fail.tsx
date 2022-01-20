import { Alert } from 'antd';
import React from 'react';

class Fail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.status,
    };
  }
  render() {
    let status = this.state.status;
    let card;
    if (status == 'empty') {
      card = <Alert type="warning" message="You didn't input anything!" showIcon />;
    }
    if (status == 'fail') {
      card = <Alert type="error" message="Sorry, your operation failed!" showIcon />;
    }
    return <div className="alertCard">{card}</div>;
  }
}

export default Fail;
