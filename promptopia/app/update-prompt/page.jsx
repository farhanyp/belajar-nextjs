"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from "react"
import Form from "@/components/Form"

const EditPrompt = () => {

    const router = useRouter()
    const params = useSearchParams()
    const promptId = params.get('id')
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })
    
    useEffect(() => {
        const fetchDetailPost = async () => {
          const response = await fetch(`/api/prompt/${promptId}`)
          const data = await response.json()
          
          setPost(data)
        }
        
        if(promptId) fetchDetailPost()
      }, [promptId]);

    const editPrompt = async (e) => {
      e.preventDefault()
      setSubmitting(true)

      try {
        const response = await fetch(`/api/prompt/${promptId}`,{
          method: 'PATCH',
          body: JSON.stringify({
            prompt:post.prompt,
            tag:post.tag
          })
        })

        if(response.ok){
          router.push('/')
        }
      } catch (error) {
        console.log(error)
      }finally{
        setSubmitting(false)
      }

    }

  return (
    <Form
    type="Edit"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={editPrompt}/>
  )
}

export default EditPrompt
