// Core
import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';

// Book
import { book } from '../../navigation/book';

// Hooks
import { useProfile } from './hooks/useProfile';

export const Guardian = ({children}) => {
  const history = useHistory();
  const { error } = useProfile();

  useEffect(() => {
    if (error) {
      history.push(book.login);
    }
  }, [error, history]);

  return (
    <>
      {children}
    </>
  )
};
