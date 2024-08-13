import React from 'react';
import './Tag.css';
const Tag = ({ index, selected, value, selectTag }) => {
  const tagStyle = {
    Frontend: { backgroundColor: '#fda821' },
    Backend: { backgroundColor: '#15d4c8' },
    Devops: { backgroundColor: '#ffd12c' },
    'BA/QC': { backgroundColor: '#4cdafc' },
    default: { backgroundColor: '#f9f9f9' },
  };
  return (
    <button
      key={index}
      type="button"
      className="tag"
      style={selected ? tagStyle[value] : tagStyle.default}
      onClick={() => selectTag(value)}
    >
      {value}
    </button>
  );
};

export default Tag;
