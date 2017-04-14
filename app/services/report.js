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

module.exports = {
  save
}
