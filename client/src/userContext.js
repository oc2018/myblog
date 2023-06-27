import { createContext, useState } from 'react';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [postInfo, setPostInfo] = useState([]);
    const [currentId, setCurrentId] = useState('')
   

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo, postInfo, setPostInfo, currentId, setCurrentId }}>
            { children }
        </UserContext.Provider>
    );

    
}

export const baseUrl = 'https://myblog-five-sepia.vercel.app/'

export const fetchData = async( url, options ) => {
    try {
       const data = await fetch(`${ baseUrl }/${url}`,  options )
    //    console.log( data )
        return data;
    } catch (error) {
        console.log(error);        
    }
}


