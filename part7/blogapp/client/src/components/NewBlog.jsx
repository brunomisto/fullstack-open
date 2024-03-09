/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";

function NewBlog({ createBlog }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div>
      <h2>create new</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await createBlog({
            title,
            author,
            url,
          });
          setTitle("");
          setAuthor("");
          setUrl("");
        }}
      >
        <div>
          <label>
            title:
            <input
              id="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              placeholder="blog title..."
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              id="author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              placeholder="blog author..."
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              id="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              placeholder="blog url..."
            />
          </label>
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
}

export default NewBlog;
