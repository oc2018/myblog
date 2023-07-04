import React, { useState, useContext, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Editor } from '../components';
import { UserContext, fetchData } from '../userContext';


const CreatePost = () => {
    const [content, setContent] = useState('')
    const [summary, setSummary] = useState('')
    const [title, setTitle] = useState('')
    const { currentId, setCurrentId } = useContext( UserContext );
    const [files, setFiles] = useState('')
    const navigate = useNavigate();

    const data = new FormData();
        data.set('title', title);
        data.set('content', content);
        data.set('summary', summary);
        if(files?.[0]) {

            data.set('file', files?.[0]);

        }

    const options =  {
        method: 'GET',
        headers: { 'Content-Type':'application/json' }
    }
    
    useEffect(() => {
        fetchData(`posts/${ currentId }`, options )
        .then(response => response?.json())
        .then(postInfo => {
            if(currentId) {                
                setContent(postInfo.content)
                setTitle(postInfo.title)
                setSummary(postInfo.summary)
                // setFiles(postInfo.files)
            };

              
        });

    },[ currentId ])

   
    const handleSubmit = async(e) => {
        e.preventDefault();

        if(currentId) {

            // submit the form for edited post
            const response = await fetchData(`posts/${ currentId }`, {
                method: 'PATCH',
                body: data,
                credentials: 'include',
            });

            if(response.ok) {
                navigate(`/article/${ currentId }`);
            }

        }else {

            //submit form for new post
            const response = await fetchData('posts', {
                method: 'POST',
                body: data,
                credentials: 'include',
            })

        if(response.ok ) {
            navigate('/');
        }

        }

        setTitle('');
        setContent('');
        setSummary('');
        setFiles('');
        setCurrentId('');
    };

  return (
   <section className='form'>
    <div className='create_article'>
        <div>
            <h2>{ currentId ? 'Edit Article' : 'Create an Article' }</h2>
        </div>
        <div>
            <Link to={'/'}><img src="https://llamdodu.sirv.com/icodeThis/close-outline.svg" alt="close" width='30px'/></Link>
        </div>
    </div>
    <form encType="multipart/form-data">
        <input type="text" value={title} onChange={ e =>setTitle( e.target.value )} placeholder='Title' />
        <textarea rows={ 10 } type="text" value={summary} onChange={ e =>setSummary( e.target.value )} placeholder='Summary' />
        <input type="file"  accept=".png, .jpg, .jpeg, .webp" onChange= { e => setFiles(e.target.files) } />
        <Editor content={content} handleChange={(newValue)=>setContent( newValue )} />
        <button onClick={ handleSubmit }>{currentId ? 'Edit Post' : 'Create Post'}</button>
    </form>
   </section>
  )
}

export default CreatePost;