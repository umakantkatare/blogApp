/* eslint-disable no-unused-vars */
import React,{useEffect, useState} from 'react'
import { Container, PostForm} from '../components/Index'
import service from '../appwrite/Database'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [posts, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (slug) {
            service.getPosts(slug)
            .then((post) => {
                if (post) {
                    setPosts(post)
                    
                }
            })
            
        }
        else{
            navigate('/')
        }

    },[slug,navigate])
  return posts ? (
    <div className=' py-8'>
        <Container>
            <PostForm post={posts}/>
        </Container>
        
    </div>
  ) : null
}

export default EditPost