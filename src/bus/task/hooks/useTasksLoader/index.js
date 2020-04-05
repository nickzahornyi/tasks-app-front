import {useQuery} from '@apollo/react-hooks';
import {loader} from 'graphql.macro';

const queryTaskLoader = loader('./gql/tasksLoader.graphql');

export const useTasksLoader = () => {
    const {loading, data, refetch} = useQuery(queryTaskLoader);

    return {tasks: data && data.tasks, loading, refetch}
};
