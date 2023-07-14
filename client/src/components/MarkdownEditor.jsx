import { marked } from "marked";

const MarkdownEditor = ({ content, setContent }) => {
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="MarkdownEditor">
      <textarea
        id="markdown-input"
        onChange={handleChange}
        placeholder="Enter some markdown here!"
        value={content}
        style={{ height: "400px", width: "100%", fontSize: "0.8rem" }}
      />
    </div>
  );
};

export default MarkdownEditor;
