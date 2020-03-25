const getAnorakBoardColumn = columnId => ({
  '5e66a69097faeb0011ad2af8': 'To Do',
  '5e66a718b3308f0011ccda70': 'To Do',
  '5e66a693b3308f0011ccda4b': 'In Progress',
  '5e66a74c97faeb0011ad2b29': 'In Progress',
  '5e66a695ae732d0011296088': 'Code Review',
  '5e66a697ae732d001129608d': 'Done'
})[columnId] || columnId;

module.exports = {
  getAnorakBoardColumn
};
