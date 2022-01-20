import { Alert } from 'antd';
import React from 'react';

class Success extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.status,
    };
  }
  render() {
    let status = this.state.status;
    let card;
    if (status == 'nokey') {
      card = (
        <Alert
          type="info"
          message="You would better input key word for trend!"
          showIcon
        />
      );
    }
    if (status == 'nomatch') {
      card = <Alert type="info" message="There is no data matched." showIcon />;
    }
    if (status == 'success') {
      card = <Alert type="success" message="Your operation was successful!" showIcon />;
    }
    return <div className="alertCard">{card}</div>;
  }
}

export default Success;
