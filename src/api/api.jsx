
import axios from "axios";

// const api = "http://ec2-3-135-229-93.us-east-2.compute.amazonaws.com:5001/chms";
const api = "https://dssfrodna1.execute-api.us-east-1.amazonaws.com/test/v1-test-validate";

export const login = (options) => {
    // let api = "http://localhost:5001/chms";
    options.url = `${api}/login`;
    return axios(options);
};

export const loginUser = (data) => {
    let api = "https://b7j7zfgi5k.execute-api.us-east-1.amazonaws.com/prod/v1-validate";
    const { username: loginId, password } = data;
    console.log()
    return axios
        .post(`${api}`, { loginId, password })
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

export const addScoreCard = async (data) => {
    console.log('Data received in addScoreCard API:', data);
    try {
        const response = await axios.post(
            `https://ov7ytt39o7.execute-api.us-east-1.amazonaws.com/dev/score/recruiter`,
            { ...data, type: "post" }
        );
        console.log('Response from addScoreCard:', response);
        return response;
    } catch (error) {
        console.error('Error in addScoreCard API:', error);
        throw error;
    }
};

export const updateScoreCard = async (data) => {
    console.log('Data received in addScoreCard API:', data);
    try {
        const response = await axios.put(
            `https://0yptiyr9xe.execute-api.us-east-1.amazonaws.com/dev/score/recruiter`,
            { ...data, type: "put" }
        );
        console.log('Response from updateScoreCard:', response);
        return response;
    } catch (error) {
        console.error('Error in updateScoreCard API:', error);
        throw error;
    }
};

export const getRecruiterActivity = ({ recruiterName }) => {
    return axios
        .get(`https://ov7ytt39o7.execute-api.us-east-1.amazonaws.com/dev/score/recruiter/${recruiterName}`)
        .then((response) => {
            const { data } = response;
            console.log('recruiterActivity...', data);
            return data;
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const getAllRecruiter = async () => {
    const mockData = {
        data: {
            body: {
                data: [
                    "recruiter#John Doe",
                    "recruiter#Jane Smith"
                ]
            }
        }
    };

    try {
        const response = await axios.get(
            `https://ov7ytt39o7.execute-api.us-east-1.amazonaws.com/dev/score/recruiters`,
            {
                params: {
                    "type": "getAvailableRec"
                }
            }
        );
        if (!response) {
            throw new Error("API response was undefined.");
        }
        console.log('Response from API:', response);
        const { data } = response;
        const { data: payload } = data;

        const dropdownOptions = payload
            .map(item => {
                const [_, key] = item.split('#');
                return { key, value: key };
            })
            .sort((a, b) => a.key.localeCompare(b.key));

        return dropdownOptions;

    } catch (error) {
        console.log("API call failed. Using mock data.", error);

        // Return mock data for the dropdown
        const dropdownOptions = mockData.data.body.data
            .map(item => {
                const [_, key] = item.split('#');
                return { key, value: key };
            })
            .sort((a, b) => a.key.localeCompare(b.key));

        return dropdownOptions;
    }
};

export const getRecActivityByDateRange = ({ recruiterName, startDate, endDate }) => {
    return axios
        .post(`https://pn6rvxfj5c.execute-api.us-east-1.amazonaws.com/dev/score/v1`, {
            "type": "getRecByDateRange", recruiterName: recruiterName,
            startDate, endDate
        })
        .then((response) => {
            const { data } = response;
            return data;
        })
        .catch(function (error) {
            console.log(error);
        });
};

const ORDER_API_BASE = "https://0yptiyr9xe.execute-api.us-east-1.amazonaws.com/dev";

export const addJobOrder = async (data) => {
    console.log('Data received in addJobOrder API:', data);
    try {
        const response = await axios.post(`${ORDER_API_BASE}/score/order`, data);
        console.log('Response from addJobOrder:', response);
        return response;
    } catch (error) {
        console.error('Error in addJobOrder API:', error);
        throw error;
    }
};

export const updateJobOrder = async (data) => {
    console.log('Data received in updateJobOrder API:', data);
    try {
        const response = await axios.put(`${ORDER_API_BASE}/score/order`, data);
        console.log('Response from updateJobOrder:', response);
        return response;
    } catch (error) {
        console.error('Error in updateJobOrder API:', error);
        throw error;
    }
};

// GET all orders submitted by a recruiter (queried via GSI2: SOURCE#{subBy})
export const getOrderActivity = ({ recruiterName }) => {
    return axios
        .get(`${ORDER_API_BASE}/score/orders/recruiter/${encodeURIComponent(recruiterName)}`)
        .then((response) => {
            const { data } = response;
            console.log('recruiterActivity...', data);
            return data.orders;
        })
        .catch(function (error) {
            console.log(error);
        });
};

// GET all orders for a client (queried via GSI3: CLIENT#{client})
export const getOrdersByClient = async (clientName) => {
    try {
        const response = await axios.get(
            `${ORDER_API_BASE}/score/orders/client/${encodeURIComponent(clientName)}`
        );
        console.log('Response from getOrdersByClient:', response);
        return response.data;
    } catch (error) {
        console.error('Error in getOrdersByClient API:', error);
        throw error;
    }
};

// GET all orders a candidate was submitted to (queried via GSI1: CANDIDATE#{candidate})
export const getOrdersByCandidate = async (candidateName) => {
    try {
        const response = await axios.get(
            `${ORDER_API_BASE}/score/orders/candidate/${encodeURIComponent(candidateName)}`
        );
        console.log('Response from getOrdersByCandidate:', response);
        return response.data;
    } catch (error) {
        console.error('Error in getOrdersByCandidate API:', error);
        throw error;
    }
};

// GET all candidates submitted to a specific order (queried via PK: ORDER#{orderName})
export const getOrdersByOrder = async (orderName) => {
    try {
        const response = await axios.get(
            `${ORDER_API_BASE}/score/orders/order/${encodeURIComponent(orderName)}`
        );
        console.log('Response from getOrdersByOrder:', response);
        return response.data;
    } catch (error) {
        console.error('Error in getOrdersByOrder API:', error);
        throw error;
    }
};