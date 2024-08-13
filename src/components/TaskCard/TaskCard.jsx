import React, { useState } from 'react';
import './TaskCard.css';
import Tag from '../Tag/Tag';
import Delete from '../../assets/delete.png';
import Edit from '../../assets/edit.png';
import View from '../../assets/view.png';
import { Link } from 'react-router-dom';
import ShowConfirmModal from '../ShowConfirmModal';
import { showToastMessage } from '../../common/ToastMessage';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../redux/actions/tasksActions';

export const TaskCard = ({ title, tags, task, index, setActiveCard, id }) => {
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const dispatch = useDispatch();
  const handleShowModal = (element) => {
    setTaskToDelete(element);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setTaskToDelete(null);
    setShowModal(false);
  };

  const handleDelete = async () => {
    if (taskToDelete) {
      setShowModal(false);
      await dispatch(deleteTask(taskToDelete.id));
      setTaskToDelete(null);
      showToastMessage('Deleting Data Successfully');
    }
  };

  return (
    <>
      <article
        className="task_card"
        draggable
        onDragStart={() => setActiveCard(index)}
        onDragEnd={() => setActiveCard(null)}
      >
        <p className="task_text">{title}</p>
        <p className="task_date">
          Due Date: {new Date(task?.dueDate).toLocaleDateString()}
        </p>
        <p className="task_category">Category: {task?.category}</p>
        <div className="task_card_bottom_line">
          <div className="task_card_tags">
            {tags.map((tag, index) => (
              <Tag key={index} value={tag} selected={true} />
            ))}
          </div>
          <div className="task_card_action">
            <div className="task_view">
              <Link to={`/tasks/view-details/${id}`}>
                <img src={View} alt="" className="view_icon" />
              </Link>
            </div>
            <div className="task_edit">
              <Link to={`/tasks/edit-details/${id}`}>
                <img src={Edit} alt="" className="edit_icon" />
              </Link>
            </div>
            <div className="task_delete">
              <button onClick={() => handleShowModal(task)}>
                <img src={Delete} alt="" className="delete_icon" />
              </button>
            </div>
            <ShowConfirmModal
              title={'Confirm Delete Task'}
              body={'Are you sure want to delete this task?'}
              action={'Delete'}
              show={showModal}
              handleClose={handleCloseModal}
              handleAction={handleDelete}
            />
          </div>
        </div>
      </article>
    </>
  );
};
