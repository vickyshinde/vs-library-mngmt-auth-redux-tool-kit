import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignIn from './components/SignIn';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import { signOut } from './rtk/authSlice';import Cookies from 'js-cookie';

const RequireAuth = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => {
  console.log("🚀 ~ middleware ~ process.env.REACT_APP_KEY:", process.env.REACT_APP_KEY)

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleSignOut = () => {
    dispatch(signOut());
    Cookies.remove('auth');
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Sign In</Link>
            </li>
            {auth.isAuthenticated && (
              <li>
                <Link to="/books">Book List</Link>
              </li>
            )}
          </ul>
        </nav>
        {auth.isAuthenticated && (
          <div>
            <p>Welcome, {auth.user.username}</p>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        )}
        
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route
            path="/books"
            element={
              <RequireAuth>
                <BookList />
              </RequireAuth>
            }
          />
          <Route
            path="/books/:id"
            element={
              <RequireAuth>
                <BookDetail />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
