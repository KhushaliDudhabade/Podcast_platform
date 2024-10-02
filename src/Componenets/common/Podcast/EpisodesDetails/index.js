import React from 'react'
import Button from '../../Button'

function EpisodeDetails({index,title,description,audioFile,onClick}) {
  return (
    <div style={{width:"100%",marginBottom:"100px"}}>
       <h1 style={{textAlign:"left",marginBottom:"0"}}>{index}.{title}</h1> 
       <p style={{marginLeft:"1.5rem"}}>{description}</p>
       <Button text="Play" onClick={()=>onClick(audioFile)} style={{width:"200px !important"}}/>
    </div>
  )
}

export default EpisodeDetails