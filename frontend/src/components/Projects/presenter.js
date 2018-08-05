import React from 'react';
import './style.css';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardSubtitle,
  CardTitle,
  Button
} from 'reactstrap';
import image from '../showProject/download.jpg';
import {Link} from 'react-router-dom';

const Projects = (props) => {
  return (

    <div className="container">
      <br/>
      <h1>
        &nbsp; #프로젝트
      </h1>
      <br></br>
      <div className="row">
        <div className="col-lg-3 col-md-4 col-sm-6 portfolio-item">
          <Card className="card h-100">
            <CardImg top width="100%" src={image}/>
            <CardBody className="card-body">
              <CardTitle className="card-title">Card title</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>Some quick example text to build on the card title and make up the
                bulk of the card's content.</CardText>
              <Link to="/projects/projectDetail">
                <Button>
                  details
                </Button>
              </Link>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Projects;