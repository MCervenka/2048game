import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { useForm } from 'react-hook-form';

const CREATE_USER = gql`
  mutation Registration($data: UserCreateInput) {
    createUser(data: $data) {
      name
    }
  }
`;
interface UserCreateInput {
  name: string;
  email: string;
  isAdmin: boolean;
  password: string;
}
interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
interface RegisterProps {
  toggle: () => void;
}

export default (props: RegisterProps) => {
  const { register, errors, handleSubmit } = useForm<RegisterForm>();
  const [registerUser, { data }] = useMutation(CREATE_USER);
  const onSubmit = (submitData: RegisterForm) => {
    console.log(submitData);
    registerUser({
      variables: {
        data: {
          name: submitData.firstName + ' ' + submitData.lastName,
          email: submitData.email,
          isAdmin: false,
          password: submitData.password,
        },
      },
    })
      .then((res) => {
        console.log(res.data);
        props.toggle();
      })
      .catch((e) => console.log(e));
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
