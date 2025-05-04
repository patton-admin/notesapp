import {
    GET_ALL_SCORECARD,
    GET_ALL_SCORECARD_SUCCESS,
    GET_ALL_SCORECARD_ERROR,
    ADD_SCORECARD,
    ADD_SCORECARD_SUCCESS,
    ADD_SCORECARD_ERROR,
    DELETE_SCORECARD,
    DELETE_SCORECARD_SUCCESS,
    DELETE_SCORECARD_ERROR
} from "./../actions/action";

const initialScoreCardValue = {
    expectedInterviews: "0",
    achievedInterviews: "0",
    month: "",
    timestamp: "",
    year: "",
    comments: "",
    recruiterName: "",
    SK: "",
    team: "",
    day: "",
    PK: "",
    lead: false,
    loading: false,
    error: null,
    scoreCards: []
};

export const scoreCardReducer = (state = initialScoreCardValue, action) => {
    switch (action.type) {
        case GET_ALL_SCORECARD:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_ALL_SCORECARD_SUCCESS:
            return {
                ...state,
                loading: false,
                scoreCards: action.payload
            };
        case GET_ALL_SCORECARD_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case ADD_SCORECARD:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_SCORECARD_SUCCESS:
            return {
                ...state,
                loading: false,
                scoreCards: [...state.scoreCards, action.payload]
            };
        case ADD_SCORECARD_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case DELETE_SCORECARD:
            return {
                ...state,
                loading: true,
                error: null
            };
        case DELETE_SCORECARD_SUCCESS:
            return {
                ...state,
                loading: false,
                scoreCards: state.scoreCards.filter(
                    (scoreCard) => scoreCard.id !== action.payload
                )
            };
        case DELETE_SCORECARD_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};