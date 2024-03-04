import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = (event) => {
    event.preventDefault();
    const content = event.target.content;
    dispatch(createAnecdote(content.value));
    content.value = "";
  };

  return (
    <div>
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

export default AnecdoteForm;
