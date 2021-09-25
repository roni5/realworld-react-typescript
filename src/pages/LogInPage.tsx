import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../api/authentication';
import { HOME_PAGE_PATH } from './HomePage';
import useForm from '../components/hooks/useForm';
import { FormContainer, FormErrorMessage, FormInput } from '../components/FormContainer';

export default () => (
  <FormContainer title="Sign in">
    <LoginForm />
  </FormContainer>
);

export const LOGIN_PAGE_PATH = '/login';

const LoginForm = () => {
  const { handleSubmit, handleChange, values } = useForm({
    email: '',
    password: '',
  }, onSubmitCallBack);

  const [isError, setIsError] = useState(false);
  const history = useHistory();

  async function onSubmitCallBack() {
    await login(values.email, values.password)
      .then(() => history.push(HOME_PAGE_PATH))
      .catch(() => setIsError(true));
  }

  return (
    <form onSubmit={handleSubmit}>
      {isError && (<FormErrorMessage message="Login Failed" />)}
      <FormInput type="text" name="email" placeHolder="Email" onChange={handleChange} />
      <FormInput type="password" name="password" placeHolder="Password" onChange={handleChange} />
      <FormInput type="submit" name="submit-button" placeHolder="Sign in" />
    </form>
  );
};
