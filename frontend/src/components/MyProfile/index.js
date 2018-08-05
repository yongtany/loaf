import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from 'redux/modules/users';

const mapStateToProps = (state, ownProps) => {
    const { users: { loggedInUser }} = state;
    return {
        loggedInUser
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getProfile: () => dispatch(userActions.getProfile()),
        logout: () => dispatch(userActions.logout())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Container);