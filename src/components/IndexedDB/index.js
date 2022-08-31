/* eslint-disable jsx-a11y/anchor-is-valid */
import '../../App.css';
import React, { Component } from 'react'
import {
  Space,
  Table,
  Popconfirm,
  Button,
  Input,
  Divider,
  Form,
  Drawer,
  message,
} from 'antd'

import {
  openDB,
  addData,
  cursorGetData,
  updateDB,
  deleteDB,
  cursorGetDataByIndex,
} from '../../utils'
class CRUDDemo extends Component {
  formRef = React.createRef() //清空输入框内容
  formRef1 = React.createRef()
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      visible1: false,
      rowid: null,
      exitData: null,
      columns: [
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '性别', dataIndex: 'sex', key: 'sex' },
        { title: '年龄', dataIndex: 'age', key: 'age' },
        { title: '家庭住址', dataIndex: 'address', key: 'address' },
        { title: '联系电话', dataIndex: 'phone', key: 'phone' },
        {
          title: '操作',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <a
                className="action-link"
                onClick={this.showDrawer1.bind(this, record)}
              >
                修改
              </a>
              <Popconfirm
                title="确定要删除吗?"
                onConfirm={this.deleteData.bind(this, record.id)}
                onCancel={this.onClose.bind(this)}
                okText="确定"
                cancelText="取消"
              >
                <a
                  className="action-link"
                  style={{ color: record.obsoleted ? '#1890ff' : '#fa8c16' }}
                >
                  删除
                </a>
              </Popconfirm>
            </Space>
          ),
        },
      ],
      data: [], //储存axios获取到的数据
      db: null,
    }
  }

  //关闭新增信息对话框
  onClose = () => {
    this.setState({
      visible: false,
    })
  }
  //关闭修改信息对话框
  onClose1 = () => {
    this.setState({
      visible1: false,
    })
  }
  //显示新增信息抽屉
  showDrawer = () => {
    this.setState({
      visible: true,
    })
  }
  //显示修改信息抽屉
  showDrawer1 = (r) => {
    this.setState({
      visible1: true,
      rowid: r.id,
    })
    setTimeout(() => {
      this.formRef1.current.setFieldsValue(r)
    }, 0)
  } //设置 0 毫秒延迟回显数据

  //将数据显示在初始页面
  componentDidMount() {
    openDB('demoDhh', '1').then((res) => {
      console.log(res)
      this.setState({
        db: res,
      })
      this.readData()
    })
  }

  //实现读取数据
  readData() {
    cursorGetData(this.state.db, 'user', 1, 10).then((res) => {
      console.log(res)
      this.setState({
        data: res,
      })
    })
  }

  //新增信息时的Input输入框事件
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }
  //修改信息时的Input输入框事件
  handleChange1 = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  //新增、修改数据时提交失败时的提示信息
  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
    message.error('按照格式要求输入')
  }

  postData = () => {
    addData(this.state.db, 'user', {
      name: this.state.name,
      age: this.state.age,
      sex: this.state.sex,
      address: this.state.address,
      phone: this.state.phone,
    }).then((res) => {
      if (res.success) {
        message.success('添加成功')
        // console.log('添加成功')
        this.readData()
        this.setState({
          visible: false,
        })
      } else {
        message.error('添加失败')
      }
    })
    this.formRef.current.resetFields() //新增成功后清空输入框中的数据，避免下次点击新增时出现上次输入的数据
  }

  // // 实现删除
  deleteData = (id) => {
    deleteDB(this.state.db, 'user', id).then((res) => {
      if (res.success) {
        message.success('删除成功')
        this.readData()
      } else {
        message.error('删除失败')
      }
    })
  }

  //实现按照姓名查询数据
  queryfn = (e) => {
    let keyword = e.target.value
    clearTimeout(window.timer) //防抖查询
    window.timer = setTimeout(() => {
      if (keyword) {
        cursorGetDataByIndex(this.state.db, 'user', 'name', keyword).then(
          (res) => {
            this.setState({
              data: res,
            })
          }
        )
      } else {
        this.readData()
      }
    }, 500)
  }

  //实现修改数据——put或patch
  updateData = () => {
    const data = this.formRef1.current.getFieldsValue()
    updateDB(this.state.db, 'user', {
      id: this.state.rowid,
      ...data
    }).then((res) => {
      if (res.success) {
        message.success('修改成功')
        this.readData()
        this.setState({
          visible1: false,
        })
        this.formRef1.current.resetFields() //修改成功后清空输入框中的数据
      } else {
        message.error('修改失败')
      }
    })
  }

  render() {
    let data = this.state.data
    let columns = this.state.columns
    let { name, age, sex, address, phone } = this.state
    return (
      <div className="App">
        <Button type="primary" style={{ float: 'right'}} onClick={this.showDrawer.bind(this)}>
          添加信息{' '}
        </Button>
        <Input
          placeholder="请根据姓名查找信息"
          style={{ marginLeft: '10px', width: '20%' }}
          onInput={this.queryfn}
        />
        <Divider plain>人员信息表格</Divider>
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.id}
        >
          {' '}
        </Table>

        <Drawer
          title="添加个人信息"
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Form
            ref={this.formRef}
            onFinish={this.postData}
            onFinishFailed={this.onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="name"
              label="姓名"
              rules={[{ required: true, message: '请输入您的姓名' }]}
            >
              <Input
                placeholder="请输入您的姓名"
                id="name"
                value={name}
                onChange={this.handleChange}
                pattern="[\u4e00-\u9fa5]{2,6}$"
                title="输入2-6位中文汉字"
              />
            </Form.Item>
            <Form.Item
              name="sex"
              label="性别"
              rules={[{ required: true, message: '请输入您的性别' }]}
            >
              <Input
                placeholder="请输入您的性别"
                id="sex"
                value={sex}
                onChange={this.handleChange}
                pattern="^[男|女]{1}$"
                title="输入男或女"
              />
            </Form.Item>
            <Form.Item
              name="age"
              label="年龄"
              rules={[{ required: true, message: '请输入您的年龄' }]}
            >
              <Input
                placeholder="请输入您的年龄"
                id="age"
                value={age}
                onChange={this.handleChange}
                pattern="^(?:[1-9][0-9]?|1[01][0-9]|120)$"
                title="输入1-120之间的数字"
              />
            </Form.Item>
            <Form.Item
              name="address"
              label="家庭住址"
              rules={[{ required: true, message: '请输入您的家庭住址' }]}
            >
              <Input
                placeholder="请输入您的家庭住址"
                id="address"
                value={address}
                onChange={this.handleChange}
                pattern="[\u4e00-\u9fa5]{1,100}$"
                title="输入有效中文汉字"
              />
            </Form.Item>
            <Form.Item
              name="phone"
              label="联系电话"
              rules={[{ required: true, message: '请输入您的联系电话' }]}
            >
              <Input
                placeholder="请输入11位联系电话"
                id="phone"
                value={phone}
                onChange={this.handleChange}
                pattern="^1[0-9]{10}$"
                title="输入1开头的11位有效手机号"
              />
            </Form.Item>
            <Button onClick={this.onClose.bind(this)}>取消</Button>
            <Button htmlType="submit" type="primary">
              完成{' '}
            </Button>
          </Form>
        </Drawer>

        <Drawer
          title="修改个人信息"
          onClose={this.onClose1}
          visible={this.state.visible1}
        >
          <Form
            ref={this.formRef1}
            onFinish={this.updateData}
            onFinishFailed={this.onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="name"
              label="姓名"
              rules={[{ required: true, message: '请输入您的姓名' }]}
            >
              <Input
                placeholder="请输入您的姓名"
                id="name"
                value={name}
                onChange={this.handleChange1}
                pattern="[\u4e00-\u9fa5]{2,6}$"
                title="输入2-6位中文汉字"
              />
            </Form.Item>
            <Form.Item
              name="sex"
              label="性别"
              rules={[{ required: true, message: '请输入您的性别' }]}
            >
              <Input
                placeholder="请输入您的性别"
                id="sex"
                value={sex}
                onChange={this.handleChange1}
                pattern="^[男|女]{1}$"
                title="输入男或女"
              />
            </Form.Item>
            <Form.Item
              name="age"
              label="年龄"
              rules={[{ required: true, message: '请输入您的年龄' }]}
            >
              <Input
                placeholder="请输入您的年龄"
                id="age"
                value={age}
                onChange={this.handleChange1}
                pattern="^(?:[1-9][0-9]?|1[01][0-9]|120)$"
                title="输入1-120之间的数字"
              />
            </Form.Item>
            <Form.Item
              name="address"
              label="家庭住址"
              rules={[{ required: true, message: '请输入您的家庭住址' }]}
            >
              <Input
                placeholder="请输入您的家庭住址"
                id="address"
                onChange={this.handleChange1}
                pattern="[\u4e00-\u9fa5]{1,100}$"
                title="输入有效中文汉字"
              />
            </Form.Item>
            <Form.Item
              name="phone"
              label="联系电话"
              rules={[{ required: true, message: '请输入您的联系电话' }]}
            >
              <Input
                placeholder="请输入11位联系电话"
                id="phone"
                value={phone}
                onChange={this.handleChange1}
                pattern="^1[0-9]{10}$"
                title="输入1开头的11位有效手机号"
              />
            </Form.Item>
            <Button onClick={this.onClose1.bind(this)}>取消</Button>
            <Button htmlType="submit" type="primary">
              完成{' '}
            </Button>
          </Form>
        </Drawer>
      </div>
    )
  }
}
export default CRUDDemo
