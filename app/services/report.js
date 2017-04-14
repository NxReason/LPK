const { Report, ReportState } = require('../database/models');

const save = data => {
  console.log(data);
  console.log(typeof Report);
  console.log(typeof ReportState);
  // console.log()
}

module.exports = {
  save
}
