import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";
import Header from "./components/Header";
import { AUTH_TOKEN } from "./utils/constants";

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
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem(AUTH_TOKEN)
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    setIsLoggedIn(false);

    setIsLoggedIn(false);
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <div className="container-sm">
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/profile" />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="profile"
              element={
                <Profile isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
              }
            />
            <Route path="posts" element={<Posts />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
