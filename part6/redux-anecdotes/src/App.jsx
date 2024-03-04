import { useSelector, useDispatch } from "react-redux";
import { addVote, createAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) =>
    state.toSorted((first, second) => second.votes - first.votes)
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(addVote(id));
  };

  const create = (event) => {
    event.preventDefault();
    const content = event.target.content;
    dispatch(createAnecdote(content.value));
    content.value = "";
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input id="content" required />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
