import {useMutation} from '@apollo/react-hooks';
import {loader} from 'graphql.macro';

const mutationUpdateTask = loader('./gql/updateTask.graphql');

export const useTaskUpdater = () => {
    const [_updateTask] = useMutation(mutationUpdateTask);


    const updateTask = (id, task, refetch) => {
        _updateTask({
            variables: {
                id,
                task
            }
        });

        if (refetch) {
            refetch();
        }
    };

    return {updateTask}
};
