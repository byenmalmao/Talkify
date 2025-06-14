import React, { useState } from 'react';
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import { useMutation , useQueryClient} from '@tanstack/react-query';
import {signup} from '../lib/api'


 
const SignUpPage = () => {

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "", 
  });

  const queryClient = useQueryClient();

  const {mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["authUser"]}),
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    mutate(signupData);
  };
  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest">
      <div className='border border-primary/25 flex felx-col lg:flex-row w-full 
      max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>

        { /*SignUp from left */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">

          {/*LOGO*/}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">Talkify</span>

          </div>

          {/*Error Message */}

          {error && (
            <div className='alert alert-error mb-4'>
              <span className='text-sm font-bold'>{error.response.data.message}</span>  
            </div>
          )}
          <div className="w-full">
            <form onSubmit={handleSignUp}>
              <div className='space-y-4'>
                <div>
                  <h2 className='text-xl font-semibold'> Create Account</h2>
                  <p className='text-sm opacity-70'>
                    Join Talkify and start your language learning  adventure!
                  </p>
                </div>

                <div className='space-y-3'>
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Full Name</span>
                    </label>

                    <input type='text'
                      placeholder='John Doe'
                      className='input input-bordered'
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                    />

                  </div>

                  
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Email</span>
                    </label>

                    <input type='email'
                      placeholder='example@email.com'
                      className='input input-bordered'
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />

                  </div>

                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Password</span>
                    </label>

                    <input type='password'
                      className='input input-bordered'
                      placeholder='******'
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                    />
                    <p className="text-xs opacity-70 mt-1">Password must be at least 6 character  long</p>
                  </div>

                  <div className='form-control'>
                    <label className='label cursor-pointer justify-start gap-2'>
                      <input type='checkbox' className='checkbox checkbox-sm' required />
                      <span className='text-xs leading-tight'> I agree to the {" "}
                        <span className='text-primary hover:underline'>terms of services{" "}</span>and {" "}
                        <span className='text-primary hover:underline'>privacy policy</span></span>
                    </label>
                  </div>

                  <button className='btn btn-primary w-full ' type='submit'>
                    {isPending ? (
                      <>
                      <span className='loading loading-spinner loading-xs'></span></>
                    ): ("Create Account")}
                  </button>

                  <div className='text-center mt-4'>
                    <p className='text-sm'>
                      Already have an account? {" "}
                      <Link to="/login" className='text-primary hover:underline'>Sign In</Link>
                    </p>
                  </div>

                </div>


              </div>
            </form>
          </div>

        </div>

        {/*Right Side */}
        <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
          <div className='max-w-md p-8'>
            <div className='relative aspect-square max-w-sm mx-auto'>
              <img src='../../public/loginimage.png' alt=" LanguageConnection Ilustration" className='w-full h-full' />
            </div>

            <div className='text-center space-y-3 mt-6'>
              <h2 className='text-xl font-semibold'>Connect with language parthers wordwide</h2>
             
            </div>
          </div>
        </div>

      </div>
    </div>

  )
}

export default SignUpPage