export const Error = ({message}) => {
  return (
    <div className="error">
      <h2>⚠️ Error</h2>
      <p>Something went wrong in {message}</p>
    </div>
  );
}