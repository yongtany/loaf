import React from 'react';
import './styles.css';
import { Col, Button, Form, FormGroup, Label, Input,Row } from 'reactstrap';
import PropTypes from 'prop-types';
//import { InputTagsContainer } from 'react-input-tags';
import ImageUploader from 'react-images-upload';

const RegisterProject = (props) => {
  return(
        <div className="background">
        <br/><br/>        
        <Form className="form" onSubmit={props.handleSubmit} >
        <Row>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;새로운 프로젝트 만들기 </Row><hr color="black" /> 
         <FormGroup row className="formgroup">
        <Col sm={12}>
          <ImageUploader
              withIcon={true}
              buttonText='Choose images'
              name="file" 
              onChange={props.onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif', '.PNG']}
              maxFileSize={5242880}
          />
        </Col>
        </FormGroup>
        <br/>   
        
        <FormGroup className="formgroup" row>
          <Col sm={12}>
            <Input 
            type="text" 
            name="title" 
            id="project_title" 
            placeholder="프로젝트 제목..."
            value={props.projectTitle}
            onChange={props.handleInputChange} />
          </Col>
        </FormGroup>
        <br/>   

        <FormGroup row className="formgroup">
          <Col sm={12}>
            <Input 
            className="textarea"
            type="textarea" 
            name="caption" 
            id="project_content"
            placeholder="프로젝트 내용을 입력해주세요..." 
            value={props.projectContent}
            onChange={props.handleInputChange}
            />
          </Col>
        </FormGroup>
        <br/>   
        
        <FormGroup row className="formgroup">
        <Label for="selectMember" sm={2}>모집인원</Label>
          <Col sm={12}>
          <Input 
            className="textarea"
            type="text" 
            name="max_member" 
            id="max_member"
            placeholder="최대 인원수를 설정하세요..." 
            value={props.max_member}
            onChange={props.handleInputChange}
            />
          </Col>
          </FormGroup>
          <br/>   
            
          <FormGroup row className="formgroup"> 
          <Label for="schedule" sm={2}>일정</Label>
          <Col sm={12}>
          <Input 
            className="textarea"
            type="textarea" 
            name="schedule" 
            id="schedule"
            placeholder="프로젝트 내용을 입력해주세요..." 
            value={props.schedule}
            onChange={props.handleInputChange}
            />
          </Col>
      
        </FormGroup>
        <br/>  

        <FormGroup className="formgroup" row>
          <Label for="project_tags" sm={2}>관심분야</Label>
          <Col sm={12}>
          <Input 
            className="textarea"
            type="textarea" 
            name="tags" 
            id="tags"
            placeholder="관심분야를 입력해주세요." 
            value={props.tags}
            onChange={props.handleInputChange}
            />
          </Col>
        </FormGroup>
        <br/>  

      <FormGroup check row className="formgroup">
          <Col sm={{ size: 7, offset: 2 }}>
          <div className="div.button">
            <Button type="submit" value="프로젝트등록" >Submit</Button></div>
          </Col>
        </FormGroup>
        </Form>
        <br/>
        <br/>
        <br/>
        </div>
    );
  };
 
RegisterProject.propTypes={
  projectTitle: PropTypes.string.isRequired,
  projectContent: PropTypes.string.isRequired,
  project_member: PropTypes.string.isRequired,
  schedule: PropTypes.string.isRequired,
  //tagsValue: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onFileLoaded: PropTypes.func.isRequired
}



export default RegisterProject;