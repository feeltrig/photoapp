<div>
  <form onSubmit={handleSubmit(submitForm)}>
    {/* fullusername */}
    <input
      type="text"
      name="fullUserName"
      {...register('fullUserName')}
      placeholder="First Name..."
    />
    {/* <p> {errors.fullUserName?.message} </p> */}

    {/* username */}
    <input
      type="text"
      name="userName"
      placeholder="Last Name..."
      {...register('userName')}
    />
    {/* <p> {errors.userName?.message} </p> */}

    {/* email */}
    <input
      type="text"
      name="email"
      placeholder="Email..."
      {...register('email')}
    />
    {/* <p> {errors.email?.message} </p> */}

    {/* number */}
    <input
      type="number"
      name="mobile"
      placeholder="mobile..."
      {...register('mobile')}
    />
    {/* <p> {errors.mobile?.message} </p> */}

    {/* password */}
    <input
      type="password"
      name="password"
      placeholder="Password..."
      {...register('password')}
    />
    {/* <p> {errors.password?.message} </p> */}
    <input
      type="password"
      name="confirmPassword"
      placeholder="Confirm Password..."
      {...register('confirmPassword')}
    />
    {/* <p> {errors.confirmPassword && 'Passwords Should Match!'} </p> */}

    {/* submit */}
    <input type="submit" id="submit" />
  </form>
</div>;
