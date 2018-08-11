// imports

import { actionCreators as userActions } from "redux/modules/users";
import uuidv1 from 'uuid/v1';

// actions

const SET_FEED = "SET_FEED";
const SET_PROJECT = "SET_PROJECT";
const ADD_COMMENT = "ADD_COMMENT";

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

function addComment(photoId, comment){
    return {
        type: ADD_COMMENT,
        photoId,
        comment
    };
}

function commentProject(projectId, message) {
    return (dispatch, getState) => {
      const { user: { token } } = getState();
      fetch(`/projects/${projectId}/comments/`, {
        method: "POST",
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          message
        })
      }).then(response => {
        if (response.status === 401) {
          dispatch(userActions.logout());
        }
        return response.json()
      })
      .then(json => {
          if(json.message){
              dispatch(addComment(projectId, json))
          }
      })
    };
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

function createProject(file, title, caption, max_member, schedule,  tags){
    const tagsArray = tags.split(",");
    const data = new FormData();
    data.append("file", {
        uri: file,
        type: "image/jpg",
        name: `${uuidv1()}.jpg`
    });
    data.append("title", title);
    data.append("caption", caption);
    data.append("max_member", max_member);
    data.append("schedule", schedule);
    data.append("tags", JSON.stringify(tagsArray));

    return (dispatch, getState) => {
      const { users: { token } } = getState();
      fetch("/projects/", {
        method: "POST",
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type" : "multipart/form-data"
        },
        body : data
      })
      .then(response => {
        if(response.status === 401) {
          dispatch(userActions.logout());
        } 
      })
      .catch(err => console.log(err));
    }
  }

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
        case ADD_COMMENT:
            return applyAddComment(state, action);
        default:
            return state;
    }
}
function applyAddComment(state, action){
    const { projectId, comment } = action;
    const { feed } = state;
    const updatedFeed = feed.map(project => {
      if (project.id === projectId) {
        return {
             ...project,
             comments : [...project.comments, comment]
        };
      }
      return project;
    });
    return { ...state, feed: updatedFeed };
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
    getProject,
    createProject,
    commentProject
}

export { actionCreators };

export default reducer;
