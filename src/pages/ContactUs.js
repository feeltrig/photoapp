import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMainApp } from '../appstate/appState';
import { useNavigate } from 'react-router';

const schema = yup.object().shape({
  fullUserName: yup
    .string()
    .matches(/^[a-z ,.'-]+$/i)
    .required('Full Name is required'),
  email: yup.string().email().required(),
  message: yup.string().required(),
});

const ContactUs = () => {
  // INIT
  // main app state
  // form validation
  // error
  // navigation
  const { mainappstate, setmainappstate } = useMainApp();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      fullUserName: mainappstate?.fullUserName,
      email: mainappstate?.email,
      message: '',
    },
    resolver: yupResolver(schema),
  });
  const { errors } = formState;
  const navigate = useNavigate();

  // HANDLE QUERY SUMBIT
  const submitQuery = async data => {
    fetch('api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => {})
      .catch(err => {});
  };

  return (
    <div className="register contactus ">
      <form onSubmit={handleSubmit(submitQuery)}>
        <h1>Contact Us</h1>

        {/* fullusername */}
        <label htmlFor="fullUserName">Full Username</label>
        <input
          type="text"
          name="fullUserName"
          {...register('fullUserName')}
          placeholder="First Name..."
        />
        <p> {errors.fullUserName?.message ? 'Incorrect full name' : ''} </p>

        {/* email */}
        <label htmlFor="email">Email</label>

        <input
          type="text"
          name="email"
          placeholder="Email..."
          {...register('email')}
        />
        <p> {errors.email?.message} </p>

        {/* message */}

        <label htmlFor="message">Message</label>

        <input
          type="text"
          name="message"
          placeholder="Message..."
          {...register('message')}
        />
        <p> {errors.message?.message} </p>

        {/* submit */}
        <button type="submit" className="btn" id="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
