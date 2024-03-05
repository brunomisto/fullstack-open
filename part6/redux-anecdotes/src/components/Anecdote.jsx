import { useDispatch } from "react-redux";
import { addVote, setNotification } from "../reducers/store";
import PropTypes from "prop-types";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id));
    dispatch(setNotification(`you voted '${anecdote.content}'`));
  };

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  );
};

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired,
};

export default Anecdote;
