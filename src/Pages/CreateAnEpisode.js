import React, { useState } from 'react';
import Header from '../Componenets/common/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import InputComponent from '../Componenets/common/Inputs';
import { toast } from 'react-toastify';
import Button from '../Componenets/common/Button';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db, storage } from './firebase';
import './../Componenets/StartAPodcast/style.css'

function CreateAnEpisode() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [audioFile, setAudioFile] = useState(null); // Ensure this is a File object
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const handleEpisode = async () => {
        setLoading(true);
        if (title && desc && audioFile) {
            try {
                const audioRef = ref(
                    storage,
                    `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
                );
                // Upload the audio file to Firebase Storage
                await uploadBytes(audioRef, audioFile);

                // Get the download URL for the uploaded file
                const audioURL = await getDownloadURL(audioRef);
                
                const episodeData = {
                    title: title,
                    description: desc,
                    audioFile: audioURL,
                };

                // Save episode data to Firestore
                await addDoc(
                    collection(db, "podcasts", id, "episodes"),
                    episodeData
                );

                toast.success("Episode Created Successfully");
                navigate(`/podcast/${id}`);
                setTitle("");
                setDesc("");
                setAudioFile(null);
            } catch (e) {
                setLoading(false);
                toast.error(e.message);
            }
        } else {
            setLoading(false);
            toast.error("Please fill out all the details");
        }
    }

    const handleFileChange = (e) => {
        setAudioFile(e.target.files[0]);  // Capture the file object
    };

    return (
        <div>
            <Header />
            <div className='wrapper'>
                <h1>Create An Episode</h1>
                <InputComponent 
                    state={title} 
                    setState={setTitle} 
                    placeholder="Episode title" 
                    type="text" 
                    required={true} 
                />

                <InputComponent 
                    state={desc} 
                    setState={setDesc} 
                    placeholder="Description" 
                    type="text" 
                    required={true} 
                />
                 
                <label>Upload Audio File</label>
                <input className='files'
                    type="file" 
                    onChange={handleFileChange} 
                    accept="audio/*"  // Accept only audio files
                    required 
                />

                <Button 
                    text={loading ? "Loading.." : "Create Episode"} 
                    disabled={loading} 
                    onClick={handleEpisode} 
                />
            </div>
        </div>
    );
}

export default CreateAnEpisode;
