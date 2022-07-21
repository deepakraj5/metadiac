import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../Topbar";
import AppService from '../../../Service'
import './style.css'
import Panels from "./Panels";
import { Button, Input, Modal } from "antd";
import { PlusCircleOutlined, RollbackOutlined } from "@ant-design/icons";
import PreLoader from "../../PreLoader";

const Panel = () => {

    const navigate = useNavigate()
    
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')
    const [panels, setPanels] = useState([])

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [panelName, setPanelName] = useState('')

    const showModal = () => {
        setIsModalVisible(true);
    };

    const listPanels = async () => {
        try {

            const id = (window.location.pathname).split('/')[2]
            
            const res = await AppService.listPanels(id)

            console.log(res)

            setPanels(res.data)

        } catch (error) {
            console.log(error)
        }
    }

    const handleOk = async () => {

        const id = (window.location.pathname).split('/')[2]

        const data = {
            name: panelName,
            board_id: id
        }

        const res = await AppService.newPanel(data)

        console.log(res)

        listPanels()

        setPanelName('')

        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    useEffect(() => {

        const getData = async () => {
            try {
                
                const res = await AppService.profile()
            
                console.log(res)

                setName(res.data?.name)

            } catch (error) {
                console.log(error)
            }
        }

        const token = localStorage.getItem('token')
        if(!token) navigate('/signin')
        else {
            getData()
            listPanels()
            setLoading(false)
        }

    }, [])

    const handleNewCard = async (data) => {
        
        const res = await AppService.newCard(data)

        console.log(res)

        listPanels()

    }

    const handleDeleteCard = async (id) => {
        const res = await AppService.deleteCard(id)

        console.log(res)

        listPanels()
    }

    const handleEditCard = async (data) => {

        const res = await AppService.editCard(data)

        console.log(res)

        listPanels()
    }

    const handleDeletePanel = async (id) => {

        const res = await AppService.deletePanel(id)

        console.log(res)

        listPanels()
    }

    return (
        <div>

            { loading ? <PreLoader /> : 

                <div>

                    <Topbar name={name} />

                    <div className="add-board">
                        <Button type='link' danger onClick={() => navigate('/dashboard')} icon={<RollbackOutlined />}>Back to Boards</Button>
                        <Button type='primary' onClick={showModal} icon={<PlusCircleOutlined />}>Add Panel</Button>
                    </div>


                    <div className="panels-container">
                        <div className="panels-grid-container">
                            { panels.map(panel => (
                                <Panels name={panel.name} _id={panel._id} cards={panel.cards} 
                                    handleNewCard={handleNewCard} handleDeleteCard={handleDeleteCard} 
                                    listPanels={listPanels} handleEditCard={handleEditCard}
                                    handleDeletePanel={handleDeletePanel}
                                />
                            )) }
                        </div>
                    </div>

                </div>
            
            }

            <Modal title="New Board" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                
                <div className='card-input'>
                    <Input placeholder="Name" type='text' value={panelName} onChange={e => setPanelName(e.target.value)} />
                </div>

            </Modal>

        </div>
    );
}


export default Panel