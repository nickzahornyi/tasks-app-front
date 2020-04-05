import {useQuery} from '@apollo/react-hooks';
import {loader} from 'graphql.macro';

const queryProfile = loader('./gql/profile.graphql');

export const useProfile = () => {
    const {error} = useQuery(queryProfile);

    return {error}
};
