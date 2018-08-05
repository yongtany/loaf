import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as projectActions } from '../../redux/modules/photos';

const mapStateToProps = (state, ownProps) => {
    const { photos: { feed } } = state;
    return {
        feed
    }
}

const mapDispatchToProps = ( dispatch, ownProps ) => {
    return {
        getProjects: () => {
            dispatch(projectActions.getProjects());
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Container);