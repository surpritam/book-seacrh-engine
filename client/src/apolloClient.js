import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: '/graphql', // Ensure this matches your Apollo Server endpoint
});

// Middleware to include the token in headers
const authLink = setContext((_, { headers }) => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem('id_token');
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Initialize Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain authLink and httpLink
  cache: new InMemoryCache(),
});

export default client;