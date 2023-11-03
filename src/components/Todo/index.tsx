import React, { useState } from 'react'
import './index.scss'
import Card from '../Card'
import { Input, Modal, Row, Col, Form, Button, FloatButton } from 'antd'
import { AppstoreAddOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'
import { v4 as uuidv4 } from 'uuid';
const { Search } = Input

export interface TodoProps {
  id?: string
  title: string
  content: string
  handlePressDeleteButton?: (id: string) => void
  handlePressEditButton?: (id: string) => void
}

function Todo() {
  const [todoList, setTodoList] = useState<TodoProps[]>([])
  const [fullTodoList, setFullTodoList] = useState<TodoProps[]>([])
  const [shouldAddModalOpen, setShouldAddModalOpen] = useState<boolean | undefined>(false)
  const [shouldDeleteModalOpen, setShouldDeleteModalOpen] = useState<boolean | undefined>(false)
  const [shouldEditModalOpen, setShouldEditModalOpen] = useState<boolean | undefined>(false)
  const [selectDeleteID, setSelectDeleteID] = useState<string>()
  const [selectEditID, setSelectEditID] = useState<string>()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    val === '' ? setTodoList(fullTodoList) : setTodoList(fullTodoList.filter(e => e.title.toLowerCase().includes(val.toLowerCase())))
  }

  const handleAddTodo = ({ title, content }: TodoProps) => {
    const uniqueId = uuidv4();
    setTodoList(p => [...p, { id: String(uniqueId), title, content }])
    setFullTodoList(p => [...p, { id: String(uniqueId), title, content }])
    setShouldAddModalOpen(false)
  }

  const handlePressDeleteButton = (id: string) => {
    setSelectDeleteID(id)
    setShouldDeleteModalOpen(true)
  }

  const handleDeleteTodo = () => {
    setTodoList(
      todoList.filter(e => e.id !== selectDeleteID)
    )

    setFullTodoList(
      todoList.filter(e => e.id !== selectDeleteID)
    )

    setSelectEditID('')

    setShouldDeleteModalOpen(false)
  }

  const handlePressEditButton = (id: string) => {
    setSelectEditID(id)
    setShouldEditModalOpen(true)
  }

  const handleEditTodo = ({ title, content }: TodoProps) => {
    const updateTitle = title ? title : fullTodoList.find(e => e.id === selectEditID)!.title
    const updateContent = content ? content : fullTodoList.find(e => e.id === selectEditID)!.content

    const updatedArr = fullTodoList.map((e) =>
      e.id === selectEditID
        ? { ...e, title: updateTitle, content: updateContent }
        : e
    )
    setTodoList(updatedArr)
    setFullTodoList(updatedArr)
    setShouldEditModalOpen(false)

  }
  return (
    <div className='container'>

      <h1 className='title'>事件列表</h1>
      <Search className='search_ipt' placeholder='search for todos...' onChange={e => handleSearch(e)} />
      <Row className='todo_container'>

        {todoList.map(e => {
          return (
            <Col xs={8} sm={8} md={8} lg={8} xl={8} style={{ padding: '20px' }} key={e.id}>
              <Card {...e} handlePressDeleteButton={handlePressDeleteButton} handlePressEditButton={handlePressEditButton} />
            </Col>
          )
        })}

      </Row>

      <FloatButton tooltip={<div>Add Todos</div>} type='primary' icon={<AppstoreAddOutlined />} onClick={() => setShouldAddModalOpen(true)} />

      <Modal centered open={shouldAddModalOpen} title={'添加事件'} footer={null} onCancel={() => setShouldAddModalOpen(false)}>
        <Form
          name="basic"
          style={{
            maxWidth: 600,
            marginTop: '30px'
          }}

          onFinish={handleAddTodo}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: 'Title!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[
              {
                required: true,
                message: 'Content!',
              },
            ]}
          >
            <TextArea style={{ minHeight: '200px', resize: 'none' }} />
          </Form.Item>

          <Form.Item
            style={{ textAlign: 'center' }}
          >
            <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
              Submit
            </Button>
            <Button onClick={() => setShouldAddModalOpen(false)}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal centered open={shouldDeleteModalOpen} title={'删除事件'} onOk={handleDeleteTodo} onCancel={() => setShouldDeleteModalOpen(false)}>
        <p>是否删除此事件？</p>
      </Modal>

      <Modal centered open={shouldEditModalOpen} title={'修改事件'} footer={null} onCancel={() => setShouldEditModalOpen(false)}>
        <Form
          name="basic"
          style={{
            maxWidth: 600,
            marginTop: '30px'
          }}

          onFinish={handleEditTodo}
          initialValues={{
            title: selectEditID ? selectEditID && fullTodoList.find(e => e.id === selectEditID)!.title : '',
            content: selectEditID ? selectEditID && fullTodoList.find(e => e.id === selectEditID)!.content : ''
          }}
          key={selectEditID ? selectEditID && fullTodoList.find(e => e.id === selectEditID)!.id : ''}
        >
          <Form.Item
            label="标题"
            name="title"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
          >
            <TextArea style={{ minHeight: '200px', resize: 'none' }} />
          </Form.Item>

          <Form.Item
            style={{ textAlign: 'center' }}
          >
            <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
              Submit
            </Button>
            <Button onClick={() => setShouldEditModalOpen(false)}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>


    </div>
  )
}

export default Todo