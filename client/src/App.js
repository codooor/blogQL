import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import jwtDecode from "jwt-decode";
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
  const existingToken = localStorage.getItem(AUTH_TOKEN);

  // Check if the token is valid
  let tokenIsValid = false;
  if (existingToken) {
    try {
      const decodedToken = jwtDecode(existingToken);
      const currentTime = Date.now().valueOf() / 1000;
      if (decodedToken.exp > currentTime) {
        tokenIsValid = true;
      } else {
        localStorage.removeItem(AUTH_TOKEN);
      }
    } catch (error) {
      console.error("Failed to decode token", error);
    }
  }

  const [isLoggedIn, setIsLoggedIn] = useState(tokenIsValid);

  useEffect(() => {
    console.log("isLoggedIn value: ", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = async () => {
    return new Promise((resolve) => {
      const token = localStorage.getItem(AUTH_TOKEN);
      if (token) {
        setIsLoggedIn(true, resolve);
      } else {
        setIsLoggedIn(false, resolve);
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    setIsLoggedIn(false);
    console.log("Logged out: ", isLoggedIn);
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
                  <Navigate to="/profile" replace />
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
