import { useState } from 'react';

function NewBlog({ createBlog }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={async (event) => {
        event.preventDefault();
        await createBlog({
          title,
          author,
          url,
        });
        setTitle('');
        setAuthor('');
        setUrl('');
      }}
      >
        <div>
          <label>
            title:
            <input value={title} onChange={({ target }) => setTitle(target.value)} />
          </label>
        </div>
        <div>
          <label>
            author:
            <input value={author} onChange={({ target }) => setAuthor(target.value)} />
          </label>
        </div>
        <div>
          <label>
            url:
            <input value={url} onChange={({ target }) => setUrl(target.value)} />
          </label>
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
}

export default NewBlog;
