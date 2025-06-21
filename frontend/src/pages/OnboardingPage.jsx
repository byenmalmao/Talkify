import React, { useState } from 'react';
import { completeOnboarding, getAuthUser } from '../lib/api.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';


import { CameraIcon , ShuffleIcon} from 'lucide-react'; // o el ícono que uses
import useAuthUser from '../hooks/useAuthUser.js';

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
      toast.success("Prodile onboarded successfully");
      queryClient.invalidateQueries({queryKey: ["authUser"]});
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  }

  const handleRandomAvatar = () =>{};
  return (
    <div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl'> 
        <div className='card-body p-6 sm:p-8 '>
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Complete your profile</h1>
          <form onSubmit={handleSubmit} className='space-y-6'>

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
            

          </form>
          
        </div>

      </div>
    </div>
  )
}

export default OnboardingPage