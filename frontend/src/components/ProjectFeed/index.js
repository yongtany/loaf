import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as projectAction } from '../../redux/modules/projects';

const mapStateToProps = (state, ownProps) => {
    const { projects: { feed } } = state;
    return {
        feed
    }
}


const mapDispatchToProps = ( dispatch, ownProps ) => {
    return {
        getFeed: () => {
            dispatch(projectAction.getFeed());
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Container);