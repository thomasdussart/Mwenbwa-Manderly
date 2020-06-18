import axios from "axios";

const API_URL = "http://localhost/api/";

class TreeService {
    getAllTrees() {
        return axios.get(`${API_URL}allTrees`);
    }

    buyTree(idTree, idUser) {
        return axios
            .post(`${API_URL}buyTree`, {
                idTree,
                idUser,
            })
            .then(response => response.data);
    }
}

export default new TreeService();