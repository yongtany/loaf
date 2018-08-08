import React from 'react';
import PropTypes from 'prop-types';
import { Form, Label, Input, Col } from 'reactstrap';
import './styles.css'
import { InputTagsContainer } from 'react-input-tags';
import ImageUploader from 'react-images-upload';

const RegisterProfile = (props) => {
    return (
    <div className="container1">
        <div className="header">
        <p className="index">
            MyProfile
        </p>
        </div>  
        <Form onSubmit = {props.handleSubmit}>
            <div className="img">
            <ImageUploader
                className="creator"
                withIcon={true}
                buttonText='Choose images'
                name="file" 
                onChange={props.onDrop}
                imgExtension={['.jpg', '.jpeg', '.gif', '.png', '.gif', '.PNG']}
                maxFileSize={52428800}
            />
            </div>
            <br/>
            <br/>
            <br/>
            <div className="text">
            <Label for="text">지역</Label>
            <Col>
                <Input type="text" 
                    name="address" 
                    id="exampleEmail" 
                    value={props.addressValue}
                    placeholder="시/구를 입력하세요."
                    onChange={props.handleInputChange} />
            </Col>
            </div>
            <div className="text">
            <Label for="text">소속 대학교</Label>
            <Col>
                <Input type="text" 
                    name="school" 
                    id="exampleEmail" 
                    value={props.schoolValue}
                    placeholder="소속을 입력하세요."
                    onChange={props.handleInputChange} />
            </Col>
            </div>
            <div className="text">
            <Label for="text">학과</Label>
            <Col>
                <Input type="text" 
                    name="major" 
                    id="exampleEmail" 
                    value={props.majorValue}
                    placeholder="학과를 입력하세요."
                    onChange={props.handleInputChange} />
            </Col>
            </div>
            <div className="text">
            <Label for="text">홈페이지</Label>
            <Col>
                <Input type="url_field" 
                    name="website" 
                    id="exampleEmail" 
                    value={props.websiteValue}
                    placeholder="홈페이지를 입력하세요."
                    onChange={props.handleInputChange} />
            </Col>
            </div>
            <div className="text">
            <Label for="exampleText">자기소개</Label>
            <Col>
                <Input type="textarea" 
                    name="bio" 
                    id="exampleText"
                    value={props.bioValue}
                    onChange={props.handleInputChange} />
            </Col>
            <hr className="hr"/>
            </div> 
            <div className="tag">
            <Label>관심분야</Label>
            <InputTagsContainer
                className="tags"
                tags={props.tags}
                handleUpdateTags={props.tagsValue}
            />
            <div className="btnDiv">
                <button className="btn">등록</button>
            </div> 
            </div> 
            </Form>
        </div>
  );
};


RegisterProfile.propTypes = {
    profile_imageValue : PropTypes.func.isRequired,
    addressValue : PropTypes.string.isRequired,
    schoolValue : PropTypes.string.isRequired,
    majorValue : PropTypes.string.isRequired,
    websiteValue : PropTypes.string.isRequired,
    bioValue : PropTypes.string.isRequired,
    tagsValue : PropTypes.func.isRequired,
    tags : PropTypes.array.isRequired,
    handleInputChange : PropTypes.func.isRequired,
    handleSubmit : PropTypes.func.isRequired,
//  handleFileSelect : PropTypes.func.isRequired,
}

export default RegisterProfile;