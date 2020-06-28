import axios from "axios";

const API_URL = "http://localhost/api/auth/";

class AuthService {
    login(email, password) {
        return axios
            .post(`${API_URL}signin`, {
                email,
                password,
            })
            .then(response => {
                if (response.data.accessToken) {
                    console.log(response.data);
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    resetPassword(password, id) {
        console.log(id, password);

        return axios.post(`${API_URL}resetPassword`, {
            password,
            id,
        });
    }

    deleteUser(id) {
        console.log(id);

        return axios.post(`${API_URL}deleteUser`, {
            id,
        });
    }

    register(username, email, password, color) {
        return axios.post(`${API_URL}signup`, {
            username,
            email,
            password,
            color,
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();
