import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import AppService from '../../Service'
import Board from "./Board";
import './style.css'
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Modal } from 'antd'
import PreLoader from "../PreLoader";


const CheckboxGroup = Checkbox.Group;


const Dashboard = () => {

    const navigate = useNavigate()
    
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')
    const [boards, setBoards] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [boardName, setBoardName] = useState('')
    const [description, setDescription] = useState('')

    const showModal = () => {
        setIsModalVisible(true);
    };

    const listBoards = async () => {
        try {
            
            const res = await AppService.listBoards()

            console.log(res)

            setBoards(res.data)

        } catch (error) {
            console.log(error)
        }
    }

    const handleOk = async () => {

        const data = {
            name: boardName,
            description
        }

        const res = await AppService.newBoard(data)

        console.log(res)

        listBoards()

        setBoardName('')
        setDescription('')

        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDeleteBoard = async (id) => {
        try {
            
            const data = {
                board_id: id
            }

            console.log(data)

            const res = await AppService.deleteBoard(data)

            console.log(res)
            listBoards()

        } catch (error) {
            
        }
    }


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
            listBoards()
            setLoading(false)
        }

    }, [])

    return (
        <div>

            { loading ? <PreLoader /> : 

                <div>

                    <Topbar name={name} />

                    <div className="add-board">
                        <Button type='primary' onClick={showModal} icon={<PlusCircleOutlined />}>Add Board</Button>
                    </div>
    
                    <div className="board-container">

                        <div className="board-grid-container">
                            { boards.map(board => (
                                <Board key={board._id} name={board.name} _id={board._id} 
                                    description={board.description} handleDeleteBoard={handleDeleteBoard}
                                    listBoards={listBoards}
                                />
                            )) }
                        </div>

                    </div>

                </div>
            
            }

            <Modal title="New Board" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                
                <div className='card-input'>
                    <Input placeholder="Name" type='text' value={boardName} onChange={e => setBoardName(e.target.value)} />
                </div>

                <div className='card-input'>
                    <Input placeholder="Description" type='text' value={description} onChange={e => setDescription(e.target.value)} />
                </div>

            </Modal>

        </div>
    );
}


export default Dashboard