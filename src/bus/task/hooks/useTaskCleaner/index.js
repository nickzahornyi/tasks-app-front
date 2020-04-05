import {useMutation} from '@apollo/react-hooks';
import {loader} from 'graphql.macro';

const mutationCleanTask = loader('./gql/cleanTask.graphql');

export const useTaskCleaner = () => {
    const [_removeTask] = useMutation(mutationCleanTask);


    const removeTask = (id, refetch) => {
        _removeTask({
            variables: {
                id
            }
        });

        if (refetch) {
            refetch();
        }
    };

    return {removeTask}
};
