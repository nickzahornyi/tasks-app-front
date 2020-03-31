// Core
import React from 'react';
import {
  Text,
  PrimaryButton,
  MessageBar,
  MessageBarType, Link
} from 'office-ui-fabric-react';
import { FormikTextField } from 'formik-office-ui-fabric-react';
import { Formik, Form, Field } from 'formik';

// Hooks
import { useSignUp } from './hooks/useSignUp';

// Validators
import { validateInput } from '../../validators/validateInput';
import { validateEmail } from '../../validators/validateEmail';

// Book
import { book } from '../../navigation/book';

// Styles
import styles from './styles.module.scss';

export const SignUp = () => {
  const { saveCustomer, createdCustomer, error } = useSignUp();

  const createdCustomerJSX = createdCustomer && (
    <MessageBar messageBarType={MessageBarType.success}>
      We already created a new customer with name: {createdCustomer.firstName}
    </MessageBar>
  );

  const errorJSX = error && (
    <MessageBar messageBarType={MessageBarType.error}>
      {error.message}
    </MessageBar>
  );

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  const send = (values) => {
    saveCustomer(values);
  };

  const SignUpForm = ({
    isValid,
  }) => (
    <Form>
      <Field
        name="firstName"
        component={FormikTextField}
        label='First Name'
        validate={validateInput}
        required
        placeholder='Please add your first name'
      />
      <Field
        name="lastName"
        component={FormikTextField}
        label='Last Name'
        validate={validateInput}
        required
        placeholder='Please add your last name'
      />
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
          SignUp
        </Text>
        <Formik
          initialValues={initialValues}
          onSubmit={send}
          component={SignUpForm}
        />
        <Text variant='small'>
          If you have account, use <Link href={book.login}>login</Link> page.
        </Text>
        {createdCustomerJSX}
        {errorJSX}
      </div>
    </section>
  )
};
