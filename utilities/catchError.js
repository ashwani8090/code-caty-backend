const catchAsycn = (fn) => (res, req, next) => {
  return Promise.resolve(fn(res, req, next)).catch(next);
};
module.exports = catchAsycn;
