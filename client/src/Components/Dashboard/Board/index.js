import './style.css'
import { SettingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Checkbox, Input } from 'antd';
import { useEffect, useState } from 'react';
import AppService from '../../../Service'

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Deepak', 'Jack', 'Jim'];

const Board = ({ name, _id, description, handleDeleteBoard, listBoards }) => {

    const navigate = useNavigate()

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [listUsers, setListUsers] = useState([])
    const [checkedList, setCheckedList] = useState([]);
    const [editBoardName, setEditBoardName] = useState(name)
    const [editBoardDesc, setEditBoardDesc] = useState(description)

    const showModal = (id) => {

        const getUsers = async () => {
            try {
                
                const res = await AppService.listUsers(id)

                setListUsers(res.data)
                res.data.map(u => {
                    if(u.permission) setCheckedList(arr => [...arr, u._id])
                })

            } catch (error) {
                console.log(error)
            }
        }

        getUsers()

        setIsModalVisible(true);
    };

    const handleOk = async () => {

        const data = {
            board: _id,
            permissions: checkedList
        }

        const res = await AppService.boardPermission(data)
        console.log(res)

        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showEditBoard = () => {
        setIsEditModalVisible(true);
    };

    const handleEditModal = async () => {

        const data = {
            name: editBoardName,
            description: editBoardDesc,
            board_id: _id
        }

        const res = await AppService.editBoard(data)

        console.log(res)
        listBoards()

        setIsEditModalVisible(false);
    };

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
    };


    // const onChange = id => {
    //     if(checkedList.includes(id)) {
    //         let newArr = checkedList.filter(item => item._id !== id)
    //         setCheckedList(newArr)
    //     }
    //     else setCheckedList(arr => [...arr, id])
    // };

    const onChange = id => {

        if(checkedList.includes(id)) {
            let newArr = checkedList.filter(item => item !== id)
            setCheckedList(newArr)
        }
        else setCheckedList(arr => [...arr, id])

        setListUsers(current => 
            current.map(obj => {
                if(obj._id === id) {
                    return { ...obj, permission: !obj.permission }
                }

                return obj
            })
        )

    };

    useEffect(() => {

        

    }, [])

    return (
        <div className="board-grid-item">
            <h3>{name}</h3>

            <p>{description}</p>

            <div className='board-settings' onClick={() => showModal(_id)} >
                <SettingOutlined /> Settings
            </div>

            <div className="board-open" >
                <Button type='primary' className='board-btn' onClick={() => navigate('/panel/' + _id)}>Open</Button>
                <Button type='primary' className='board-btn' onClick={() => showEditBoard()}>Edit</Button>
                <Button type='primary' className='board-btn' danger onClick={() => handleDeleteBoard(_id)}>Delete</Button>
            </div>

            <Modal title="Board Permission" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

                { listUsers.map(user => (
                    <Checkbox onChange={() => onChange(user._id)} checked={user.permission}>{user?.name}</Checkbox>
                )) }

            </Modal>

            <Modal title="Edit Board" visible={isEditModalVisible} onOk={handleEditModal} onCancel={handleEditCancel}>

                <div className='card-input'>
                    <Input placeholder="Name" type='text' value={editBoardName} onChange={e => setEditBoardName(e.target.value)} />
                </div>

                <div className='card-input'>
                    <Input placeholder="Description" type='text' value={editBoardDesc} onChange={e => setEditBoardDesc(e.target.value)} />
                </div>

            </Modal>

        </div>
    );
}

export default Board