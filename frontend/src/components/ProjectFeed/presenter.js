import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading/Spinner';
import ProjectsItem from '../ProjectItem';

const ProjectFeed = props => {
    if(props.loading) {
        return <LoadingFeed />
    } else if(props.feed){
        return <RenderFeed {...props} />
    }
}

const LoadingFeed = props => (
    <div>
        <Loading />
    </div>
);


const RenderFeed = props => (
    <div>
        <br/>
      <h1>
        &nbsp; #프로젝트
      </h1>
      <br></br>
        {props.feed.map(project => <ProjectsItem { ...project} key={project.id} />)} 
    </div>
)

ProjectFeed.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default ProjectFeed;