import useWordList from "../hooks/useWordList";

export default function Words(): JSX.Element {
  const locale = "en-GB";
  const { data, isLoading, error } = useWordList(locale);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error !== null) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {(data ?? []).slice(0, 15).map((word, index) => (
        <p key={index}>{word}</p>
      ))}
    </div>
  );
}
