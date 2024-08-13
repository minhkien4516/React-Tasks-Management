import Open from '../assets/direct-hit.png';
import InProgress from '../assets/glowing-star.png';
import Completed from '../assets/check-mark-button.png';
import Archived from '../assets/innovation.png';

export const TaskTags = () => {
  return [
    { key: '1', value: 'Frontend' },
    { key: '2', value: 'Backend' },
    { key: '3', value: 'Devops' },
    { key: '4', value: 'BA/QC' },
  ];
};

export const Category = () => {
  return {
    category: [
      { key: '1', value: 'Bug' },
      { key: '2', value: 'Defect' },
      { key: '3', value: 'Blocker' },
      { key: '4', value: 'Deploy' },
    ],
  };
};

export const TaskStatus = () => {
  return {
    status: [
      { key: '1', value: 'open', description: 'Open' },
      { key: '2', value: 'inProgress', description: 'In Progress' },
      { key: '3', value: 'completed', description: 'Completed' },
      { key: '4', value: 'archived', description: 'Archived' },
    ],
  };
};

export const TaskTag = (tags) => {};

export const TaskStatusValue = (key) => {
  let value = '';
  switch (key) {
    case 'open':
      value = 'Open';
      break;
    case 'inProgress':
      value = 'In Progress';
      break;
    case 'completed':
      value = 'Completed';
      break;
    case 'archived':
      value = 'Archived';
      break;
    default:
      value = '';
  }
  return value;
};

export const TaskType = (key) => {
  let value = '';
  let icon = '';
  switch (key) {
    case '1':
      value = 'Open';
      icon = Open;
      break;
    case '2':
      value = 'In Progress';
      icon = InProgress;
      break;
    case '3':
      value = 'Completed';
      icon = Completed;
      break;
    case '4':
      value = 'Archived';
      icon = Archived;
      break;
    default:
      value = '';
      icon = '';
  }
  return { value, icon };
};
