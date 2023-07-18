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
          <Route path="register" element={<Register />} />
          <Route path="userinfo" element={<UserInfo />} />
          <Route path="posts" element={<Post />} />
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
          <Route path="categories" element={<CategoryList/>}/>
          <Route path="categories/add" element={<CategoryForm/>}/>
          <Route path="categories/edit/:id" element={<CategoryEditForm/>}/>
        </Route>
      </Routes>
    </main>
  );
};
