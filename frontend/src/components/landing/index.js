import React from 'react';
import { Card, Button, CardFooter, CardBody,
  CardTitle, CardText} from 'reactstrap';
import './Landing.css'


const Landing = (props) => {
    return(
      <div>

      <Card>
        <CardBody className = "page1">
          <br/><br/><br/>
          <CardTitle className = "page1_title">대학생 프로젝트 커뮤니티 LOAF <br/>
          생각만 하던 프로젝트, 이제는 실현시켜 보자.</CardTitle>
          <br/><br/>
          <CardText className = "page1_text"><i class="fas fa-check"></i> LOAF의 의미는 중의적이다.</CardText>
          <CardText className = "page1_text"><i class="fas fa-check"></i> LOAF는 빵 덩어리에 불과 할 수도 있지만</CardText>
          <CardText className = "page1_text"><i class="fas fa-check"></i> 많은 이에게 꿈과 희망을 줄 수 있다.</CardText>
          <br/><br/> <br/>
        </CardBody>
        
        <CardFooter body inverse style={{ backgroundColor: '#c4abc9', borderColor: '#c4abc9' }}>
          <br/>
          <CardTitle className = "page2_title">프로젝트 보기  </CardTitle>
          <br/>
          <CardText className = "page2_text"><i class="fas fa-check"></i> LOAF의 의미는 중의적이다.</CardText>
          <CardText className = "page2_text"><i class="fas fa-check"></i> LOAF는 빵 덩어리에 불과 할 수도 있지만</CardText>
          <CardText className = "page2_text"><i class="fas fa-check"></i> 많은 이에게 꿈과 희망을 줄 수 있다.</CardText>
          <Button className = "page2_btn">바로가기</Button>
          <br/><br/>
        </CardFooter>

      </Card>

      <Card>
        <CardBody className = "page3">
          <br/>
          <CardTitle className = "page3_title">친구 찾기</CardTitle>
          <br/>
          <CardText className = "page3_text"><i class="fas fa-check"></i> LOAF의 의미는 중의적이다.</CardText>
          <CardText className = "page3_text"><i class="fas fa-check"></i> LOAF는 빵 덩어리에 불과 할 수도 있지만</CardText>
          <CardText className = "page3_text"><i class="fas fa-check"></i> 많은 이에게 꿈과 희망을 줄 수 있다.</CardText>
          <Button className = "page3_btn">바로가기</Button>
          <br/><br/>
        </CardBody>
      </Card>

      
      <Card>
        <CardBody className = "page4">
          <br/>
          <CardTitle className = "page4_title1"><i class="fas fa-tree"></i> VALUES</CardTitle>
          <CardText className = "page4_text1"> Sound Mind<br/>Sound Person<br/>Sound Teamwork</CardText>
          <CardTitle className = "page4_title2"><i class="fas fa-flag-checkered"></i> MISSION</CardTitle>
          <CardText className = "page4_text2"> 전 세계의 아마추어들을<br/>연결한다.<br/>
          원하는 모든 프로젝트를<br/>함께 한다.<br/>프로젝트를 통해<br/>성장한다.</CardText>
          <CardTitle className = "page4_title3"><i class="far fa-eye"></i> VISION</CardTitle>
          <CardText className = "page4_text3"> 아마추어들의<br/>경계없는<br/>성장공간</CardText> 
          <br/>
        </CardBody>
      </Card>
      
    </div>
    );
    
} 
export default Landing;