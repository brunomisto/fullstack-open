import { useDispatch } from "react-redux";
import {
  createAnecdote,
  setNotification,
  removeNotification,
} from "../reducers/store";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const showNotification = (content) => {
    dispatch(setNotification(content));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  const create = async (event) => {
    event.preventDefault();
    const content = event.target.content;
    dispatch(createAnecdote(content.value));
    showNotification(content.value);
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
