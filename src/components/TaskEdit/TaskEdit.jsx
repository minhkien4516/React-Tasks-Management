/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './TaskEdit.css';
import { showToastMessage } from '../../common/ToastMessage';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MainLayout } from '../../layout/MainLayout';
import { Form, Button, Col, Modal, Row } from 'react-bootstrap';
import Back from '../../assets/back.png';
import { Category, TaskStatus, TaskTags } from '../../common/TaskCommon';
import Tag from '../Tag/Tag';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTaskDetail, updateTask } from '../../redux/actions/tasksActions';
import Loading from '../Loading/Loading';

const TaskEdit = () => {
  const model = {
    id: '',
    task: '',
    status: 'todo',
    createdAt: new Date(),
    description: '',
    dueDate: '',
    category: 'Bug',
    tags: [],
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalEditItem, setShowModalEditItem] = useState(false);

  const { id } = useParams();
  const isSubmittingEdit = useSelector((state) => state.tasks.isSubmittingEdit);
  const taskDetail = useSelector((state) => state.tasks.taskDetail);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  const [taskModify, setTaskModify] = useState(model);
  useEffect(() => {
    if (id) {
      dispatch(fetchTaskDetail(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (taskDetail) {
      setTaskModify(taskDetail ?? model);
    }
  }, [taskDetail]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!taskModify) {
    return <div>No task found.</div>;
  }

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    const regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    if (!regex.test(taskModify.dueDate)) {
      console.log(taskModify.dueDate);
      newErrors.dueDate = 'Date must be in the correct format.';
      isValid = false;
    }

    if (taskModify.task.trim().length < 5) {
      newErrors.task = 'Task Name must be at least 5 characters long.';
      isValid = false;
    }
    if (taskModify.description.trim().length < 5) {
      newErrors.description = 'Description must be at least 5 characters long.';
      isValid = false;
    }
    if (taskModify.category.trim().length <= 0) {
      newErrors.category = 'Category must have a value.';
      isValid = false;
    }
    // if (taskModify.tags.length <= 0) {
    //   newErrors.tags = 'Tags must be at least 1 value.';
    //   isValid = false;
    // }
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskModify((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const selectTag = (value) => {
    if (taskModify.tags.some((item) => item === value)) {
      const filterTags = taskModify.tags.filter((element) => element !== value);
      setTaskModify((prev) => {
        return { ...prev, tags: filterTags };
      });
    } else {
      setTaskModify((prev) => {
        return { ...prev, tags: [...prev.tags, value] };
      });
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!validateForm() || form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setShowModalEditItem(true);
    }
    setValidated(true);
  };

  const confirmSubmit = async (e) => {
    e.preventDefault();
    setShowModalEditItem(false);
    await dispatch(updateTask(id, { ...taskModify, createdAt: new Date() }));
    setErrors({});
    setIsSubmitted(true);
    setValidated(false);
    showToastMessage('Editing Task Successfully!');
    setTimeout(() => {
      setTaskModify(model);
      navigate('/tasks');
    }, 2000);
  };

  const handleBackButton = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const confirmNavigation = () => {
    setShowModal(false);
    navigate('/tasks');
  };

  const checkTag = (tag) => {
    return taskModify.tags.some((item) => item === tag);
  };
  return (
    <>
      <MainLayout>
        <div className="container mt-4 d-flex justify-content-center align-items-center">
          <h1 className="container custom-button d-flex justify-content-center align-items-center">
            Edit Task
          </h1>
          <Button
            variant="secondary"
            onClick={handleBackButton}
            className="container custom-button d-flex justify-content-center align-items-center"
          >
            <img className="back_icon_second" src={Back} alt="" />
            Back
          </Button>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Form
            noValidate
            validated={validated}
            className="mt-4 p-4 border w-75 rounded bg-light"
            onSubmit={handleFormSubmit}
          >
            <Row className="mb-3">
              <Form.Group as={Col} controlId="task">
                <Form.Label>
                  Task <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter task"
                  name="task"
                  value={taskModify.task}
                  onChange={handleChange}
                  isInvalid={!!errors.task}
                  disabled={isSubmitted}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.task || 'Please provide a task.'}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="dueDate">
                <Form.Label>
                  Due Date <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="date"
                  name="dueDate"
                  value={taskModify.dueDate}
                  onChange={handleChange}
                  isInvalid={!!errors.dueDate}
                  disabled={isSubmitted}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dueDate || 'Please provide a due date!'}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>
                Category <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                required
                as="select"
                name="category"
                value={taskModify.category}
                onChange={handleChange}
                isInvalid={!!errors.category}
                disabled={isSubmitted}
              >
                {Category().category.map((item) => (
                  <option className="mb-3" key={item.key} value={item.value}>
                    {item.value}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.category || 'Please choose a category!'}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>
                Description <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                placeholder="Enter Description"
                name="description"
                value={taskModify.description}
                onChange={handleChange}
                isInvalid={!!errors.description}
                disabled={isSubmitted}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description ||
                  'Please fulfill the description of task ticket!'}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="tags">
              <Form.Label>Tags</Form.Label>
              <div>
                {TaskTags().map((item) => (
                  <Tag
                    key={item.key}
                    value={item.value}
                    selectTag={selectTag}
                    selected={checkTag(item.value)}
                    isInvalid
                  />
                ))}
              </div>

              {/* {errors.tags && (
                <Form.Control.Feedback
                  type="invalid"
                  style={{ display: 'block' }}
                >
                  {errors.tags}
                </Form.Control.Feedback>
              )} */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="status">
              <Form.Label>
                Status <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                required
                as="select"
                name="status"
                value={taskModify.status}
                onChange={handleChange}
                isInvalid={!!errors.status}
                disabled={isSubmitted}
              >
                {TaskStatus().status.map((item) => (
                  <option className="mb-3" key={item.key} value={item.value}>
                    {item.description}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.status || 'Please choose a status of the task ticket!'}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="task_submit"
              disabled={isSubmittingEdit}
            >
              Edit
            </Button>
          </Form>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Back To Home</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure want to go back to the home page? Unsaved changes
              will be lost.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={confirmNavigation}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showModalEditItem}
            onHide={() => setShowModalEditItem(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure want to submit the form?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowModalEditItem(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={(e) => confirmSubmit(e)}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </MainLayout>
      <ToastContainer />
    </>
  );
};

export default TaskEdit;
