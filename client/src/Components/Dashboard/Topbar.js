import './style.css'
import { Button } from 'antd'
import AppService from '../../Service'

const Topbar = ({ name }) => {

    const handleLogout = () => {
        AppService.logout()
        window.location.reload()
    }

    return (
        <div>
            <div className='topbar-container'>
                <h4>Metadiac</h4>
            </div>

            <div className="topbar-name">
                <h4>{name}</h4>
                <Button type='primary' danger onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    );
}

export default Topbar