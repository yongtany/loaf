import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'reactstrap';
import './styles.css';
import {Link} from 'react-router-dom';


const ProjectsItem = (props) => {
    const { project } = props;
    return (

    <div className="projectItem_container">
      
      <Card className = "project_card">
        <div className = "header">
          <p className = "projectItem_intro1">Project</p>
        </div>
        <Link to = "/projects/projectDetail">
        <div>
        <img 
            className = "projectItem_img"
            src= {project.file}
            alt = {project.title}
          />
        </div>
        </Link>
        <div className = "project_summary">
          <div>
            <img
            className = "projectItem_creator_img"
            src= {project.creator.profile_image}
            alt = {project.creator.username}
            />
          </div>
          <div className = "project_title">
            <p className = "projectItem_title"> {project.caption} </p>
          </div>

          <div className = "projectItem_project_prop">
            <p className = "max_member"> 3/{project.max_member}명
              <span className = "region"> {project.creator.address} </span> 
            </p>
          </div>

        </div>
      </Card>

      <br/>
    </div>
  );
}

ProjectsItem.propsTypes = {
  file:PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  max_member : PropTypes.number.isRequired,
  schedule: PropTypes.string.isRequired,
  tags:PropTypes.array.isRequired,
}


export default ProjectsItem;