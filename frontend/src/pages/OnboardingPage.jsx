import React, { useState } from 'react';
import { completeOnboarding, getAuthUser } from '../lib/api.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';


import { CameraIcon , Loader2Icon, MapPinIcon, ShipWheelIcon, ShuffleIcon} from 'lucide-react'; // o el ícono que uses
import useAuthUser from '../hooks/useAuthUser.js';
import { LANGUAGES } from '../constants/index.js';

const OnboardingPage = () => {

  const {authUser} = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativelanguage: authUser?.nativelanguage || "",
    learninglanguage: authUser?.learninglanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const {mutate: onboardingMutation, isPending} = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () =>{
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({queryKey: ["authUser"]});
    }, 
    
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  }

  const handleRandomAvatar = () =>{
    //numero random para el user icon
    
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState, profilePic: randomAvatar});
    toast.success("Random Profile picture generated");
  };



  return (
    <div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl'> 
        <div className='card-body p-6 sm:p-8 '>
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Complete your profile</h1>

{/*---------------------------------------------------------FORM------------------------------------------------------- */}
          <form onSubmit={handleSubmit} className='space-y-6'>


           {/*------------------------- ICON PROFILE--------------------------- */}
            <div className='flex flex-col items-center justify-center space-y-4'>
              <div className='size-32 rounded-full bg-base-300 overflow-hidden'>
                {formState.profilePic? (
                  <img 
                  src={formState.profilePic}
                  alt='Profile Preview'
                  className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='flex items-center justify-center h-full'>
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}

              </div>

              <div className='flex items center gap-2'>
                <button className='btn btn-accent' type='button' onClick={handleRandomAvatar}>
                  <ShuffleIcon className='size-4 mr-2'/>
                  Generate Random Avatar
                </button>
              </div>
            </div>

             {/* FULL NAME */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Full Name</span>
                </label>
                <input 
                type='text' 
                name='fullName' 
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value})}
                className='input input-bordered w-full'
                placeholder='Your full name'
                ></input>
              </div>

              {/* BIO */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Bio</span>
                </label>
                <textarea 
                
                name='bio' 
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value})}
                className='textarea textarea-bordered h-24'
                placeholder='Tell others about yourself and your language learning goals!'
                ></textarea>
              </div>

              {/*LANGUAGE */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* NATIVE LANGUAGE */}
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'> Native Language</span>
                  </label>

                  <select name='nativelanguage' value={formState.nativelanguage} onChange={(e) => setFormState({ ...formState, nativelanguage:e.target.value})} className='select select-bordered w-full'>
                    <option value=''>Select your native language</option>
                    {LANGUAGES.map((lang) =>(
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>{lang}</option>
                    ))}
                  </select>
                </div>
                {/* LEARNING LANGUAGE */}
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'> Learning Language</span>
                  </label>

                  <select 
                    name='learninglanguage' 
                    value={formState.learninglanguage} 
                    onChange={(e) => setFormState({ ...formState, learninglanguage: e.target.value})} 
                    className='select select-bordered w-full'>
                    <option value=''>Select your desire language</option>
                    {LANGUAGES.map((lang) =>(
                      <option key={`learning-${lang}`} value={lang.toLowerCase()}>{lang}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* LOCATION */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Location</span>
                </label>
                <div className='relative'>
                  <MapPinIcon className='absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70' />
                     <input 
                        type='text' 
                        name='location' 
                        value={formState.location}
                        onChange={(e) => setFormState({ ...formState, location: e.target.value})}
                        className='input input-bordered pl-10'
                        placeholder='City,Country'
                      />
                </div>
               
              </div>

              {/* SUBMIT */}
               <button className='btn btn-primary w-full' disabled={isPending} type="submit">
                {!isPending ? (
                  <>
                  <ShipWheelIcon className='size-5 mr-2'/>
                  Complete Onboarding
                  </>
                ):(
                  <>
                  <Loader2Icon  className=' animate-spin size-5 mr-2'/>
                  Onboarding ...
                  </>
                )}
               </button>
            
            

          </form>
          
        </div>

      </div>
    </div>
  )
}

export default OnboardingPage