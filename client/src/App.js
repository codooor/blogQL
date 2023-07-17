import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { AUTH_TOKEN } from "./components/constants.js";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container-sm">
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/" element={<Login />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
