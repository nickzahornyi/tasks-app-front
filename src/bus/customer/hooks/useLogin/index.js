import {useMutation} from '@apollo/react-hooks';
import {loader} from 'graphql.macro';
import {book} from "../../../../navigation/book";
import {useHistory} from "react-router-dom";

const mutationLogin = loader('./gql/login.graphql');

export const useLogin = () => {
    const [_authenticate, {error}] = useMutation(mutationLogin);
    const history = useHistory();

    const authenticate = async (customer) => {
        await _authenticate({
            variables: {
                customer
            }
        });

        if (!error) {
            history.push(book.tasks);
        }
    };

    return {
        authenticate, error
    }
};
