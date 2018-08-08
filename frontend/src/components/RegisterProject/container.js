import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RegisterProject from './presenter';

//file, title, caption, max_member, start_schedule, end_schedule, tags)
class Container extends Component {
    state = {//이미지, 프로젝트제목, 내용, 모집인원, 시작날짜, 끝날짜
        file: "",//프로젝트 이미지
        title : "",//프로젝트 제목
        caption: "",//프로젝트 내용
        max_member: 0,//모집인원
        schedule: "",//시작날짜
        //end_schedule: "",//끝날짜
        tags:[ ],//관심분야
        pictures: []
    };

    static propTypes ={//!!
        createProject: PropTypes.func.isRequired
    };

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    onDrop = this.onDrop.bind(this);
    
    render() {
        const { file, title, caption, max_member, schedule, tags } = this.state;
        return (
        <RegisterProject
            porjectImg={file}
            projectTitle={title}
            projectContent={caption}
            project_member={max_member}
            schedule={schedule}
          //  endDate={end_schedule}
            tags={tags}
            tagsValue={this._handleUpdateTags}
            handleInputChange={this._handleInputChange}
            handleSubmit={this._handleSubmit}
            onFileLoaded={this._handleLoadLocalFile}
        />
        )
    };

    _handleInputChange = event => {
        const { target : { value, name}} = event;
        this.setState({
            [name] : value
        });
    }
    _handleSubmit = event => {
        const { createProject } = this.props;
        const {file, title, caption, max_member, schedule, tags } = this.state;
        event.preventDefault();
        // redux will be here
        createProject(file, title, caption, max_member, schedule, tags);    
    }

    _handleUpdateTags = (tags) => {
        this.setState({ tags });
    }

    _handleLoadLocalFile = event => {
        event.preventDefault();
        const reader = new FileReader();
        const file = event.target.files[0];

        if(file){
            reader.onloadend = () => 
                this.props.onFileLoaded(reader.result);
            reader.readAsDataURL(file);
        }else{
            alert('File uploaded is not valid.');
        }
    }

}

export default Container;
