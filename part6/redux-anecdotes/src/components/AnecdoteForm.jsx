import { useDispatch } from "react-redux";
import { createAnecdote, setNotification } from "../reducers/store";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = async (event) => {
    event.preventDefault();
    const content = event.target.content;
    dispatch(createAnecdote(content.value));
    dispatch(setNotification(content));
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
