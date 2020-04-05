import {useMutation} from '@apollo/react-hooks';
import {loader} from 'graphql.macro';

const mutationSignUp = loader('./gql/signUp.graphql');

export const useSignUp = () => {
    const [_saveCustomer, {data, error}] = useMutation(mutationSignUp);


    const saveCustomer = (customer) => {
        _saveCustomer({
            variables: {
                customer
            }
        })
    };

    return {
        saveCustomer, createdCustomer: data && data.signUp, error
    }
};
