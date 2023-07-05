import React from 'react';
import { Link } from 'react-router-dom';

import { dateFormatter } from '../utils/dateFormatter';
import { Loading } from '../components';
import { baseUrl } from '../userContext';

const Post = ({ post }) => {
  // console.log(`${baseUrl}/${post?.img}`)

  return (
    <>
      {!post ? <Loading /> : (
        <div >
          <Link to={`/article/${post._id}`}>
            <div className="post">
              <div className="img">
                  <img src={`${post?.img}`} alt="pic" />
              </div>
              <div className="content">
                <div className="summary">
                  <h3>{ post.title }</h3>
                  <div className="info">
                    <p className="author">{ post?.author?.username }</p>
                    <time>{ dateFormatter(post.createdAt) }</time>
                  </div>
                  <p className='summary'>{ post.summary }</p>
                </div>
                <div className="readMore">
                  Read Article...
                </div>
              </div>
            </div>
          </Link>
        </div>

      )}
    </>
  )
}

export default Post