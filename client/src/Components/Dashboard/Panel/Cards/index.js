import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { useState } from 'react';
import './style.css'

const Cards = ({ id, name, description, handleDeleteCard, handleEditCard }) => {

    const dragStarted = (e, id) => {
        e.dataTransfer.setData("cardId", id)
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editCardName, setEditCardName] = useState(name)
    const [editCardDesc, setEditCardDesc] = useState(description)

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {

        const data = {
            name: editCardName,
            description: editCardDesc,
            card_id: id
        }

        handleEditCard(data)

        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className='card-container' draggable onDragStart={(e) => dragStarted(e, id)}>

            <div className='delete-card'>
                <div className='delete-card-icon'><DeleteOutlined onClick={() => handleDeleteCard(id)} /></div>
                <div className='edit-card-icon'><EditOutlined onClick={() => showModal()} /></div>
            </div>

            <h4>{name}</h4>
            <p>{description}</p>

            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
               
                <div className='card-input'>
                    <Input placeholder="Name" type='text' value={editCardName} onChange={e => setEditCardName(e.target.value)} />
                </div>

                <div className='card-input'>
                    <Input placeholder="Description" type='text' value={editCardDesc} onChange={e => setEditCardDesc(e.target.value)} />
                </div>

            </Modal>

        </div>
    );
}


export default Cards