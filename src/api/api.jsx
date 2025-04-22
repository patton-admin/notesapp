
import axios from "axios";

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
            console.log("response...", data);
            return { status, data: data.body};
        })
        .catch(function (error) {
            console.log(error);
        });
};