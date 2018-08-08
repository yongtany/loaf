import { connect } from 'react-redux';
import Container from './container';
import { actionCreators  as userActions } from '../../redux/modules/users';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createProfile: (profile_image, address, school, major, website, bio, tags) => {
            dispatch(userActions.createProfile(profile_image, address, school, major, website, bio, tags))
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);