import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext, fetchData } from '../userContext';

const initialState = {username: '', password: '', email: '',confirmPassword: ''};

const Login = () => {

    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();
    const { setUserInfo,  } = useContext(UserContext)

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (isSignUp) {
            try {
                await fetchData('auth/signup', {
                    method: 'POST',
                    body: JSON.stringify( formData ),
                    headers: {'Content-Type': 'application/json' },
                    credentials: 'include',
                });                
            } catch (error) {
                alert('Sign useParams, Failed try again Later');
                console.log(error);
            }
            alert('Sign up successful, sign in');
            setIsSignUp(false)
        } else {
            try {
                const response = await fetchData('auth/login', {
                    method: 'POST',
                    body: JSON.stringify( formData ),
                    headers: {'Content-Type': 'application/json' },
                    credentials: 'include',
                });  
                // console.log(response)
                if (response.ok){
                    response.json().then(userInfo => {
                        setUserInfo(userInfo)
                        navigate('/');
                    });
                } else {
                    alert('Login Failed, Wrong credentials');
                }
                // alert('Login successful');            
            } catch (error) {
                alert('Login failed please try again later'); 
                console.log(error);   
            }
        }
        setFormData( initialState );
    };
  return (
    <div className='login form'>
        <h2 className='loginHeader'>{isSignUp ? 'Sign Up': 'Login'}</h2>
        <Link to={'/'} className="close">continue reading...</Link>
    <form >
        {isSignUp && <input type="text" placeholder='username' value={formData.username} onChange={(e)=>setFormData({ ...formData, username: e.target.value})} />}
        <input type="email" placeholder='Email' value={formData.email} onChange={(e)=>setFormData({ ...formData, email: e.target.value})} />
        <input type="password" placeholder='password' value={formData.password} onChange={(e)=>setFormData({ ...formData, password: e.target.value})} />
        {isSignUp && <input type="password" placeholder='confirmPassword' value={formData.confirmPassword} onChange={(e)=>setFormData({ ...formData, confirmPassword: e.target.value})} />}
        <button onClick={ handleSubmit }>{isSignUp ? 'Sign up' : 'Login'}</button>
                
    </form>
        <button className='switch' onClick={()=>setIsSignUp((prevState)=> !prevState)} >{ isSignUp ? 'Already a member? Login': 'Not a member? Sign up'}</button>
    </div>
  )
}

export default Login