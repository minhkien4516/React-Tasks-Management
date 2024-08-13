import React, { useState } from 'react';
import './TaskForm.css';
import Tag from '../Tag/Tag.jsx';
import { v4 as uuidv4 } from 'uuid';
import { MainLayout } from '../../layout/MainLayout.jsx';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Back from '../../assets/back.png';
import { Form, Row, Col, Modal } from 'react-bootstrap';
import { Category, TaskStatus, TaskTags } from '../../common/TaskCommon.js';
import { showToastMessage } from '../../common/ToastMessage.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../redux/actions/tasksActions.js';

const TaskForm = () => {
  const model = {
    id: '',
    task: '',
    status: 'open',
    createdAt: new Date(),
    description: '',
    dueDate: '',
    category: 'Bug',
    tags: [],
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState(model);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModalAddItem, setShowModalAddItem] = useState(false);

  const isSubmittingAdd = useSelector((state) => state.tasks.isSubmittingAdd);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    const regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    if (!regex.test(taskData.dueDate)) {
      newErrors.dueDate = 'Date must be in the correct format.';
      isValid = false;
    }

    if (taskData.task.trim().length < 5) {
      newErrors.task = 'Task Name must be at least 5 characters long.';
      isValid = false;
    }
    if (taskData.description.trim().length < 5) {
      newErrors.description = 'Description must be at least 5 characters long.';
      isValid = false;
    }
    if (taskData.category.trim().length <= 0) {
      newErrors.category = 'Category must have a value.';
      isValid = false;
    }
    // if (taskData.tags.length <= 0) {
    //   newErrors.tags = 'Tags must be at least 1 value.';
    //   isValid = false;
    // }
    setErrors(newErrors);
    return isValid;
  };

  const checkTag = (tag) => {
    return taskData.tags.some((item) => item === tag);
  };

  const selectTag = (value) => {
    if (taskData.tags.some((item) => item === value)) {
      const filterTags = taskData.tags.filter((element) => element !== value);
      setTaskData((prev) => {
        return { ...prev, tags: filterTags };
      });
    } else {
      setTaskData((prev) => {
        return { ...prev, tags: [...prev.tags, value] };
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => {
      return { ...prev, id: uuidv4(), [name]: value };
    });
  };

  const handleBackButton = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const confirmNavigation = (event) => {
    event.preventDefault();
    setShowModal(false);
    navigate('/tasks');
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!validateForm() || form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setShowModalAddItem(true);
    }
    setValidated(true);
  };

  const confirmSubmit = async (e) => {
    e.preventDefault();
    setShowModalAddItem(false);
    await dispatch(addTask(taskData));
    setErrors({});
    setTaskData(model);
    setIsSubmitted(true);
    setValidated(false);
    showToastMessage('Adding Task Successfully!');
    setTimeout(() => {
      setTaskData(model);
      navigate('/tasks');
    }, 2000);
  };

  return (
    <>
      <MainLayout>
        <div className="container mt-4 d-flex justify-content-center align-items-center">
          <h1 className="container custom-button d-flex justify-content-center align-items-center">
            Add New
          </h1>
          <Button
            variant="secondary"
            onClick={handleBackButton}
            className="container custom-button d-flex justify-content-center align-items-center"
          >
            <img className="back_icon" src={Back} alt="" />
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
                  placeholder="Enter Task"
                  name="task"
                  value={taskData.task}
                  onChange={handleChange}
                  isInvalid={!!errors.task}
                  disabled={isSubmitted}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.task || 'Please provide a task!'}
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
                  value={taskData.dueDate}
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
                value={taskData.category}
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
                value={taskData.description}
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
                value={taskData.status}
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
              className="task_submit_add"
              disabled={isSubmittingAdd}
            >
              Submit
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
            show={showModalAddItem}
            onHide={() => setShowModalAddItem(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Add New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure want to submit the form?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowModalAddItem(false)}
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

export default TaskForm;
