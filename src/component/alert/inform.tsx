import '../alert/alert.css';

import { Alert } from 'antd';
import { fromJS, is } from 'immutable';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactDOM from 'react-dom';

let defaultState = {
  alertStatus: false,
  message: '提示',
  closeAlert: function () {},
};

class Inform extends React.Component {
  state = {
    ...defaultState,
  };

  FirstChild = (props) => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
  };

  confirm = () => {
    this.setState({
      alertStatus: false,
    });
    this.state.closeAlert();
  };
  open = (options) => {
    options = options || {};
    options.alertStatus = true;
    this.setState({
      ...defaultState,
      ...options,
    });
  };
  close() {
    this.state.closeAlert();
    this.setState({
      ...defaultState,
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(nextProps)) ||
      !is(fromJS(this.state), fromJS(nextState))
    );
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        component="div"
        transitionName="hide"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}>
        <div
          className="alert-con"
          style={this.state.alertStatus ? { display: 'block' } : { display: 'none' }}>
          <div className="inform">
            <Alert
              className="informcard"
              type="success"
              message="Your operation was successful!"
              showIcon
            />
            <button onClick={this.confirm} className="confirm">
              ✖️
            </button>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

let div = document.createElement('div');
let props = {};
document.body.appendChild(div);

let Box = ReactDOM.render(React.createElement(Inform, props), div);

export default Box;
