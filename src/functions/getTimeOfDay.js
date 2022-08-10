export const getTimeOfDay = () => {
  let today = new Date().getHours();

  if (today < 12) {
    return 'Good Morning';
  } else if (today < 18) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
};
