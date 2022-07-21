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


const Signup = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSignup = async () => {
        try {

            if(name === "" || email === "" || password === "") return openNotification('Fill the details', 'Fill the Details', 'warning')

            const data = {
                name, email, password
            }
            
            const res = await AppService.signup(data)

            if(res.status === 200) {
                openNotification('User Created', 'New User created successfully', 'success')
                setName('')
                setEmail('')
                setPassword('')
            }
            else openNotification('Gone wrong', 'User creation failed', 'error')

        } catch (error) {
            console.log(error)
            if(error.response.status === 409) openNotification('User Already Exists', 'User creation failed', 'error')
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
                    <Input placeholder="Name" type='text' value={name} onChange={e => setName(e.target.value)} />
                </div>

                <div className='card-input'>
                    <Input placeholder="Email" type='email' value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div className='card-input'>
                    <Input placeholder="Password" type='password' value={password} onChange={e => setPassword(e.target.value)} />
                </div>

                <div className='signup-btn'>
                    <Button type="primary" onClick={handleSignup}>Signup</Button>
                </div>

                <div className='to-signin'>
                    <Link to='/signin'>Signin?</Link>
                </div>

            </div>

        </div>
    );
}


export default Signup