import './style.css'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SettingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import Cards from './Cards';
import { Button, Input, Modal } from 'antd';
import { useState } from 'react';
import AppService from '../../../Service'

const Panels = ({ name, _id, cards, handleNewCard, handleDeleteCard, listPanels, handleEditCard, handleDeletePanel }) => {

    const navigate = useNavigate()

    const [cardName, setCardName] = useState('')
    const [cardDescription, setCardDescription] = useState('')
    const [editPanelName, setEditPanelName] = useState(name)

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = async () => {

        const data = {
            name: cardName,
            description: cardDescription,
            panel_id: _id
        }

        handleNewCard(data)

        setCardName('')
        setCardDescription('')

      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const showEditModal = () => {
      setIsEditModalVisible(true);
    };
  
    const handleEditPanel = async () => {

        const data = {
            name: editPanelName,
            panel_id: _id
        }

        const res = await AppService.editPanel(data)

        console.log(res)

        listPanels()

      setIsEditModalVisible(false);
    };
  
    const handleCancelPanel = () => {
      setIsEditModalVisible(false);
    };

    const draggingOver = (e) => {
        e.preventDefault()
    }

    const dragDropped = async (e) => {
        const id = e.dataTransfer.getData("cardId")
        console.log(id)
        const data = {
            card_id: id,
            panel_id: _id
        }
        const res = await AppService.dragCard(data)
        console.log(res)
        listPanels()
    }

    return (
        <div className="panels-grid-item" droppable onDragOver={(e) => draggingOver(e)} onDrop={(e) => dragDropped(e)}>
            <h3>{name}</h3>

            <div className='panel-icons'>
                <Button type='primary' onClick={showModal} icon={<PlusCircleOutlined />}>Add Card</Button>
                <div className='panel-icon-con'>
                    <div className='panel-delete-icon'><DeleteOutlined onClick={() => handleDeletePanel(_id)} /></div>
                    <div className='panel-edit-icon'><EditOutlined onClick={() => showEditModal()} /></div>
                </div>
            </div>
            
            <div className="card-main">

                { cards ? cards.map(card => (
                    <Cards key={card._id} id={card._id} name={card?.name} 
                        description={card.description} handleDeleteCard={handleDeleteCard} 
                        handleEditCard={handleEditCard}
                    />
                )) : '' }

            </div>

            <Modal title="New Card" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                
                <div className='card-input'>
                    <Input placeholder="Name" type='text' value={cardName} onChange={e => setCardName(e.target.value)} />
                </div>

                <div className='card-input'>
                    <Input placeholder="Description" type='text' value={cardDescription} onChange={e => setCardDescription(e.target.value)} />
                </div>

            </Modal>

            <Modal title="Edit Panel" visible={isEditModalVisible} onOk={handleEditPanel} onCancel={handleCancelPanel}>
                
                <div className='card-input'>
                    <Input placeholder="Name" type='text' value={editPanelName} onChange={e => setEditPanelName(e.target.value)} />
                </div>

            </Modal>

        </div>
    );
}

export default Panels