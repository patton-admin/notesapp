
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

export const getAllCandidates = ({recruiterName}) => {
    console.log('recruiterName..from getAllCandidate.', recruiterName);
    const api = `https://pn6rvxfj5c.execute-api.us-east-1.amazonaws.com/dev/score/v1`;
    return axios
        .post(`${api}`, {
            type: "getRecByName",
            timePeriod: "2025",
            recruiterName: recruiterName,
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

export const addScoreCard = (data) => {
    return axios
        .post(`https://pn6rvxfj5c.execute-api.us-east-1.amazonaws.com/dev/score/v1`, {...data, "type": "post"})
        .then((response) => {
            console.log('response from addScoreCard...', response);
            return response;
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const getAllRecruiter = () => {
    return axios
        .post(`https://pn6rvxfj5c.execute-api.us-east-1.amazonaws.com/dev/score/v1`, {"type": "getAvailableRec"})
        .then((response) => {
            console.log('response from addScoreCard...', response);
            const { data } = response;
            const {body } = data;
         const dropdownOptions = body.data.map(item => {
                const [_, key] = item.split('#'); // Split once to extract the key
                return { key, value: key };
            });
            console.log(dropdownOptions);
            return dropdownOptions;
        })
        .catch(function (error) {
            console.log(error);
        });
};