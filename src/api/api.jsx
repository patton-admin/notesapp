
import axios from "axios";

// const api = "http://ec2-3-135-229-93.us-east-2.compute.amazonaws.com:5001/chms";
const api = "https://dssfrodna1.execute-api.us-east-1.amazonaws.com/test/v1-test-validate";

export const login = (options) => {
    // let api = "http://localhost:5001/chms";
    options.url = `${api}/login`;
    return axios(options);
};

export const loginUser = (data) => {
    // let api = "http://localhost:5001/chms";
    const {username: loginId, password} = data;
    return axios
        .post(`${api}`, {loginId, password})
        .then((response) => {
            return response;
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const getAllusers = (options) => {
    // options.url = `${api}/allUsers`;
    return axios(`${api}/allUsers`);
};

export const getAllCandidates = (options) => {
    const api = `https://pn6rvxfj5c.execute-api.us-east-1.amazonaws.com/dev/score/v1`;
    return axios
        .post(`${api}`, {
            type: "getRecByName",
            timePeriod: "2024",
            recruiterName: "Mark Antony",
        })
        .then((response) => {
            const { status, data } = response;
            return { status, data: data.body};
        })
        .catch(function (error) {
            console.log(error);
        });
};

//adding users to the application
export const addUserApi = (data) => {
    return axios.post(`${api}/addUser`, data).then((response) => {
        return response;
    });
};

export const deleteUserApi = (data) => {
    data = data.map((e) => parseInt(e));
    return axios
        .post(`${api}/deleteByUserId`, data)
        .then((response) => {
            return response;
        })
        .catch(function (error) {
            console.log(error);
        });
};