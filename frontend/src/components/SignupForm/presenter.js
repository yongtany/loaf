import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './styles.css'
import {  Link } from 'react-router-dom';

const SignupForm = props => (
    <div className = "signbackground">
          <br/>
          <br/>
<Form className = "signinform">
        <FormGroup className = "signintitle">
          <Label for="exampleEmail" >회원가입</Label>
          <Input plaintext>아래 내용을 입력해 주세요</Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleName">이름</Label>
          <Input type="name" name="name" id="exampleName" placeholder="Name" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">이메일</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">비밀번호</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="Password" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">비밀번호확인</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="Verify the password" />
        </FormGroup>
        <Button> Sumit </Button> 
        <hr/>
        <div>
          계정이 있습니까? 
          <Link to="/login">
                <Button> Login </Button>
                </Link> 
          </div>
          
        </Form>
        <br/>
        <br/>
            </ div>
)

export default SignupForm;