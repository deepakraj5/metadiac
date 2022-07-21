import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/v1'


class AppService {

    signup (data) {
        return axios.post(BASE_URL + '/signup', data)
    }

    signin (data) {
        return axios.post(BASE_URL + '/login', data)
    }

    profile () {
        const token = localStorage.getItem('token')
        return axios.get(BASE_URL + '/profile', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    }

    logout () {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
    }

    listBoards () {
        const token = localStorage.getItem('token')
        return axios.get(BASE_URL + '/boards', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    }

    listUsers (board_id) {
        const token = localStorage.getItem('token')
        return axios.get(BASE_URL + `/users/${board_id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    }

    newBoard (data) {
        const token = localStorage.getItem('token')
        return axios.post(BASE_URL + '/boards', data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    }

    deleteBoard (data) {
        const token = localStorage.getItem('token')
        return axios.delete(BASE_URL + `/boards/${data?.board_id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    }

    listPanels (board_id) {
        const token = localStorage.getItem('token')
        return axios.get(BASE_URL + `/panels/${board_id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    }

    newPanel (data) {
        const token = localStorage.getItem('token')
        return axios.post(BASE_URL + '/panels', data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    }

    boardPermission (data) {
        const token = localStorage.getItem('token')
        return axios.post(BASE_URL + '/boards/permission', data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    }

    newCard (data) {
        const token = localStorage.getItem('token')
        return axios.post(BASE_URL + '/cards', data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    }

    deleteCard (card_id) {
        const token = localStorage.getItem('token')
        return axios.delete(BASE_URL + `/cards/${card_id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    }

    dragCard (data) {
        const token = localStorage.getItem('token')
        return axios.post(BASE_URL + `/panel/drag`, data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    }

    editBoard (data) {
        const token = localStorage.getItem('token')
        return axios.patch(BASE_URL + `/boards`, data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    }

    editCard (data) {
        const token = localStorage.getItem('token')
        return axios.patch(BASE_URL + `/cards`, data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    }

    editPanel (data) {
        const token = localStorage.getItem('token')
        return axios.patch(BASE_URL + `/panels`, data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    }

    deletePanel (panel_id) {
        const token = localStorage.getItem('token')
        return axios.delete(BASE_URL + `/panels/${panel_id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    }

}

export default new AppService()