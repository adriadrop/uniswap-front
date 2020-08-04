import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker';
import './styles/index.css'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
  }),
  fetchOptions: {
    mode: 'no-cors'
  },
  cache: new InMemoryCache()
})

ReactDOM.render(

<ApolloProvider client={client}>
    <App />
</ApolloProvider>,
  document.getElementById('root')
)
// reloade window for new info
//setTimeout(function () {  window.location.reload(1); }, 50000);
serviceWorker.register();
