
import { ApolloClient, DefaultOptions, HttpLink, InMemoryCache} from '@apollo/client';
import { httpOrigin} from './config/config';
const httpLink = new HttpLink({
  uri: `${httpOrigin}/api/graphql`,
});


const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
  },
  query: {
    fetchPolicy: 'no-cache',
  },
  mutate: {
    fetchPolicy: 'no-cache',
  },
};

export const ApolloGraphQLClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  defaultOptions,
});
