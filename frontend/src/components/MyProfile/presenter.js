import React from 'react';
import { Button, Form, Label} from 'reactstrap';
import './styles.css'
import  {Link} from 'react-router-dom';
import Loading from 'components/Loading';



const MyProfile = (props) => {
  const { loggedInUser, loggedIn } = props;
  if(loggedIn){
    return (
      <div>
        <div className="container1">
          <h4 className="projectTitle"> My Profile </h4>
          <img 
            className="rounded-circle img-fluid d-block mx-auto" 
            src={loggedInUser.profile_image}
            alt={loggedInUser.name}
          /> 
          <Form>
            <Label for="text" className="name">이름</Label>
            <div>{loggedInUser.username}</div>
            <br/>
            <Label for="text" className="area">지역
            <div>{loggedInUser.address}</div>
            <hr className="hr"/>
            </Label>
            <br/>
            <Label for="text" className="univ">소속 대학교 / 학과
            <div>{loggedInUser.school} {loggedInUser.major} </div>
            <hr className="hr"/>
            </Label>
            <br/>
            <Label for="exampleText" className="intromy">자기소개
            <div>{loggedInUser.bio}</div>
            <hr className="hr"/>
            </Label>
            <br/>
            <br/>
          </Form>
        </div>
        <div className ="project">
          <div className="btnDiv">
          <Link to="/Friends/FriendsDetail">
            <Button className="btn">프로젝트 경험</Button>
          </Link>
          </div>
          <br/>
          <Label for="exampleText" className="interest">관심분야</Label>
          <div>{loggedInUser.tags}</div>
          <hr className="hrbutton"/>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Loading />
      </div>
    )
  }
};


export default MyProfile;