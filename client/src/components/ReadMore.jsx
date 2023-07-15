import { useState } from "react";
import ReactMarkdown from "react-markdown";

function ReadMore({ children }) {
  const markdownContent = String(children);
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div className="text">
      {isReadMore ? (
        <ReactMarkdown>{markdownContent.slice(0, 150)}</ReactMarkdown>
      ) : (
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      )}
      <span onClick={toggleReadMore} style={{ cursor: "pointer" }}>
        {isReadMore ? "...read more" : " show less"}
      </span>
    </div>
  );
}

export default ReadMore;
