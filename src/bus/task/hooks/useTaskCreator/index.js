import {useMutation} from '@apollo/react-hooks';
import {loader} from 'graphql.macro';

const mutationUpdateTask = loader('./gql/createTask.graphql');

export const useTaskCreator = () => {
    const [_createTask, {error}] = useMutation(mutationUpdateTask);


    const createTask = (task, refetch) => {
        _createTask({
            variables: {
                task
            }
        });

        if (refetch) {
            refetch();
        }
    };

    return {createTask, error}
};
