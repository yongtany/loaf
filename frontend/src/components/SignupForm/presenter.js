import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import './styles.css'
import PropTypes from 'prop-types';

const SignupForm = props => (
    <div className = "signbackground">
          <br/>
          <br/>
<Form className = "signinform" onSubmit = {props.handleSubmit}>
        <FormGroup className = "signintitle">
          <Label for="exampleEmail" >회원가입</Label>
          <Input plaintext>아래 내용을 입력해 주세요</Input>
        </FormGroup>

        <FormGroup>
          <Label for="exampleName">닉네임</Label>
          <Input 
            type="username" 
            name="username" 
            value = {props.usernameValue}
            placeholder="User Name" 
            onChange = {props.handleInputChange}  
          />
        </FormGroup>

        <FormGroup>
          <Label for="exampleEmail">이메일</Label>
          <input 
            type="email" 
            name="email" 
            value = {props.emailValue} 
            placeholder="Email" 
            onChange = {props.handleInputChange} 
            />
        </FormGroup>

        <FormGroup>
          <Label for="exampleName">이름</Label>
          <Input 
            type="name" 
            name="name" 
            value = {props.nameValue}
            placeholder="Name" 
            onChange = {props.handleInputChange}  
          />
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword">비밀번호</Label>
          <Input 
             type="password" 
             name="password1" 
             value={props.password1Value}
             placeholder="Password" 
             onChange={props.handleInputChange}
           />
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword">비밀번호 확인</Label>
          <Input 
             type="password" 
             name="password2" 
             value={props.password2Value}
             placeholder="Password" 
             onChange={props.handleInputChange}
           />
        </FormGroup>
 
        <hr/>
        <div>
        <Input type="submit" value="회원가입"/> 
          </div>
          
        </Form>
        <br/>
        <br/>
            </ div>
)

SignupForm.propsTypes = {
  usernameValue: PropTypes.string.isRequired,
  emailValue: PropTypes.string.isRequired,
  nameValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default SignupForm;