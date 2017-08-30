const { User } = require('../database/').models;

/**
 * Save new report
 */
const save = ({ userId, report }) => {
  report.uuid = Date.now().toString(); // change to actual uuid
  report.datePassed = Date.now();
  return User.findOne({ _id: userId })
    .then((user) => {
      user.reports.push(report);
      return user.save();
    });
};

/**
 * Format user reports
 */
function format(reports) {
  return reports
    .map(report => addCommonData(report))
    .map(report => changeTimeUnit(report));
}

function addCommonData(report) {
  const commonData = report.states.reduce((common, curState) => {
    if (curState.inactive) common.inactiveStates++;
    common.allTime += curState.spentTime;
    return common;
  }, {
    allTime: 0,
    inactiveStates: 0,
  });

  report.allStates = report.states.length;
  report.allTime = commonData.allTime;
  report.avgTime = report.allTime / (report.allStates || 1);
  report.inactiveStates = commonData.inactiveStates;
  return report;
}

function changeTimeUnit(report) {
  const decimals = 2;
  if (report.allTime) report.allTime = msToSec(report.allTime, decimals);
  if (report.avgTime) report.avgTime = msToSec(report.avgTime, decimals);

  report.states.forEach((state) => {
    state.spentTime = msToSec(state.spentTime, decimals);
  });
  return report;
}

function msToSec(value, fixed) {
  let result = value / 1000;
  if (fixed) result = result.toFixed(fixed);
  return result;
}

module.exports = {
  save,
  format,
};
