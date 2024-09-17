import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelersList } from '@/constants/options';
import { chatSession } from '@/service/AIModel';
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { VscLoading } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';

// Debounce function
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

function CreateTrip() {
    const [place, setPlace] = useState('');
    const [formData, setFormData] = useState({});
    const [locationsDict, setLocationsDict] = useState({});
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
    const handleInputChange = (name, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    // Fetch locations from preprocessed JSON
    useEffect(() => {
        fetch('/locations.json')
            .then(response => response.json())
            .then(data => setLocationsDict(data));
    }, []);

    // Debounced filter function
    const filterLocations = useCallback(debounce((value) => {
        if (value) {
            const matches = Object.keys(locationsDict).filter(city =>
                city.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredLocations(matches);
        } else {
            setFilteredLocations([]);
        }
    }, 300), [locationsDict]);

    useEffect(() => {
        filterLocations(inputValue);
    }, [inputValue, filterLocations]);

    const handleLocationSelect = (city) => {
        const countries = locationsDict[city];
        if (countries && countries.length > 0) {
            const location = `${city}, ${countries[0]}`;
            setPlace(location);
            handleInputChange('location', location);
            setInputValue(location); // Set the input field to the selected location
            setFilteredLocations([]); // Hide the suggestions
        }
    };

    const login=useGoogleLogin({
        onSuccess:(codeResp)=>GetUserProfile(codeResp),
        onError:(error)=>console.log(error)
    })

    const OnGenerateTrip=async()=>{

        const user = localStorage.getItem('user');

        if (!user)
        {
            setOpenDialog(true);
            return;
        }

        if(formData?.noOfDays<1||formData?.noOfDays>7||!formData?.location||!formData?.budget||!formData?.traveler)
        {
            toast("Please fill all the details correctly!");
            return ;
        }

        setLoading(true);
        const FINAL_PROMPT=AI_PROMPT
        .replace('{location}',formData?.location)
        .replace('{totalDays}', formData?.noOfDays)
        .replace('{traveler}', formData?.traveler)
        .replace('{budget}', formData?.budget)
        .replace('{totalDays}', formData?.noOfDays)

        // console.log(FINAL_PROMPT)
        
        const result = await chatSession.sendMessage(FINAL_PROMPT);

        console.log(result?.response?.text());
        setLoading(false);
        SaveAiTrip(result?.response?.text())
    }

    const SaveAiTrip=async(TripData)=>{
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const docId = Date.now().toString()
        await setDoc(doc(db, "AITrips", docId), {
            userSelection:formData,
            tripData:JSON.parse(TripData),
            userEmail:user?.email,
            id:docId
        });
        setLoading(false);
        navigate('/view-trip/'+docId);
    }

    const GetUserProfile=(tokenInfo)=>{
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
            headers:{
                Authorization:`Bearer ${tokenInfo?.access_token}`,
                Accept:'Application/json'
            }
        }).then((resp)=>{
            console.log(resp);
            setOpenDialog(false);
            localStorage.setItem('user',JSON.stringify(resp.data));
            OnGenerateTrip();
        })
    }

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56 mt-10 text-[#292929]'>
            <h2 className='font-bold text-3xl'>Tell us your travel preferences🏕️🗺️</h2>
            <p className='mt-3 text-gray-500 text-xl'>Please provide us some basic information, and our trip planner will generate a customized itinerary based on your preference</p>

            <div className='mt-10 flex flex-col gap-10'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>Enter the destination of choice</h2>
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type a location..."
                        className="p-2 border border-gray-300 rounded bg-white w-full"
                    />
                    {filteredLocations.length > 0 && (
                        <ul className="mt-2 border border-gray-300 rounded bg-white">
                            {filteredLocations.map((city, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleLocationSelect(city)}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                >
                                    {city}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>Number of days planned</h2>
                    <Input
                        placeholder={'Ex.2 (only upto a week supported)'}
                        type="number"
                        onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                    />
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>Number of persons travelling</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectTravelersList.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleInputChange('traveler', item.people)}
                                className={`p-4 border cursor-pointer 
                                rounded-lg hover:shadow-lg
                                ${formData?.traveler == item.people && 'shadow-lg border-black'}
                                `}
                            >
                                <h2 className='text-3xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>Budget for the trip</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectBudgetOptions.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleInputChange('budget', item.title)}
                                className={`p-4 border cursor-pointer 
                                rounded-lg hover:shadow-lg
                                ${formData?.budget == item.title && 'shadow-lg border-black'}
                                `}
                            >
                                <h2 className='text-3xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='my-10 justify-center flex'>
                <Button 
                disabled={loading}
                onClick={OnGenerateTrip}>
                    {loading?
                    <VscLoading className='h-8 w-8 animate-spin'/>:'Find a trip!'
                    }
                    </Button>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>

                <DialogContent>
                    <DialogHeader>
                    <DialogDescription>
                        <img src="/logo.svg"/>
                        <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
                        <p>Sign in to the App with Google authentication securely</p>

                        <Button
                        onClick={login} 
                        className="w-full mt-5 flex gap-4 items-center">
                        <FcGoogle className='h-7 w-7'/>
                        Sign In With Google
                        </Button>
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


        </div>
    );
}

export default CreateTrip;
