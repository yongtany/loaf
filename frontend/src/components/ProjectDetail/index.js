import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as projectAction } from '../../redux/modules/projects';

const mapStateToProps = (state, ownProps) => {//feed, projectId스테이트를 가져옴
    const { projects: { project } } = state;
    return {
        project
    }
}


const mapDispatchToProps = ( dispatch, ownProps) => {//정의한 api를 사용한다.
    
    return {
        getProject: (id) => {
            dispatch(projectAction.getProject(id));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Container);