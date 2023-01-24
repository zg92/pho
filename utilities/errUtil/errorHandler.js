const handleError = (error) => {
  console.log("Error:", error.message);
  return error;
};

module.exports = { handleError };
