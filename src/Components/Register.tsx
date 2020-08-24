import React from 'react';
import { useForm } from 'react-hook-form';

interface RegisterProps {
  toggle: () => void;
}

export default (props: RegisterProps) => {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <h3>Register</h3>
      <div className="row">
        <input
          placeholder="First Name"
          name="firstName"
          type="text"
          className="input"
          ref={register({ required: true })}
        />
        <input
          placeholder="Last Name"
          name="lastName"
          type="text"
          className="input"
          ref={register({ required: true })}
        />
      </div>
      <input
        placeholder="Email adress"
        name="email"
        type="email"
        className="other-inputs"
        ref={register({ required: true })}
      />
      <input
        placeholder="Create password"
        type="password"
        className="other-inputs"
        name="password"
        ref={register({ required: true })}
      />
      {Object.keys(errors).length > 0 && <div>Fill in all the fields</div>}
      <button className="button-black" onClick={handleSubmit(onSubmit)}>
        Register
      </button>
    </div>
  );
};
