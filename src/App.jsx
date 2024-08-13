import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense, useEffect, useState } from 'react';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Loading from './components/Loading/Loading';

const TaskList = React.lazy(() => import('./pages/TaskList/TaskList'));
const TaskForm = React.lazy(() => import('./components/TaskForm/TaskForm'));
const TaskEdit = React.lazy(() => import('./components/TaskEdit/TaskEdit'));
const TaskView = React.lazy(() => import('./components/TaskView/TaskView'));

const Categories = React.lazy(() => import('./pages/Categories/Categories'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/add-new" element={<TaskForm />} />
          <Route path="/tasks/edit-details/:id" element={<TaskEdit />} />
          <Route path="/tasks/view-details/:id" element={<TaskView />} />

          <Route path="/categories" element={<Categories />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
