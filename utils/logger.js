const info = (data) => {
  console.log(data);
}

const error = (data) => {
  console.error(data);
}

const logger = {
  info,
  error,

};

export default logger;