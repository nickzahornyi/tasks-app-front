// Core
import React from 'react';
import {
  MessageBar, MessageBarType,
  PrimaryButton,
  Text,
  Link
} from 'office-ui-fabric-react';
import { Field, Form, Formik } from 'formik';
import { FormikTextField } from 'formik-office-ui-fabric-react';

// Hooks
import { useLogin } from './hooks/useLogin';

// Validators>
import {validateInput} from '../../validators/validateInput';
import {validateEmail} from '../../validators/validateEmail';

// Styles
import styles from './styles.module.scss';

// Book
import { book } from '../../navigation/book';

export const Login = () => {
  const { authenticate, error } = useLogin();

  const send = (customer) => {
    authenticate(customer);
  };

  const errorJSX = error && (
    <MessageBar messageBarType={MessageBarType.error}>
      {error.message}
    </MessageBar>
  );

  const initialValues = {
    email: '',
    password: ''
  };

  const LoginForm = ({
    isValid,
  }) => (
    <Form>
      <Field
        name="email"
        component={FormikTextField}
        label='Email'
        validate={validateEmail}
        required
        placeholder='Please add your email'
      />
      <Field
        name="password"
        component={FormikTextField}
        label='Password'
        validate={validateInput}
        required
        type='password'
        placeholder='Please add your password'
      />
      <PrimaryButton
        text='Send'
        type='submit'
        disabled={!isValid}
        className={styles.send}
      />
    </Form>
  )

  return (
    <section className={styles.form}>
      <div className={styles.wrap}>
        <Text variant='mega'>
          Login
        </Text>
        <Formik
          initialValues={initialValues}
          onSubmit={send}
          component={LoginForm}
        />
        <Text variant='small'>
          If you don't have account, use <Link href={book.signup}>signUp</Link> page.
        </Text>
        {errorJSX}
      </div>
    </section>
  )
};
