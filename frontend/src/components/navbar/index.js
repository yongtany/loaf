import Container from './container';
import { connect } from 'react-redux';
import { actionCreators as userActions } from 'redux/modules/users';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => dispatch(userActions.logout())
    }
}


export default connect(null, mapDispatchToProps)(Container);