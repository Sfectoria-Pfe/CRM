import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendComment } from "../../store/comment";

const AddCommentForm = ({ stageClientId }) => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim() === "") {
      return;
    }
    try {
      await dispatch(sendComment({ content, stageClientId }));
      setContent("");
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment..."
          rows={4}
          cols={50}
        />
      </div>
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default AddCommentForm;
