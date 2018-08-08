import React from 'react';
import { Button, Form, Label} from 'reactstrap';
import './styles.css'
import  {Link} from 'react-router-dom';


const MyProfile = (props) => {
  const { loggedInUser, loggedIn } = props;
  if(loggedIn){
    return (
      <div>
        <div className="container1">
          <div className="header">
          <p className="index">
            MyProfile
          </p>
          <div className="img">
          <img 
            className="creator_img" 
            src={loggedInUser.profile_image}
            alt={loggedInUser.name}
          />
          </div>
          </div>          
          <Form>
            <div className="name">
            <Label for="text">{loggedInUser.username}</Label>
            </div>
            <br/>
            <div className="area"><Label for="text">{loggedInUser.address}
            </Label>
            </div>
            <hr className="hr"/>
            <br/>
            <div className="univ">
            <Label for="text">{loggedInUser.school} {loggedInUser.major} 
            </Label>
            </div>
            <hr className="hr"/>
            <br/>
            <div className="intromy">
            <Label for="exampleText">
            {loggedInUser.bio}
            </Label>
            </div>
            <hr className="hr"/>
            <br/>
            <br/>
          </Form>
        </div>
        <div className ="container2">
          <div className="btnDiv">
          <Link to="/Friends/FriendsDetail">
            <Button className="btn">프로젝트 경험</Button>
          </Link>
          </div>
          <br/>
          <div className="interest">
          <p>관심분야 : {loggedInUser.tags}</p>
          </div>
          <hr className="hr"/>
          <br/>
        </div>
      </div>
    );
  } else {
    return (
      <div>
      </div>
    )
  }
};


export default MyProfile;