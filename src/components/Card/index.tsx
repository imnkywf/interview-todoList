import React from 'react'
import { Card } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { TodoProps } from '../Todo'

const CardComponent: React.FC<TodoProps> = ({ id, title, content, handlePressDeleteButton, handlePressEditButton }) => {
  return (
    <>
      <Card title={title!} extra={
        <>
          <EditOutlined onClick={() => handlePressEditButton!(id!)} style={{ color: '#1677ff', cursor: 'pointer', fontSize: '16px', marginRight: '10px' }} />
          <DeleteOutlined onClick={() => handlePressDeleteButton!(id!)} style={{ color: 'red', cursor: 'pointer', fontSize: '16px' }} />
        </>
      }>
        <p>{content!}</p>
      </Card >

    </>
  )
}

export default CardComponent