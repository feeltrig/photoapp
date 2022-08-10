import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMainApp } from '../appstate/appState';
import { useNavigate } from 'react-router';

const schema = yup.object().shape({
  fullUserName: yup.string().required('Full Name is required'),
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
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;
  const navigate = useNavigate();
  const { setmainappstate } = useMainApp();

  // HANDLE REGISTER
  const submitForm = data => {
    console.log(data);

    setmainappstate(prev => {
      return { ...prev, ...data, allowAcces: true };
    });

    localStorage.setItem(
      'userProfile',
      JSON.stringify({ ...data, allowAcces: true })
    );
  };

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
        <p> {errors.fullUserName?.message} </p>

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
        <button type="submit" id="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
