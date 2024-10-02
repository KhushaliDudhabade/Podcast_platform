import React from 'react'
import Header from '../Componenets/common/Header'
import CreatePodcastForm from '../Componenets/StartAPodcast/CreatePodcastForm'

function CreatePodcast() {
  
  return (
    <>
     <Header/>
      <div className='wrapper'>
        <h1>Create a Podcast</h1>
        <CreatePodcastForm/>
      </div>
        
    </>
  )
}

export default CreatePodcast