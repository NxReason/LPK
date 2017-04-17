const { Report, ReportState } = require('../database/models');

const save = data => {
  return Report.create({
    modelName: data.modelName,
    maxSteps: data.maxSteps,
    userId: data.userId,
  })
  .then(report => saveReportStates(data.states, report.id))
}

function saveReportStates(states, id) {
  return ReportState.bulkCreate(
    states.map(state => addKey(state, 'reportId', id))
  );
}

function addKey(obj, key, value) {
  obj[key] = value;
  return obj;
}

/**
 * Get reports data from DB
 * produce some metadata for models from states data
 * return reports array
 */
function userReports(id) {
  return Report.findAll({
    where: { userId: id },
    include: [{ all: true }],
  })
  .then(reports => {
    reports.forEach(report => report.states.sort(sortById))
    return reports;
  })
  .then(reports => reports.map(report => addCommonData(report)))
  .then(reports => reports.map(report => changeTimeUnit(report)))
}

function sortById(a, b) {
  return a.id - b.id;
}

function addCommonData(report) {
  const commonData = report.states.reduce((common, curState) => {
    if (curState.inactive) common.inactiveStates++;
    common.allTime += curState.spentTime;
    return common;
  }, {
    allTime: 0,
    inactiveStates: 0
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

  report.states.forEach(state => state.spentTime = msToSec(state.spentTime, decimals));
  return report;
}

function msToSec(value, fixed) {
  let result = value / 1000;
  if (fixed) result = result.toFixed(fixed);
  return result;
}

module.exports = {
  save,
  userReports
}
