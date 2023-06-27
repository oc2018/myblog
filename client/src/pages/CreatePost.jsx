import React, { useState, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate } from 'react-router-dom';

import { UserContext, fetchData } from '../userContext';

const initialPostData = { title: '', summary: '', img: '', content: ''}

const CreatePost = () => {
    const [postData, setPostData] = useState( initialPostData );
    const { currentId, setCurrentId } = useContext( UserContext );
    const navigate = useNavigate();
    // console.log(currentId)

    const options =  {
        method: 'GET',
        headers: { 'Content-Type':'application/json' }
    }
    
    useEffect(() => {
        fetchData(`posts/${ currentId }`, options )
        .then(response => response.json())
        .then(postInfo => {

            // console.log({ ...postInfo });
            setPostData( { ...postInfo } );
            
        });

    },[ currentId ])

    const modules = {
        toolbar: [
            [{ 'header': [1,2, false]}],
            [ 'bold','italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ 'list': 'ordered'},{'list':'bullet'},{ 'indent': '-1'}, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ]
    }

    const formats = [
        'header',
        'bold','italic', 'underline', 'strike', 'blockquote', 'code-block',
        'list','bullet','indent',
        'link','image'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {

            // submit the form for edited post
            fetchData(`posts/${ currentId }`, {
                method: 'PATCH',
                headers: { 'Content-Type':'application/json' },
                body: JSON.stringify(postData),
                credentials: 'include',
            });

        }else {

            //submit form for new post
            fetchData('posts', {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
        }

        setCurrentId('');
        setPostData(initialPostData);
        navigate('/');
    };

    // console.log(postData);

    // convert file to base64
    const convertFile = (file) => {
        const reader = new FileReader();

        if(file) {
            reader.readAsDataURL(file);
            reader.onloadend =() => {
               setPostData({ ...postData, img: (reader.result) });
            }
        }
    }

    const handleImgUpload = (e) => {
        // get the image file from the input
        const file = e.target.files[0];

        convertFile(file);
    }


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
    <form>
        <input type="text" value={postData.title} onChange={(e)=>setPostData({ ...postData, title: e.target.value})} placeholder='Title' />
        <textarea rows={ 10 } type="text" value={postData.summary} onChange={(e)=>setPostData({ ...postData, summary: e.target.value })} placeholder='Summary' />
        <input type="file" accept='image/'  onChange={ () => handleImgUpload } />
        <ReactQuill value={postData.content} modules={modules} formats={formats} onChange={(newValue)=>setPostData({ ...postData, content: newValue })} />
        <button onClick={ handleSubmit }>{currentId ? 'Edit Post' : 'Create Post'}</button>
    </form>
   </section>
  )
}

export default CreatePost;