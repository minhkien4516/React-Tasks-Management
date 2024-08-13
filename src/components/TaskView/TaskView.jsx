import React, { useEffect } from 'react';
import { TaskStatusValue } from '../../common/TaskCommon';
import { useNavigate, useParams } from 'react-router-dom';
import { MainLayout } from '../../layout/MainLayout';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Back from '../../assets/back.png';
import Edit from '../../assets/check-mark-button.png';
import './TaskView.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTaskDetail } from '../../redux/actions/tasksActions';
import Loading from '../Loading/Loading';
import { convertDateFormat } from '../../common/DateTimeFormat';

const TaskView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const taskDetail = useSelector((state) => state.tasks.taskDetail);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  useEffect(() => {
    if (id) {
      dispatch(fetchTaskDetail(id));
    }
  }, [dispatch, id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!taskDetail) {
    return <div>No task found.</div>;
  }
  return (
    <>
      <MainLayout>
        {loading && <Loading />}
        <div className="container d-flex justify-content-center align-items-center">
          <h1 className="container mt-4 custom-button d-flex justify-content-center align-items-center">
            Task Details
          </h1>
          <Button
            variant="secondary"
            onClick={() => navigate('/tasks')}
            className="container mt-4 custom-button d-flex justify-content-center align-items-center"
          >
            <img className="back_icon" src={Back} alt="Back" />
            Back
          </Button>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Form className="mt-4 p-4 border w-75 rounded bg-light">
            {/* <Row className="d-flex align-items-center gap-2 mb-3">
              <Col className="form-label">ID:</Col>
              <Col>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={taskDetail.id}
                ></Form.Control>
              </Col>
            </Row> */}

            <Row className="d-flex align-items-center gap-2 mb-3">
              <Col className="form-label">Task:</Col>
              <Col>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={taskDetail.task}
                ></Form.Control>
              </Col>
            </Row>

            <Row className="d-flex align-items-center gap-2 mb-3">
              <Col className="form-label">Created At:</Col>
              <Col>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={taskDetail.createdAt}
                ></Form.Control>
              </Col>
            </Row>

            <Row className="d-flex align-items-center gap-2 mb-3">
              <Col className="form-label">Description:</Col>
              <Col>
                <Form.Control
                  as="textarea"
                  plaintext
                  readOnly
                  defaultValue={taskDetail.description}
                ></Form.Control>
              </Col>
            </Row>

            <Row className="d-flex align-items-center gap-2 mb-3">
              <Col className="form-label">Due Date:</Col>
              <Col>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={convertDateFormat(
                    new Date(taskDetail.dueDate).toLocaleDateString()
                  )}
                ></Form.Control>
              </Col>
            </Row>

            <Row className="d-flex align-items-center gap-2 mb-3">
              <Col className="form-label">Tags:</Col>
              <Col>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={
                    taskDetail?.tags ? taskDetail?.tags.join(', ') : ''
                  }
                ></Form.Control>
              </Col>
            </Row>

            <Row className="d-flex align-items-center gap-2 mb-3">
              <Col className="form-label">Category:</Col>
              <Col>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={taskDetail.category}
                ></Form.Control>
              </Col>
            </Row>

            <Row className="d-flex align-items-center gap-2 mb-3">
              <Col className="form-label">Status:</Col>
              <Col>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={TaskStatusValue(taskDetail?.status)}
                ></Form.Control>
              </Col>
            </Row>
            <Button
              variant="primary"
              onClick={() => navigate(`/tasks/edit-details/${id}`)}
              className="container custom-button-edit d-flex justify-content-center align-items-center"
            >
              <img className="edit-btn" src={Edit} alt="Back" />
              Edit
            </Button>
          </Form>
        </div>
      </MainLayout>
      <ToastContainer />
    </>
  );
};
export default TaskView;
