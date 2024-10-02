import React, { useEffect, useState } from 'react'
import Header from '../Componenets/common/Header'
import { useNavigate, useParams } from 'react-router-dom'
import { collection, doc, getDoc, onSnapshot, query, QuerySnapshot } from 'firebase/firestore';
import { auth, db } from './firebase';
import { toast } from 'react-toastify';
import Button from '../Componenets/common/Button';
import EpisodeDetails from '../Componenets/common/Podcast/EpisodesDetails';
import AudioPlayer from '../Componenets/common/Podcast/AudioPlayer';

function PodcastDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [podcast, setPodcast] = useState({});
    const [episodes, setEpisodes] = useState([]); 
    const [playing,setPlaying]=useState("");
    useEffect(() => {
        if (id) {
            getData();
        }
    }, [id]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "podcasts", id, "episodes")),
            (querySnapshot) => {
                const episodesData = []; // Initialize the episodesData array
                querySnapshot.forEach((doc) => {
                    episodesData.push({ id: doc.id, ...doc.data() });
                });
                setEpisodes(episodesData); // Set the episodes data after looping through
            },
            (error) => {
                console.error("Error fetching episodes:", error);
            }
        );
        return () => {
            unsubscribe(); // Return unsubscribe function to clean up the listener
        };
    }, [id]);

    const getData = async () => {
        try {
            const docRef = doc(db, "podcasts", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setPodcast({ id: id, ...docSnap.data() });
                toast.success("Podcast Found!");
            } else {
                toast.error("No such podcast!");
                navigate("/podcast");
            }
        } catch (e) {
            toast.error(e.message);
        }
    };

    return (
        <div>
            <Header />
            <div className='wrapper'>
                {podcast.id && (
                    <>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <h1 className='podcast-title-heading'>{podcast.title}</h1>
                            {podcast.createdBy === auth.currentUser.uid && (
                                <Button
                                    style={{ width: "200px", margin: "1rem" }}
                                    text={"Create Episodes"}
                                    onClick={() => {
                                        navigate(`/podcast/${id}/create-episode`);
                                    }}
                                />
                            )}
                        </div>
                        <div className='banner-wrapper'>
                            <img src={podcast.bannerImg} alt="Podcast Banner" />
                        </div>
                        <p className='podcast-desc'>{podcast.description}</p>
                        <h1 className='podcast-title-heading'>Episodes</h1>
                        {episodes.length>0?
                        <>{episodes.map((episode,index)=>{
                          return <EpisodeDetails 
                          key={index} 
                          index={index+1} 
                          title={episode.title} 
                          description={episode.description} 
                          audioFile={episode.audioFile} 
                          onClick={(file)=>{setPlaying(file)}}/>
                        })}</>
                        :<p>No episodes found</p>}
                        <div>
                            {episodes.map((episode) => (
                                <div key={episode.id}>
                                    {/* <h3>{episode.title}</h3>
                                    <p>{episode.description}</p> */}

                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            {playing && <AudioPlayer audioSrc={playing} image={podcast.displayImg}/>}
        </div>
    );
}

export default PodcastDetails;
