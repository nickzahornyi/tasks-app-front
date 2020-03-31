import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const uri = 'https://lab.lectrum.io/graphql/task-manager/backend';

const link = createHttpLink({
  uri,
  credentials: 'include',
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
