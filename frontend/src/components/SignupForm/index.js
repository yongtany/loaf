import { connect } from 'react-redux';
import Container from './container';
import { actionCreators  as userActions } from '../../redux/modules/users';

const mapDispatchToProps = (dispatch, ownProps) => {//action을 가지고옴
    return{
        createAccount: (username, email, name,password1, password2) => {
            dispatch(userActions.createAccount(username, email, name,password1, password2))//users에서 정의된것을 호출
        }
    }
}

export default connect(null,mapDispatchToProps)(Container);