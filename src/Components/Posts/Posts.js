import React, { Component } from 'react';
import axios from 'axios'
import { message, Table } from 'antd'


const columns = [
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: 'Title',
    dataIndex: 'title'
  },
  {
    title: 'body',
    dataIndex: 'body'
  }
]

class Posts extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    const header = {
      Authorization: "Bearer " + window.localStorage.getItem('zeliot-token')
    }

    axios.get('http://172.28.74.144:3000/posts', { headers: header })
      .then(res => {
        console.log(res)
        this.setState({
          posts: res.data.data.posts
        })
      })
      .catch(err => {
        message.error('Error fetching posts')
        console.error(err)
      })
  }

  logout = () => {
    window.localStorage.removeItem('zeliot-token')
    window.localStorage.removeItem('zeliot-auth')
    this.props.history.push('/login')
  }

  render() {
    return (
      <div>
        <div>
          <center><h1>Posts</h1></center>
          <Table
            columns={columns}
            rowKey={record => record.id}
            dataSource={this.state.posts}
          />
        </div>
        <div>
          <button onClick={this.logout}>Logout</button>
        </div>
      </div>
    );
  };
}

export default Posts;