import {useMutation} from '@apollo/react-hooks';
import {loader} from 'graphql.macro';

const mutationCleanTasks = loader('./gql/cleanTasks.graphql');

export const useTasksCleaner = () => {
    const [removeAllTasks] = useMutation(mutationCleanTasks);

    return {removeAllTasks}
};
