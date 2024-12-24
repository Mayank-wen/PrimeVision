import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { gql } from '@apollo/client';
require("dotenv").config();

const uri = 'https://primevision.onrender.com/api'
const httpLink = createHttpLink({ uri });

const cache = new InMemoryCache();

// Check for a token and return the headers to the context
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  connectToDevTools: true,
  resolvers: {
    Query: {
      isLoggedIn: () => {
        return !!localStorage.getItem('token');
      },
    },
  },
});

// Initialize the cache with default data
cache.writeQuery({
  query: gql`
    query GetIsLoggedIn {
      isLoggedIn @client
    }
  `,
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Wrap the App component with ApolloProvider */}
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
