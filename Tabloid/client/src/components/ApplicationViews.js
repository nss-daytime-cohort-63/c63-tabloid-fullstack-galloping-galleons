import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import CategoryList from "./CategoryList";
import UserInfo from "./UserProfileComponents/UserInfo";
import CategoryForm from "./CategoryForm";
import CategoryEditForm from "./CategoryEditForm";
import Post from "./PostList";
import MyPosts from "./MyPosts";
import PostDetail from "./PostDetail";

export default function ApplicationViews({ isLoggedIn }) {
  

  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
          />
          <Route path="login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
          <Route path="register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
          <Route path="userinfo" element={isLoggedIn ? <UserInfo /> : <Navigate to="/login" />} />
          <Route path="posts" element={isLoggedIn ? <Post /> : <Navigate to="/login" />} />
          <Route path="myposts" element={isLoggedIn ? <MyPosts /> : <Navigate to="/login" />} />
          <Route path="/posts/:id" element={isLoggedIn ? <PostDetail /> : <Navigate to="/login" />} />
          <Route path="*" element={isLoggedIn ? <p>Whoops, nothing here...</p> : <Navigate to="/login" />} />
          <Route path="categories" element={isLoggedIn ? <CategoryList /> : <Navigate to="/login" />} />
          <Route path="categories/add" element={isLoggedIn ? <CategoryForm /> : <Navigate to="/login" />} />
          <Route path="categories/edit/:id" element={isLoggedIn ? <CategoryEditForm /> : <Navigate to="/login" />} />
        </Route>
      </Routes>
    </main>
  );
};
