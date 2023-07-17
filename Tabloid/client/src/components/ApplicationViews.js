import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import CategoryList from "./CategoryList";
import UserInfo from "./UserProfileComponents/UserInfo";
import CategoryForm from "./CategoryForm";
import CategoryEditForm from "./CategoryEditForm";
import Post from "./Post";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={isLoggedIn ? <Register /> : <Navigate to="/login" />} />
          <Route path="userinfo" element={isLoggedIn ? <UserInfo /> : <Navigate to="/login" />} />
          <Route path="posts" element={isLoggedIn ? <Post /> : <Navigate to="/login" />} />
          <Route path="*" element={isLoggedIn ? <p>Whoops, nothing here...</p> : <Navigate to="/login" />} />
          <Route path="categories" element={isLoggedIn ? <CategoryList/> : <Navigate to="/login" />}/>
          <Route path="categories/add" element={isLoggedIn ? <CategoryForm/> : <Navigate to="/login" />}/>
          <Route path="categories/edit/:id" element={isLoggedIn ? <CategoryEditForm/> : <Navigate to="/login" />}/>
        </Route>
      </Routes>
    </main>
  );
};
