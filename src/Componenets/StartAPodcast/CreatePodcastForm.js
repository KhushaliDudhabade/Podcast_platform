import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputComponent from '../common/Inputs';
import Button from '../common/Button';
import { auth, db, storage } from '../../Pages/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import './style.css';

function CreatePodcastForm() {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [displayImg, setDisplayImg] = useState(null);
    const [bannerImg, setBannerImg] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (title && desc && displayImg && bannerImg) {
            setLoading(true);
            try {
                // Upload banner image
                const bannerImgRef = ref(storage, `podcasts/${auth.currentUser.uid}/banner_${Date.now()}`);
                await uploadBytes(bannerImgRef, bannerImg);
                const bannerImgURL = await getDownloadURL(bannerImgRef);

                // Upload display image
                const displayImgRef = ref(storage, `podcasts/${auth.currentUser.uid}/display_${Date.now()}`);
                await uploadBytes(displayImgRef, displayImg);
                const displayImgURL = await getDownloadURL(displayImgRef);

                // Save podcast data to Firestore
                const podcastData = {
                    title: title,
                    description: desc,
                    bannerImg: bannerImgURL,
                    displayImg: displayImgURL,
                    createdBy: auth.currentUser.uid,
                    createdAt: new Date(),
                };

                await addDoc(collection(db, 'podcasts'), podcastData);

                // Reset form fields
                setTitle('');
                setDesc('');
                setBannerImg(null);
                setDisplayImg(null);
                toast.success('Podcast created successfully!');
                // navigate('/'); // Use this if you want to redirect after submission
            } catch (e) {
                toast.error(`Error: ${e.message}`);
            } finally {
                setLoading(false);
            }
        } else {
            toast.error('Please enter all values');
        }
    };

    return (
        <>
            <InputComponent 
                state={title} 
                setState={setTitle} 
                placeholder="Title" 
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
            <label style={{textAlign:'left'}}>Upload Display Image</label>
            <input className='files' 
                name="Display_Image"
                type="file" 
                onChange={(e) => setDisplayImg(e.target.files[0])} 
                required 
            />
           
           <label style={{textAlign:'left'}}>Upload Banner Image</label>
            <input className='files'
                name="banner_Image"
                type="file" 
                onChange={(e) => setBannerImg(e.target.files[0])} 
                required 
            />

            <Button 
                text={loading ? "Loading.." : "Create Podcast"} 
                disabled={loading} 
                onClick={handleSubmit} 
            />
        </>
    );
}

export default CreatePodcastForm;
