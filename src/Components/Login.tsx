import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';

const LOGIN_USER = gql`
  mutation Login($email: String, $password: String) {
    authenticateUserWithPassword(email: $email, password: $password) {
      token
      item {
        name
      }
    }
  }
`;
interface LoginProps {
  toggle: () => void;
  setLoggedInUser: (user: any) => void;
}

export default (props: LoginProps) => {
  const { register, errors, handleSubmit } = useForm();
  const [registerUser, { data }] = useMutation(LOGIN_USER);

  const onSubmit = async (submitData: any) => {
    registerUser({ variables: submitData }).then((res) => {
      props.setLoggedInUser(res.data?.authenticateUserWithPassword?.item);
      sessionStorage.setItem(
        'token',
        res.data?.authenticateUserWithPassword?.token
      );
      props.toggle();
    });
  };
  return (
    <div>
      <h3>Login</h3>
      <div className="row">
        <input
          name="email"
          placeholder="email"
          type="email"
          className="input"
          ref={register({ required: true })}
        />
        <input
          name="password"
          placeholder="password"
          type="password"
          className="input"
          ref={register({ required: true })}
        />
      </div>
      {Object.keys(errors).length > 0 && <div>Fill in all the fields</div>}
      <div className="button-container">
        <button className="button-black" onClick={handleSubmit(onSubmit)}>
          Login
        </button>
      </div>
    </div>
  );
};
