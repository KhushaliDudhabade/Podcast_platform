import React, { useEffect,useState } from 'react'
import Header from '../Componenets/common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { collection, onSnapshot, query, QuerySnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { setPodcasts } from '../slices/PodcastSlice';
import PodcastCard from '../Componenets/common/Podcast/PodcastCard';
import InputComponent from '../Componenets/common/Inputs';


function PodcastsPage() {
  const Podcasts=useSelector((state)=>state.podcasts.podcasts);
  const dispatch=useDispatch();
  const[search,setSearch]=useState("");

  useEffect(()=>{
    const unsubscribe=onSnapshot(
      query(collection(db,"podcasts")),
      (querySnapshot)=>{
        const podcastsData=[];
        querySnapshot.forEach((doc)=>{
          podcastsData.push({id:doc.id,...doc.data()});
        });
        dispatch(setPodcasts(podcastsData));
      },
      (error)=>{
        console.error("Error fetcing podcasts:",error);
      }
    );
    return()=>{
      unsubscribe();
    };
  },[dispatch]);

  var filteredPodcasts=Podcasts.filter((item)=>item.title.trim().toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
        <Header/>
        <div className='wrapper' style={{marginTop:"1rem"}}>
        <h1>Discover Podcasts</h1>
        <InputComponent state={search} 
        setState={setSearch} 
        placeholder="Search By Title" 
         type="text"
        />
        {filteredPodcasts.length>0?
        <div className='podcast-flex'>{filteredPodcasts.map((item)=>{
          return <PodcastCard key={item.id} id={item.id} title={item.title} displayImage={item.displayImg}/>
        })}</div>:<p>No Podcast found on this Platform !</p>}
        </div>
        
    </div>
  )
}

export default PodcastsPage