export default function normalize(source) {
  const result = {};

  result.name = source.name;
  result.initialState = source.initialState;
  result.steps = source.steps;
  result.breakTime = source.breakTime * 1000;
  result.tools = Object.values(source.tools);

  result.states = Object.values(source.states).map((sourceState) => {
    const actions = extractActions(sourceState.actions, source);
    const parameters = extractParameters(sourceState.parameters, source);
    const last = actions.length === 0;
    return Object.assign({}, sourceState, { actions, parameters, last });
  });

  return result;
}

function extractActions(actionIds, scheme) {
  return actionIds.map((aId) => {
    const action = scheme.actions[aId];
    const result = {};
    result.nextState = action.nextState;
    result.inactive = action.inactive === undefined ? false : action.inactive;

    if (!action.tools) { return result; }

    result.time = {
      min: action.time.min * 1000,
      max: action.time.max * 1000,
    };

    result.tools = Object.values(action.tools).map(({ id, value }) => {
      const tool = scheme.tools[id];
      const res = {};

      res.type = tool.type;
      res.uuid = tool.uuid;

      switch (tool.type) {
        case 'switch':
          res.switchValue = value;
          break;
        case 'range':
          res.rangeValues = value;
          break;
        default:
          console.warn('Invalid tool type');
          break;
      }
      return res;
    });
    return result;
  });
}

function extractParameters(parameterIds, scheme) {
  return parameterIds.map(pId => scheme.parameters[pId]);
}
