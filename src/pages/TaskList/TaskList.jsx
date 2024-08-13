import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../layout/MainLayout';
import { TaskColumn } from '../../components/TaskColumn/TaskColumn';
import { notifyMovingChange } from '../../common/ToastMessage';
import { TaskStatus } from '../../common/TaskCommon';
import { TaskType } from '../../common/TaskCommon';
import { Pagination } from '../../components/Pagination/Pagination';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTaskByCategory,
  fetchTasks,
  updateTask,
} from '../../redux/actions/tasksActions';
import Loading from '../../components/Loading/Loading';
import { fetchCategories } from '../../redux/actions/categoriesAction';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const categories = useSelector((state) => state.categories.categories);
  const loading = useSelector((state) => state.tasks.loading);
  const errors = useSelector((state) => state.tasks.errors);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCard, setActiveCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchTaskByCategory(selectedCategory, sortOrder));
    } else {
      dispatch(fetchTasks(sortOrder));
    }
  }, [dispatch, selectedCategory, sortOrder]);

  const handleSortChange = (event) => {
    console.log(event.target.value);
    setSortOrder(event.target.value);
    if (selectedCategory) {
      dispatch(fetchTaskByCategory(selectedCategory, sortOrder));
    } else {
      dispatch(fetchTasks(sortOrder));
    }
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const itemsPerPage = 20;

  const onDrop = (status, position) => {
    if (activeCard == null || activeCard == undefined) return;

    const taskToMove = tasks[activeCard];
    const updatedTasks = tasks.filter((task, index) => index !== activeCard);
    updatedTasks.splice(position, 0, {
      ...taskToMove,
      status,
    });
    updatedTasks.filter(async (task) => {
      if (task.id == taskToMove.id) {
        await dispatch(updateTask(task.id, { ...task, createdAt: new Date() }));
        notifyMovingChange('Change Status Successfully!');
        dispatch(fetchTasks(sortOrder));
      }
    });
  };

  // Pagination
  const totalPages = Math.ceil(tasks.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tasks;
  // const currentItems = tasks.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // if (errors) {
  //   return <div>Error When Loading Information of Tasks: {errors}....</div>;
  // }
  return (
    <>
      <MainLayout>
        {loading && <Loading />}
        <div className="app_main-pagination">
          <Pagination
            sortOrder={sortOrder}
            handleSortChange={handleSortChange}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="app_main">
          {TaskStatus().status.map((element) => (
            <TaskColumn
              key={element.key}
              title={TaskType(element.key).value}
              icon={TaskType(element.key).icon}
              status={element.value}
              setActiveCard={setActiveCard}
              onDrop={onDrop}
              currentItems={currentItems}
            />
          ))}
        </div>
      </MainLayout>
      <ToastContainer />
    </>
  );
};

export default TaskList;
