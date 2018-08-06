// imports

import { actionCreators as userActions } from "redux/modules/users";

// actions

const SET_FEED = "SET_FEED";
const SET_PROJECT = "SET_PROJECT";

// action creators

function setFeed(feed){
    return {
        type: SET_FEED,
        feed
    };
}

function setProject(projectId){
    return {
        type : SET_PROJECT,
        projectId
    }
}


// api actions

function getFeed(){//전체 프로젝트 가져오기
    return (dispatch, getState) => {
        const { users : { token } } = getState();
        fetch("/projects/", {
            method: "GET",
            headers: {
                "Authorization" : `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(userActions.logout());
            }
            return response.json();
        })
        .then(json => dispatch(setFeed(json)))
    }
}

function getProject(projectId){
    return (dispatch, getState) => {
        const { users : { token }} = getState();
        fetch(`/projects/${projectId}/`, {
            headers: {
                Authorization : `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(userActions.logout());
            }
            return response.json();
        })
        .then(json => dispatch(setProject(json)));
    };
};

// initial state

const initialState = {

}

// reducer

function reducer(state= initialState, action) {
    switch(action.type){
        case SET_FEED:
            return applySetFeed(state, action);
        case SET_PROJECT:
            return applySetProject(state, action);
        default:
            return state;
    }
}

// reducer functions

function applySetFeed(state, action) {
    const { feed } = action;
    return {
        ...state,
        feed
    }
}

function applySetProject(state, action) {
    const { projectId } = action;
    return {
        ...state,
        projectId
    }
}

// exports

const actionCreators = {
    getFeed,
    getProject
}

export { actionCreators };

export default reducer;
