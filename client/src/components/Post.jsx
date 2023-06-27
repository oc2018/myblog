import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext, fetchData } from '../userContext';
import { Loading } from '../components';
import { dateFormatter } from '../utils/dateFormatter';

const Post = () => {
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
    <>
    { !postInfo ? <Loading /> : postInfo.map(post => (
      <div key={post._id} >
        <Link to={`/article/${post._id}`}>
          <div className="post">
            <div className="img">
                <img src={post.img.url} alt="pic" />
            </div>
            <div className="content">
                <h3>{ post.title }</h3>
                <div className="info">
                    <p className="author">{ post?.author?.username }</p>
                    <time>{ dateFormatter(post.createdAt) }</time>
                </div>
                <p className='summary'>{ post.summary }</p>
            </div>
          </div>
        </Link>
      </div>
    )) }
    </>
  )
}

export default Post