const reducer = (state = "", action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "CHANGE":
      return action.payload;
    default:
      return state;
  }
};

export const changeFilter = (input) => ({
  type: "CHANGE",
  payload: input,
});

export default reducer;
