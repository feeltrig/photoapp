import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMainApp } from '../appstate/appState';
import { useNavigate } from 'react-router';
import DefaultPhoto from '.././assets/svgs/defaultUserPhoto.svg';

const schema = yup.object().shape({
  fullUserName: yup
    .string()
    .matches(/^[a-z ,.'-]+$/i)
    .required('Full Name is required'),
  userName: yup.string().required(),
  email: yup.string().email().required(),
  mobile: yup.number().min(10).required(),
  password: yup.string().min(4).max(15).required(),
});

const Register = () => {
  // INIT
  // form validation
  // error
  // navigation
  // main app state
  const cleanProfile = {
    fullUserName: '',
    userName: '',
    email: '',
    mobile: null,
    password: '',
  };
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: cleanProfile,
    resolver: yupResolver(schema),
  });
  const { errors } = formState;
  const navigate = useNavigate();
  const { setmainappstate } = useMainApp();

  const [userProfile, setuserProfile] = useState(cleanProfile);

  // HANDLE REGISTER
  const submitForm = data => {
    setmainappstate(prev => {
      // save state locally
      localStorage.setItem(
        'userProfile',
        JSON.stringify({
          ...prev,
          ...data,
          profilePhoto: DefaultPhoto,
          allowAccess: true,
        })
      );

      return {
        ...prev,
        ...data,
        profilePhoto: DefaultPhoto,
        allowAccess: true,
      };
    });

    setuserProfile(cleanProfile);
  };

  // CLEAR FORM
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset(cleanProfile);
      navigate('/user/homepage');
    }
  }, [formState, reset]);

  return (
    <div className="register">
      <form onSubmit={handleSubmit(submitForm)}>
        <h1>Register</h1>

        {/* fullusername */}
        <label htmlFor="fullUserName">Full Username</label>
        <input
          type="text"
          name="fullUserName"
          {...register('fullUserName')}
          placeholder="First Name..."
        />
        <p>
          {' '}
          {errors.fullUserName?.message
            ? 'Full user name is incorrent'
            : ''}{' '}
        </p>

        {/* username */}
        <label htmlFor="userName">Username</label>

        <input
          type="text"
          name="userName"
          placeholder="Last Name..."
          {...register('userName')}
        />
        <p> {errors.userName?.message} </p>

        {/* email */}
        <label htmlFor="email">Email</label>

        <input
          type="text"
          name="email"
          placeholder="Email..."
          {...register('email')}
        />
        <p> {errors.email?.message} </p>

        {/* number */}
        <label htmlFor="mobile">Mobile</label>

        <input
          type="number"
          name="mobile"
          placeholder="mobile..."
          {...register('mobile')}
        />
        <p> {errors.mobile && 'Please input mobile number correctly'} </p>

        {/* password */}
        <label htmlFor="password">Password</label>

        <input
          type="password"
          name="password"
          placeholder="Password..."
          {...register('password')}
        />
        <p> {errors.password?.message} </p>

        {/* submit */}
        <button type="submit" className="btn" id="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
