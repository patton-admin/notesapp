import {
    MODAL_OPEN,
    MODAL_OPEN_SUCCESS,
    MODAL_OPEN_FAILURE,
    MODAL_OPEN_BUCKET,
    MODAL_OPEN_BUCKET_SUCCESS,
    MODAL_OPEN_BUCKET_FAILURE,
    GET_ALL_LOV,
    GET_ALL_LOV_SUCCESS,
    GET_ALL_LOV_ERROR,
    ADD_LOV,
    ADD_LOV_SUCCESS,
    ADD_LOV_ERROR,
    DELETE_LOV,
    DELETE_LOV_SUCCESS,
    DELETE_LOV_ERROR,
} from "./action";

export const openModal = ({ isOpen, initialVal, isView } = {}) => ({
    type: MODAL_OPEN,
    isOpen,
    initialVal,
    isView: isView !== undefined ? isView : false,
});

export const openModalSuccess = () => ({
    type: MODAL_OPEN_SUCCESS,
});

export const openModalFailure = () => ({
    type: MODAL_OPEN_FAILURE,
});

export const openModalBucket = (isOpenBucket) => ({
    type: MODAL_OPEN_BUCKET,
    isOpenBucket,
});

export const openModalBucketSuccess = () => ({
    type: MODAL_OPEN_BUCKET_SUCCESS,
});

export const openModalBucketFailure = () => ({
    type: MODAL_OPEN_BUCKET_FAILURE,
});

export const viewLov = (payload = {}) => ({
    type: GET_ALL_LOV,
    lov: payload,
});
export const viewLovSuccess = (payload = {}) => ({
    type: GET_ALL_LOV_SUCCESS,
    lov: payload,
});
export const viewLovFailure = () => ({
    type: GET_ALL_LOV_ERROR,
});

//Add Lov...
export const addLov = (payload = {}) => ({
    type: ADD_LOV,
    lov: payload,
});

export const addLovSuccess = (payload = {}) => ({
    type: ADD_LOV_SUCCESS,
    lov: payload,
});

export const addLovFailure = (payload = {}) => ({
    type: ADD_LOV_ERROR,
    message: payload,
});

export const deleteLov = ({ lovId } = {}) => ({
    type: DELETE_LOV,
    lovId,
});

export const deleteLovSuccess = (payload = {}) => ({
    type: DELETE_LOV_SUCCESS,
    lov: payload,
});
export const deleteLovError = (payload = {}) => ({
    type: DELETE_LOV_ERROR,
    lov: payload,
});
