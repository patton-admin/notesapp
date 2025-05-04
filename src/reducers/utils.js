import {
    MODAL_OPEN,
    MODAL_OPEN_BUCKET,
    GET_ALL_LOV,
    GET_ALL_LOV_SUCCESS,
    GET_ALL_LOV_ERROR,
    ADD_LOV,
    ADD_LOV_SUCCESS,
    ADD_LOV_ERROR,
    DELETE_LOV,
    DELETE_LOV_SUCCESS,
    DELETE_LOV_ERROR,
} from "./../actions/action";

const initialValues = {
    isOpen: false,
    isOpenBucket: false,
    initialVal: {},
    utilLoading: false,
    utilError: false,
    isView: false,
    lovs: [],
};

export const utilReducer = (state = initialValues, action) => {
    switch (action.type) {
        case MODAL_OPEN:
            return {
                ...state,
                isOpen: action.isOpen,
                initialVal: action.initialVal,
                isView: action.isView,
            };
        case MODAL_OPEN_BUCKET:
            return { ...state, isOpenBucket: action.isOpenBucket };

        case GET_ALL_LOV:
            return { ...state, utilLoading: true, utilError: false };
        case GET_ALL_LOV_SUCCESS:
            return {
                ...state,
                lovs: action.lov,
                utilLoading: false,
                utilError: false,
            };
        case GET_ALL_LOV_ERROR:
            return { ...state, utilLoading: false, utilError: true };

        case ADD_LOV:
            return { ...state, utilLoading: true, utilError: false };
        case ADD_LOV_SUCCESS:
            let { prAreaid } = action.lov;
            let data = state.lovs.filter((e) => e.prAreaid !== prAreaid);
            data = [...data, action.lov];
            return {
                ...state,
                lovs: data,
                utilLoading: false,
                utilError: false,
            };
        case ADD_LOV_ERROR:
            return {
                ...state,
                utilLoading: false,
                utilError: true,
                message: action.message,
            };

        case DELETE_LOV:
            return { ...state, utilLoading: true, utilError: false };

        case DELETE_LOV_SUCCESS:
            let x = state.lovs.filter(
                (usr) => !action.lov.join("").includes(usr.prAreaid)
            );
            console.log("value of x...", x);
            return {
                ...state,
                lovs: x,
                utilLoading: false,
                utilError: true,
                message: action.message,
            };
        case DELETE_LOV_ERROR:
            return { ...state, utilLoading: false, utilError: true };

        default:
            return state;
    }
};
