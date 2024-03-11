/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";

function NewBlog({ createBlog }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div className="text-lg">
      <h2 className="text-2xl">create new</h2>
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
              className="ml-1 border border-black rounded-md"
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
              className="ml-1 border border-black rounded-md"
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
              className="ml-1 border border-black rounded-md"
              id="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              placeholder="blog url..."
            />
          </label>
        </div>
        <button
          className="p-2 border border-slate-500 rounded-lg hover:bg-green-200"
          type="submit"
        >
          add
        </button>
      </form>
    </div>
  );
}

export default NewBlog;
