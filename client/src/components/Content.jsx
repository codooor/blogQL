import ReadMore from "./ReadMore";

export default function Content({ content }) {
  return (
    <div className="container">
      <h2>
        <ReadMore> {content}</ReadMore>
      </h2>
    </div>
  );
}
