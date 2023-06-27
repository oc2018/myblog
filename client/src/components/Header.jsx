import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext';
import { fetchData } from '../userContext';

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(()=> {
    fetchData('auth/profile', {
      credentials: 'include',
    }).then( response => response.json()
    .then( userInfo => {
      setUserInfo(userInfo);
    }
    ))
  },[setUserInfo]);
  
  const logout = async() => {
    await fetchData('auth/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null)
  }
  
  return (
    <header>
      <div className='headerContent'>
        <Link className="logo">Blog</Link>
        <nav>
          <div className='home'>
            <Link to={'/'}>Home</Link>
          </div>
          { 
            userInfo?.user ? (
              <>
              <Link to={'/create'}>Create new Post</Link>
              <Link href="/getUser">
                <div className='user'>
                <img className='avatar' src="https://llamdodu.sirv.com/icodeThis/ionicons.designerpack/person-outline.svg" alt="user.username" />
                  <p className="username">
                    { userInfo?.user }
                  </p>
                </div>
              </Link>
              <button className='logout' onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <Link className='login' to="/login">Login</Link>
              </>
            )
          }
          
        </nav>
      </div>
    </header>
  )
}

export default Header;