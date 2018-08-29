import React from 'react'
import './projectDetailDia.css';
import {Card, Button} from 'reactstrap';


const ProjectDetail = (props) => {
  const { project } = props;

  return (
    <div >
    <br/>
    <Card className="container1">
      <div className="header">
        <p className="index">
          Project Details
        </p>
        <img 
            src={project.file} 
            className="project_img"
            alt={project.name}
        />
      </div>

      <div className="project_title">
        <p className = "title">{}</p>
        <p className = "count">
          {project.member_count}/{project.max_member} 명
          <span className = "apply_btn"> <Button className = "btn"> <i class="fas fa-angle-right"></i> 지원하기 </Button></span>
        </p>
      </div>

      <div className = "creator">
      <div >
        <img 
            src = {project.creator.profile_image} 
            className = "creator_img" 
            alt={project.name}
        />
        </div>
        <div className = "creator_profile">
        <p className = "creator_name"><span className = "name">{project.creator.username} </span> 님의 소개  </p>
        <p className = "creator_univ"> {project.creator.school} </p>
        <p className = "creator_bio"> {project.creator.bio} </p>
        </div>
      </div>

      <div className = "project_body">
        <p className = "intro1">프로젝트 개요</p>
        <p className = "project_caption"> {project.caption}</p>
      </div>

      <div className = "member">
        <p className = "intro2"> 참가자</p>
        <img 
            className = "member_photo"
            src = {project.join[0].profile_image}
            alt={project.name}
        />
      </div>
      <div className = "interest">
        <p className = "intro3"> <i class="fas fa-tags"></i>프로젝트 태그 
        <span className = "tags"> &nbsp;  {project.tags} </span></p>
        <br/>
      </div>
      <hr/>
      <div>
      </div>
      <br/><br/>
    </Card>
    <br/>
    </div>
  )
}

export default ProjectDetail;