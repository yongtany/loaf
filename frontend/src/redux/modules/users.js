
//actions

const SAVE_TOKEN = "SAVE_TOKEN";
const LOGOUT = "LOGOUT";
const SET_PROFILE = "SET_PROFILE";
const SET_USERNAME = "SET_USERNAME";


//action creators
function saveToken(token) {
  return {
    type : SAVE_TOKEN,
    token : token
  }
}

function logout() {
  return {
    type: LOGOUT
  }
}

function setProfile(loggedInUser){
  return {
    type : SET_PROFILE,
    loggedInUser
  }
}

function setUsername(username) {
  return {
    type: SET_USERNAME,
    username
  };
}

//API actions


function facebookLogin(access_token) {
    return dispatch => {
      fetch("/users/login/facebook/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          access_token
        })
      })
        .then(response => response.json())
        .then(json => {
          if(json.token){
            dispatch(saveToken(json.token))
          }
        })
        .catch(err => console.log(err));
    };
  }

  function usernameLogin(username, password) {
    return function(dispatch) {
      fetch("/rest-auth/login/", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          username,
          password,
        })
      })
      .then(response => response.json())
      .then(json => {
        if(json.token) {
          dispatch(saveToken(json.token))
          dispatch(setUsername(username));
        }
      })
      .catch(err => console.log(err));
    }
  }

  function createAccount(username,email, name, password1, password2) {
    return function(dispatch) {
      fetch("/rest-auth/registration/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body : JSON.stringify({
          username,
          name,
          email,
          password1,
          password2,
        })
      })
      .then(response => response.json())
      .then(json => {
        if(json.token) {
          dispatch(saveToken(json.token));
          dispatch(setUsername(username));
        }
      })
      .catch(err => console.log(err));
    }
  }

  function getProfile(){
    return (dispatch, getState) => {
      const { users: { token, username }} = getState()
  
      fetch(`/users/${username}/`, {
        method: "GET",
        headers: {
          Authorization : `JWT ${token}`
        }
      })
      .then(response => {
        if(response.status === 401){
          dispatch(logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setProfile(json));
      })
      .catch(err => console.log(err));
    };
  }

//initial state

const initialState = {
    isLoggedIn: localStorage.getItem("jwt") ? true : false,
    token : localStorage.getItem("jwt"),
    username: localStorage.getItem("username")
};

//reducer
function reducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_TOKEN:
          return applySetToken(state, action); 
        case LOGOUT : 
          return applyLogout(state, action);
        case SET_PROFILE:
          return applySetProfile(state, action); 
        case SET_USERNAME:
          return applySetUsername(state, action);    
        default: 
          return state;
    }
}

//reducer functions

function applySetToken(state, action) {
  const { token } = action;
  localStorage.setItem("jwt", token);
  return {
    ...state,
    isLoggedIn : true,
    token
  }
}

function applyLogout(state, action) {
  localStorage.removeItem("jwt");
  localStorage.removeItem("username");
  return {
    isLoggedIn : false
  }
}

function applySetProfile(state, action) {
  const { loggedInUser } = action;
  return {
    ...state,
    loggedInUser
  };
}

function applySetUsername(state, action) {
  const { username } = action;
  localStorage.setItem("username", username);
  return {
    ...state,
    username
  };
}

//exports

const actionCreators = {
    facebookLogin,
    usernameLogin,
    createAccount,
    logout,
    getProfile,
    setUsername
};


export { actionCreators } ;

//reducer export
export default reducer;