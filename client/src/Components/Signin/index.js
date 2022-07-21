import './style.css'
import { Button, Input, notification } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppService from '../../Service'

const openNotification = (message, description, type) => {
    notification[type]({
      message,
      description
    });
};


const Signin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSignin = async () => {
        try {

            if(email === "" || password === "") return openNotification('Fill the details', 'Fill the Details', 'warning')

            const data = {
                email, password
            }
            
            const res = await AppService.signin(data)

            if(res.status === 200) {
                localStorage.setItem('id', res.data?._id)
                localStorage.setItem('token', res.data?.token)
                navigate('/dashboard')
            }
            else openNotification('Gone wrong', 'Wrong email or password', 'error')

        } catch (error) {
            console.log(error)
            openNotification('Gone wrong', 'Wrong email or password', 'error')
        }
    }

    useEffect(() => {

        const token = localStorage.getItem('token')
        if(token) navigate('/dashboard')

    }, [])

    return (
        <div className='signup-container'>

            <div className="card">

                <div className='card-title'>
                    <h4>Metadiac</h4>
                </div>

                <div className='card-input'>
                    <Input placeholder="Email" type='email' value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div className='card-input'>
                    <Input placeholder="Password" type='password' value={password} onChange={e => setPassword(e.target.value)} />
                </div>

                <div className='signup-btn'>
                    <Button type="primary" onClick={handleSignin}>Signin</Button>
                </div>

                <div className='to-signup'>
                    <Link to='/'>Signup?</Link>
                </div>

            </div>

        </div>
    );
}


export default Signin