import React, { useState } from 'react';
import './TaskColumn.css';
import { TaskCard } from '../TaskCard/TaskCard';
import { DropArea } from '../DropArea/DropArea';

export const TaskColumn = ({
  title,
  icon,
  onDrop,
  status,
  setActiveCard,
  currentItems,
}) => {
  return (
    <>
      <section className="task_column">
        <h2 className="task_column_heading">
          <img className="task_column_icon" src={icon} alt="" /> {title}
        </h2>

        <DropArea onDrop={() => onDrop(status, 0)} />

        {currentItems.map(
          (task, index) =>
            task.status === status && (
              <React.Fragment key={index}>
                <TaskCard
                  title={task.task}
                  tags={task.tags}
                  task={task}
                  index={index}
                  setActiveCard={setActiveCard}
                  id={task.id}
                />
                <DropArea onDrop={() => onDrop(status, index + 1)} />
              </React.Fragment>
            )
        )}
      </section>
    </>
  );
};
