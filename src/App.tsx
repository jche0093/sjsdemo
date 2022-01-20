/* eslint-disable jsx-a11y/no-onchange */
import './App.css';
import './bootstrap.css';

import { Button, Card, Form, Input, Select, Table } from 'antd';

import { tagSource, trendSource, userSource } from './data';
const { Option } = Select;
const { Column, ColumnGroup } = Table;
const { TextArea } = Input;
import './component/pages/search/home.css';

import qs from 'querystring';
import React from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';

import Alert from './component/alert/alert';
import Inform from './component/alert/inform';
import Footer from './component/footer';
import Header from './component/header';
import Login from './component/pages/login';
import User from './component/pages/user';

function App() {
  const isLogin = 'User';
  return (
    <div className="App">
      <BrowserRouter history={history}>
        <Routes>
          <Route path="/" element={<Home isLogin={isLogin} />}></Route>
          <Route path="/login" element={<Login isLogin={isLogin} />}></Route>
          <Route path="/users" element={<User isLogin={isLogin} />}></Route>
          <Route path="/showup" element={<Showup isLogin={isLogin} />}></Route>
          <Route
            path="/alltrend"
            element={<Alltrend isLogin={isLogin} data={trendSource} />}></Route>
          <Route
            path="/alltag"
            element={<Alltag isLogin={isLogin} data={tagSource} />}></Route>
          <Route path="/addtrend" element={<Addtrend isLogin={isLogin} />}></Route>
          <Route path="/addtag" element={<Addtag isLogin={isLogin} />}></Route>
          <Route path="/adduser" element={<Adduser isLogin={isLogin} />}></Route>
          <Route path="/edittag" element={<Edittag isLogin={isLogin} />}></Route>
          <Route path="/edituser" element={<Edituser isLogin={isLogin} />}></Route>
          <Route path="/edittrend" element={<Edittrend isLogin={isLogin} />}></Route>
          <Route path="/tagtrend" element={<Tagtrend isLogin={isLogin} />}></Route>
          <Route element={() => <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

//Alert 引用

function open(message, button) {
  return Alert.open({
    alertTip: message,
    alertbutton: button,
    closeAlert: function () {
      console.log('close alert');
    },
  });
}

export function inform(message) {
  return Inform.open({
    message: message,
    closeAlert: function () {
      console.log('close inform');
    },
  });
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handelSelectP = this.handelSelectP.bind(this);
    this.handelSelectS = this.handelSelectS.bind(this);
    this.state = {
      pest: '---PESTED---',
      sector: '---SECTOR---',
      search: 'Empty',
      check: false,
    };
  }
  handelChange(event, e) {
    this.setState({
      [event]: e.target.value,
    });
  }
  handelSelectP(event) {
    this.setState({
      pest: event,
    });
  }
  handelSelectS(event) {
    this.setState({
      sector: event,
    });
  }
  handelSubmit(event) {
    // 前端接口
    // let  url="http://127.0.0.1:8000/login?username=xxx&password=123456"
    //axios.get(url)
    //.then(function (response) {
    // let data =response.data
    // alert(data);
    //})
    //.catch(function (error) {
    // console.log(error);
    //});
    if (
      this.state.search == 'Empty' &&
      this.state.pest == '---PESTED---' &&
      this.state.sector == '---SECTOR---'
    ) {
      open('You would better input something, all trends will be shown.', 'Got it');
      this.setState({
        check: true,
      });
    } else {
      this.setState({
        check: true,
      });
    }
  }
  render() {
    if (this.state.check) {
      return (
        <Navigate
          to={`/showup?search=${this.state.search}&pest=${this.state.pest}&sector=${this.state.sector}`}
        />
      );
    }
    return (
      <div className="home">
        <div className="content">
          <Header />
          <div className="homeSearch">
            <header className="homeheader">
              <h1 className="header">SJS Trend Library</h1>
            </header>
            <div className="search">
              <Form className="searchForm">
                <Input
                  type="text"
                  className="search-bar"
                  required
                  placeholder="Search for trends"
                  name="search"
                  onChange={this.handelChange.bind(this, 'search')}
                />
                <Select
                  id="select-1"
                  className="select1"
                  value={this.state.pest}
                  style={{ width: '10em' }}
                  onChange={this.handelSelectP}>
                  <Option value="Political">Political</Option>
                  <Option value="Economical">Economical</Option>
                  <Option value="Social">Social</Option>
                  <Option value="Environmental">Environmental</Option>
                  <Option value="Demographic">Demographic</Option>
                  <Option value="Technological">Technological</Option>
                </Select>

                <Select
                  id="select-2"
                  className="select2"
                  style={{ width: '10em' }}
                  value={this.state.sector}
                  onChange={this.handelSelectS}>
                  <Option value="Mining">Mining</Option>
                  <Option value="Education">Education</Option>
                  <Option value="Energy">Energy</Option>
                  <Option value="Environment">Environment</Option>
                  <Option value="Agriculture">Agriculture</Option>
                  <Option value="Industry">Industry</Option>
                  <Option value="Healthcare">Healthcare</Option>
                  <Option value="Demographic">Demographic</Option>
                  <Option value="General">General</Option>
                </Select>
              </Form>
              <Button
                type="primary"
                onClick={this.handelSubmit.bind(this)}
                className="buttonSearch"
                id="button-addon2">
                Search
              </Button>
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}

// search 参数可以用这个
function getPath(url) {
  const search = qs.parse(url.slice(1));
  return search;
}

function findRelative(source, target) {
  const list = [];
  for (let i = 0; i < source.length; i++) {
    if (
      source[i].title.indexOf(target.search) != -1 ||
      source[i].summary.indexOf(target.search) != -1
    ) {
      if (source[i].tag.pest == target.pest || target.pest == '---PESTED---') {
        if (source[i].tag.sector == target.sector || target.sector == '---SECTOR---') {
          list.push({
            title: source[i].title,
            summary: source[i].summary,
            pest: source[i].tag.pest,
            sector: source[i].tag.sector,
          });
        }
      }
    }
    if (target.search == 'Empty') {
      if (source[i].tag.pest == target.pest || source[i].tag.sector == target.sector) {
        list.push({
          title: source[i].title,
          summary: source[i].summary,
          pest: source[i].tag.pest,
          sector: source[i].tag.sector,
        });
      }
    }
  }
  return list;
}

import './component/pages/search/showup.css';
class Showup extends React.Component {
  constructor(props) {
    super(props);
    const url = getPath(window.location.search);
    const relativeData = findRelative(trendSource, url);
    this.state = {
      search: url.search,
      pest: url.pest,
      sector: url.sector,
      Data: relativeData,
    };
  }

  render() {
    console.log(this.state.Data);
    return (
      <div className="showup">
        <div className="content">
          <Header />
          <div className="keycard">
            <Card
              title="Keyword"
              style={{ width: '270px', margin: '20px 50px 0' }}
              headStyle={{
                background: 'rgb(35, 136, 236)',
                color: 'white',
                fontWeight: 'bolder',
              }}>
              <p>Key Word: {this.state.search}</p>
              <p>PEST Tag: {this.state.pest}</p>
              <p>SECTOR Tag: {this.state.sector}</p>
            </Card>
          </div>
          <div className="table table-hover table-home">
            <Table className="table" dataSource={this.state.Data}>
              <Column title="Title" dataIndex="title" key="title" />
              <Column title="Summary" dataIndex="summary" key="summary" />
              <ColumnGroup title="Tag">
                <Column
                  title="PEST"
                  dataIndex="pest"
                  key="pest"
                  dataIndex="pest"
                  filters={[
                    { text: 'Social', value: 'Social' },
                    { text: 'Political', value: 'Political' },
                    { text: 'Economics', value: 'Economics' },
                    { text: 'Technological', value: 'Technological' },
                    { text: 'Environmental', value: 'Environmental' },
                    { text: 'Demographic', value: 'Demographic' },
                  ]}
                  onFilter={(value, record) => record.pest.indexOf(value) === 0}
                />
                <Column
                  title="SECTOR"
                  dataIndex="sector"
                  key="sector"
                  dataIndex="sector"
                  filters={[
                    { text: 'Agriculture', value: 'Agriculture' },
                    { text: 'Education', value: 'Education' },
                    { text: 'Energy', value: 'Energy' },
                    { text: 'Environment', value: 'Environment' },
                    { text: 'Demographic', value: 'Demographic' },
                    { text: 'General', value: 'General' },
                    { text: 'Healthcare', value: 'Healthcare' },
                    { text: 'Industry', value: 'Industry' },
                    { text: 'Mining', value: 'Mining' },
                  ]}
                  onFilter={(value, record) => record.sector.indexOf(value) === 0}
                />
              </ColumnGroup>
            </Table>
          </div>
        </div>
        <div className=" footer ">
          <Footer />
        </div>
      </div>
    );
  }
}

function update(source) {
  var updateSource = new Array();
  for (let i = 0; i < source.length; i++) {
    updateSource.push({
      id: source[i].id,
      title: source[i].title,
      summary: source[i].summary,
      pest: source[i].tag.pest,
      sector: source[i].tag.sector,
    });
  }
  return updateSource;
}

class Alltrend extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      list: props.data,
      status: props.status,
    };
    this.delete = this.delete.bind(this);
  }
  delete() {
    inform('One Item is deleted');
  }
  render() {
    console.log(window.screen.availWidth);
    // 横向显示table
    if (window.screen.availWidth <= 480) {
      return (
        <div className="trends index content">
          <header className="homeheader">
            <h5 className="header">Manage ALL Trend</h5>
          </header>
          <div className="PageNav">
            <Link to={'/addtrend'}>
              <Button type="primary" ghost className="buttonRed">
                Add new Trend
              </Button>
            </Link>
          </div>
          <div className="table table-hover table-responsive">
            <table>
              <
            </table>
            <Table dataSource={update(trendSource)} pagination={{ pageSize: 1 }}>
              <Column
                title="ID"
                key="id"
                dataIndex="id"
                sorter={(a, b) => parseInt(a.id) - parseInt(b.id)}></Column>
              <Column title="Title" key="title" dataIndex="title" />
              <Column title="Summary" key="summary" dataIndex="summary"></Column>
              <ColumnGroup title="Tag">
                <Column
                  title="PEST"
                  key="pest"
                  dataIndex="pest"
                  filters={[
                    { text: 'Social', value: 'Social' },
                    { text: 'Political', value: 'Political' },
                    { text: 'Economics', value: 'Economics' },
                    { text: 'Technological', value: 'Technological' },
                    { text: 'Environmental', value: 'Environmental' },
                    { text: 'Demographic', value: 'Demographic' },
                  ]}
                  onFilter={(value, record) => record.pest.indexOf(value) === 0}
                />
                <Column
                  title="SECTOR"
                  key="sector"
                  dataIndex="sector"
                  filters={[
                    { text: 'Agriculture', value: 'Agriculture' },
                    { text: 'Education', value: 'Education' },
                    { text: 'Energy', value: 'Energy' },
                    { text: 'Environment', value: 'Environment' },
                    { text: 'Demographic', value: 'Demographic' },
                    { text: 'General', value: 'General' },
                    { text: 'Healthcare', value: 'Healthcare' },
                    { text: 'Industry', value: 'Industry' },
                    { text: 'Mining', value: 'Mining' },
                  ]}
                  onFilter={(value, record) => record.sector.indexOf(value) === 0}
                />
              </ColumnGroup>
              <Column
                title="Action"
                key="action"
                render={(item) => (
                  <>
                    <Link to={`/edittrend?id=${item.id}`}>Edit</Link>
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
    return (
      <div className="trends index content">
        <header className="homeheader">
          <h5 className="header">Manage ALL Trend</h5>
        </header>
        <div className="PageNav">
          <Link to={'/addtrend'}>
            <Button type="primary" ghost className="buttonRed">
              Add new Trend
            </Button>
          </Link>
        </div>
        <div className="table table-hover table-responsive">
          <Table dataSource={update(trendSource)}>
            <Column
              title="ID"
              key="id"
              dataIndex="id"
              sorter={(a, b) => parseInt(a.id) - parseInt(b.id)}></Column>
            <Column title="Title" key="title" dataIndex="title" />
            <Column title="Summary" key="summary" dataIndex="summary"></Column>
            <ColumnGroup title="Tag">
              <Column
                title="PEST"
                key="pest"
                dataIndex="pest"
                filters={[
                  { text: 'Social', value: 'Social' },
                  { text: 'Political', value: 'Political' },
                  { text: 'Economics', value: 'Economics' },
                  { text: 'Technological', value: 'Technological' },
                  { text: 'Environmental', value: 'Environmental' },
                  { text: 'Demographic', value: 'Demographic' },
                ]}
                onFilter={(value, record) => record.pest.indexOf(value) === 0}
              />
              <Column
                title="SECTOR"
                key="sector"
                dataIndex="sector"
                filters={[
                  { text: 'Agriculture', value: 'Agriculture' },
                  { text: 'Education', value: 'Education' },
                  { text: 'Energy', value: 'Energy' },
                  { text: 'Environment', value: 'Environment' },
                  { text: 'Demographic', value: 'Demographic' },
                  { text: 'General', value: 'General' },
                  { text: 'Healthcare', value: 'Healthcare' },
                  { text: 'Industry', value: 'Industry' },
                  { text: 'Mining', value: 'Mining' },
                ]}
                onFilter={(value, record) => record.sector.indexOf(value) === 0}
              />
            </ColumnGroup>
            <Column
              title="Action"
              key="action"
              render={(item) => (
                <>
                  <Link to={`/edittrend?id=${item.id}`}>Edit</Link>
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

class Alltag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.data,
      status: '',
    };
    this.delete = this.delete.bind(this);
  }
  delete() {
    inform('One Item is deleted');
  }
  render() {
    return (
      <div className="tags index content">
        <header className="homeheader">
          <h5 className="header">Manage ALL Tag</h5>
        </header>
        <div className="PageNav">
          <Link to={'/addtag'}>
            <Button type="primary" ghost className="buttonRed">
              Add new Tag
            </Button>
          </Link>
        </div>
        <div className="table table-hover">
          <Table dataSource={tagSource}>
            <Column
              title="ID"
              key="id"
              dataIndex={'id'}
              sorter={(a, b) => parseInt(a.id) - parseInt(b.id)}></Column>
            <Column title="Title" key="title" render={(item) => <>{item.title}</>} />
            <Column
              title="Tag Type"
              key="fen"
              dataIndex="fen"
              filters={[
                { text: 'PESTED', value: 'PESTED' },
                { text: 'SECTOR', value: 'SECTOR' },
              ]}
              onFilter={(value, record) => record.fen.indexOf(value) === 0}></Column>
            <Column
              title="Action"
              key="action"
              render={(item) => (
                <>
                  <Link to={`/tagtrend?id=${item.id}`}>View</Link>
                  <li></li>
                  <Link to={`/edittag?id=${item.id}`}>Edit</Link>
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

class Addtrend extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      isLogin: props.isLogin,
      pest: '---PESTED---',
      sector: '---SECTOR---',
      add: false,
    };
  }
  handelSubmit() {
    const id = trendSource[trendSource.length - 1].id;
    const object = {
      id: id + 1,
      title: this.state.trend,
      summary: this.state.summary,
      tag: {
        pest: this.state.pest,
        sector: this.state.sector,
      },
    };
    trendSource.push(object);
    this.setState({ add: true });
  }
  handelChange(event, e) {
    this.setState({
      [event]: e.target.value,
    });
  }
  handelChangeP(event) {
    this.setState({
      pest: event,
    });
  }
  handelChangeS(event) {
    this.setState({
      sector: event,
    });
  }
  render() {
    if (this.state.add) {
      return <Navigate to={'/alltrend'} />;
    }

    return (
      <div>
        <div className="form">
          <header className="formheader">
            <h2 className="fheader">New Trend</h2>
          </header>
          <div className="card">
            <form className="new">
              <h5 className="formInputname">New Trend name</h5>
              <Input
                type="text"
                className="add-bar"
                id="newtrend"
                required
                placeholder="Name of new trend"
                name="newtrend"
                onChange={this.handelChange.bind(this, 'trend')}
              />
              <h5 className="formInputname">Trend Summary</h5>
              <TextArea
                className="add-bar"
                id="newtrend"
                required
                placeholder="Summary"
                name="newtrend"
                onChange={this.handelChange.bind(this, 'summary')}
              />
              <br></br>
              <h5 className="formInputname">Select Tag PESTED</h5>
              <Select
                id="select-1"
                className="pest"
                value={this.state.pest}
                onChange={this.handelChangeP.bind(this)}>
                <Option value="Political">Political</Option>
                <Option value="Economical">Economical</Option>
                <Option value="Social">Social</Option>
                <Option value="Environmental">Environmental</Option>
                <Option value="Demographic">Demographic</Option>
                <Option value="Technological">Technological</Option>
              </Select>
              <br></br>
              <h5 className="formInputname">Select Tag SECTOR</h5>
              <Select
                id="select-2"
                className="sector"
                value={this.state.sector}
                onChange={this.handelChangeS.bind(this)}>
                <Option>---SECTOR---</Option>
                <Option value="Mining" key="Mining">
                  Mining
                </Option>
                <Option value="Education" key="Education">
                  Education
                </Option>
                <Option value="Energy" key="Energy">
                  Energy
                </Option>
                <Option value="Environment" key="Environment">
                  Environment
                </Option>
                <Option value="Agriculture" key="Agriculture">
                  Agriculture
                </Option>
                <Option value="Industry" key="Industry">
                  Industry
                </Option>
                <Option value="Healthcare" key="Healthcare">
                  Healthcare
                </Option>
                <Option value="Demographic" key="Demographic">
                  Demographic
                </Option>
                <Option value="General" key="general">
                  General
                </Option>
              </Select>
              <br></br>
              <div className="clickbutton">
                <Button
                  type="primary"
                  className="buttonSearch"
                  id="button-addon2"
                  onClick={this.handelSubmit.bind(this)}>
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

class Addtag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '---Choose---',
      isLogin: props.isLogin,
      add: false,
    };
  }
  handelSubmit() {
    const id = tagSource[tagSource.length - 1].id;
    const object = {
      id: id + 1,
      title: this.state.tag,
      fen: this.state.type,
    };
    tagSource.push(object);
    this.setState({ add: true });
  }
  handelChange(event, e) {
    this.setState({
      [event]: e.target.value,
    });
  }
  handelChanges(event) {
    this.setState({
      type: event,
    });
  }
  render() {
    if (this.state.add) {
      return <Navigate to={'/alltag'} />;
    }

    return (
      <div>
        <div className="form">
          <header className="formheader">
            <h2 className="fheader">New Tag</h2>
          </header>
          <div className="card">
            <form className="new">
              <h5 className="formInputname">New Tag name</h5>
              <Input
                type="text"
                className="add-bar"
                id="newtrend"
                required
                placeholder="Name of new trend"
                name="newtrend"
                onChange={this.handelChange.bind(this, 'tag')}
              />
              <br></br>
              <h5 className="formInputname">Select Tag Type</h5>
              <Select
                className="type"
                value={this.state.type}
                onChange={this.handelChanges.bind(this)}>
                <Option value="PESTED">PESTED</Option>
                <Option value="SECTOR">SECTOR</Option>
              </Select>
              <br></br>
              <div className="clickbutton">
                <Button
                  type="primary"
                  className="buttonSearch"
                  id="button-addon2"
                  onClick={this.handelSubmit.bind(this)}>
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

class Adduser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '--Type--',
    };
  }
  handelChangeu() {}
  handelChangep() {}
  handelChange() {}
  handelSubmit() {}
  render() {
    return (
      <div>
        <div className="form">
          <header className="formheader">
            <h2 className="fheader">New User</h2>
          </header>
          <div className="card">
            <form className="new">
              <h5 className="formInputname">Username</h5>
              <Input
                type="text"
                className="add-bar"
                id="username"
                required
                placeholder="Username"
                name="username"
                onChange={this.handelChangeu.bind(this, 'username')}
              />
              <br></br>
              <h5 className="formInputname">Password</h5>
              <Input
                type="text"
                className="add-bar"
                id="password"
                required
                placeholder="Password"
                name="password"
                onChange={this.handelChangep.bind(this, 'password')}
              />
              <br></br>
              <h5 className="formInputname">Select Role</h5>
              <Select
                className="type"
                value={this.state.type}
                onChange={this.handelChange.bind(this)}>
                <Option value="Admin">Admin</Option>
                <Option value="User">User</Option>
              </Select>
              <br></br>
              <div className="clickbutton">
                <Button
                  type="primary"
                  className="buttonSearch"
                  id="button-addon2"
                  onClick={this.handelSubmit.bind(this)}>
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function findTarget(source, num) {
  for (let i = 0; i < source.length; i++) {
    if (source[i].id == num) {
      return source[i];
    }
  }
}

class Edittag extends React.Component {
  constructor(props) {
    super(props);
    let url = getPath(window.location.search);
    let object = findTarget(tagSource, url.id);
    this.state = {
      object: object,
    };
  }
  handelChange() {}
  handelChangeS() {}
  handelSubmit() {}
  render() {
    return (
      <div>
        <div className="row">
          <header className="formheader">
            <h2 className="fheader">Edit Tag</h2>
          </header>
          <div className="card">
            <form className="new">
              <h5 className="formInputname">Tag</h5>
              <Input
                type="text"
                className="add-bar"
                id="newtrend"
                required
                placeholder="Name of new trend"
                name="newtrend"
                value={this.state.object.title}
                onChange={this.handelChange.bind(this, 'trend')}
              />
              <br></br>
              <h5 className="formInputname">Tag Type</h5>
              <Select
                className="type"
                value={this.state.object.fen}
                onChange={this.handelChangeS.bind(this)}>
                <Option value="PESTED">PESTED</Option>
                <Option value="SECTOR">SECTOR</Option>
              </Select>
              <br></br>
              <div className="clickbutton">
                <Button
                  type="primary"
                  className="buttonSearch"
                  id="button-addon2"
                  onClick={this.handelSubmit.bind(this)}>
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

class Edittrend extends React.Component {
  constructor(props) {
    super(props);
    let url = getPath(window.location.search);
    let object = findTarget(trendSource, url.id);
    console.log(object);
    this.state = {
      object: object,
    };
  }
  handelChange() {}
  handelChangeP() {}
  handelChangeS() {}
  handelSubmit() {}
  render() {
    return (
      <div>
        <div className="form">
          <header className="formheader">
            <h2 className="fheader">New Trend</h2>
          </header>
          <div className="card">
            <form className="new">
              <h5 className="formInputname">New Trend name</h5>
              <Input
                type="text"
                className="add-bar"
                id="newtrend"
                required
                value={this.state.object.title}
                placeholder="Name of new trend"
                name="newtrend"
                onChange={this.handelChange.bind(this, 'trend')}
              />
              <h5 className="formInputname">Trend Summary</h5>
              <TextArea
                className="add-bar"
                id="newtrend"
                required
                placeholder="Summary"
                name="newtrend"
                value={this.state.object.summary}
                onChange={this.handelChange.bind(this, 'summary')}
              />
              <br></br>
              <h5 className="formInputname">Select Tag PESTED</h5>
              <Select
                id="select-1"
                className="pest"
                value={this.state.object.tag.pest}
                onChange={this.handelChangeP.bind(this)}>
                <Option value="Political">Political</Option>
                <Option value="Economical">Economical</Option>
                <Option value="Social">Social</Option>
                <Option value="Environmental">Environmental</Option>
                <Option value="Demographic">Demographic</Option>
                <Option value="Technological">Technological</Option>
              </Select>
              <br></br>
              <h5 className="formInputname">Select Tag SECTOR</h5>
              <Select
                id="select-2"
                className="sector"
                value={this.state.object.tag.sector}
                onChange={this.handelChangeS.bind(this)}>
                <Option>---SECTOR---</Option>
                <Option value="Mining">Mining</Option>
                <Option value="Education">Education</Option>
                <Option value="Energy">Energy</Option>
                <Option value="Environment">Environment</Option>
                <Option value="Agriculture">Agriculture</Option>
                <Option value="Industry">Industry</Option>
                <Option value="Healthcare">Healthcare</Option>
                <Option value="Demographic">Demographic</Option>
                <Option value="General">General</Option>
              </Select>
              <br></br>
              <div className="clickbutton">
                <Button
                  type="primary"
                  className="buttonSearch"
                  id="button-addon2"
                  onClick={this.handelSubmit.bind(this)}>
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

class Edituser extends React.Component {
  constructor(props) {
    super(props);
    let url = getPath(window.location.search);
    let object = findTarget(userSource, url.id);
    console.log(object);
    this.state = {
      object: object,
    };
  }
  handelChangeu() {}
  handelChangep() {}
  handelChange() {}
  handelSubmit() {}
  render() {
    return (
      <div>
        <div className="form">
          <header className="formheader">
            <h2 className="fheader">Edit User</h2>
          </header>
          <div className="card">
            <form className="new">
              <h5 className="formInputname">Username</h5>
              <Input
                type="text"
                className="add-bar"
                id="username"
                required
                placeholder="Username"
                name="username"
                value={this.state.object.username}
                onChange={this.handelChangeu.bind(this, 'username')}
              />
              <br></br>
              <h5 className="formInputname">Password</h5>
              <Input
                type="text"
                className="add-bar"
                id="password"
                required
                placeholder="Password"
                name="password"
                value={this.state.object.password}
                onChange={this.handelChangep.bind(this, 'password')}
              />
              <br></br>
              <h5 className="formInputname">Select Role</h5>
              <Select
                className="type"
                value={this.state.object.role}
                onChange={this.handelChange.bind(this)}>
                <Option value="Admin">Admin</Option>
                <Option value="User">User</Option>
              </Select>
              <br></br>
              <div className="clickbutton">
                <Button
                  type="primary"
                  className="buttonSearch"
                  id="button-addon2"
                  onClick={this.handelSubmit.bind(this)}>
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function find(state, source) {
  let object = [];
  for (let i = 0; i < source.length; i++) {
    if (state.type == 'Pest') {
      if (source[i].tag.pest == state.title) {
        object.push(source[i]);
      }
    }
    if (state.type == 'Sector') {
      if (source[i].tag.sector == state.title) {
        object.push(source[i]);
      }
    }
  }
  return object;
}

class Tagtrend extends React.Component {
  constructor(props) {
    super(props);
    let url = getPath(window.location.search);
    let object = findTarget(tagSource, url.id);
    this.state = {
      title: object.title,
      type: object.fen,
    };
  }

  render() {
    const targetSource = find(this.state, trendSource);
    return (
      <div className="trends index content">
        <header className="homeheader">
          <h5 className="header">Related Trend</h5>
        </header>
        <Card
          title="Tag Informstion"
          style={{ width: '270px', margin: '35px' }}
          headStyle={{
            background: 'rgb(35, 136, 236)',
            color: 'white',
            fontWeight: 'bolder',
          }}>
          <p>Title: {this.state.title}</p>
          <p>Type: {this.state.type}</p>
        </Card>
        <div className="table table-hover">
          <Table dataSource={targetSource}>
            <Column title="ID" key="id" render={(item) => <>{item.id}</>}></Column>
            <Column title="Title" key="title" render={(item) => <>{item.title}</>} />
            <Column
              title="Summary"
              key="summary"
              render={(item) => <>{item.summary}</>}></Column>
            <Column
              title="Action"
              key="action"
              render={(item) => (
                <>
                  <Link to={`/edittrend?id=${item.id}`}>Edit</Link>
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
export { App };
