import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

function PodcastCard({id,title,displayImage}) {
  return (
    <Link to={`/podcast/${id}`}>
    <div className='podcast-card' key={id}>
    <img src={displayImage} className='display-image'></img>
    <p className='display-title'>{title}</p>
    </div>
    </Link>
  )
}

export default PodcastCard