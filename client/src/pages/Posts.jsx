import React, { useEffect, useContext } from 'react';
import { Post, Loading } from '../components';

import { UserContext, fetchData } from '../userContext';

const Posts = () => {

  const { postInfo, setPostInfo } = useContext(UserContext);

  const options =  {
    method: 'GET',
    headers: {'Content-Type':'application/json'}
  }
  useEffect(()=> {
  
    try {
      fetchData(`posts`, options )
      .then(response => response.json())
        .then( postInfo => {
          setPostInfo(postInfo);
        })
      
    } catch (error) {

      console.log(error);

    }
  }, [])

  return (
    !postInfo ? <Loading /> : <>
      {  postInfo?.map(post => (
        <Post key={post?._id} post = { post } />
      )) }
    </>
  )
}

export default Posts