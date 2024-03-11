function Like({ onClick }) {
  return (
    <button
      className="px-2 bg-green-300 border border-black rounded-lg"
      onClick={onClick}
    >
      like
    </button>
  );
}

export default Like;
