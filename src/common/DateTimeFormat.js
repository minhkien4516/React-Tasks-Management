export const dateTimeFormat = () => {
  const currentDate = new Date();

  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const dateString =
    currentDayOfMonth + '/' + (currentMonth + 1) + '/' + currentYear;
  return dateString;
};

export const convertDateFormat = (dateString) => {
  // Split the input date string into an array
  const [month, day, year] = dateString.split('/');

  // Return the date in DD/MM/YYYY format
  return `${day}/${month}/${year}`;
};
