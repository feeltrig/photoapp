import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMainApp } from '../../appstate/appState';
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
  // submit error
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
  const [submitError, setsubmitError] = useState('');

  // HANDLE QUERY SUMBIT
  const submitQuery = async data => {
    fetch('api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => {
        if (res.status < 403) {
          setsubmitError('Successfully submitted');
        } else {
          setsubmitError('Please try again later');
        }

        setTimeout(() => {
          setsubmitError('');
        }, 5000);
      })
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

      <h3 style={{ position: 'absolute', bottom: '5rem' }}>
        {submitError == 'Please try again later' && 'Please try again later'}
        {submitError == 'Successfully submitted' && 'Successfully submitted'}
      </h3>
    </div>
  );
};

export default ContactUs;
