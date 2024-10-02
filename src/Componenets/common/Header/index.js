import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import './styles.css';

function Header() {
    const location=useLocation();
    const currentPath = location.pathname;
  return (
    <div className='navbar'>
        <div className='gradient'></div>
        <div className='links'>
            <Link to='/' className={currentPath==="/" ?"active":""}>Signup</Link>
            <Link to='/Podcast' className={currentPath==="/Podcast" ?"active":""}>Podcasts</Link>
            <Link to='/CreatePodcast' className={currentPath==="/Podcast-start" ?"active":""}>Start A Podcast</Link>
            <Link to='/Profile' className={currentPath==="/Profile" ?"active":""}>Profile</Link>
        </div>
    </div>
  )
}

export default Header