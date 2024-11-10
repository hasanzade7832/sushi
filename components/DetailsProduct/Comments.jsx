import React, { useState } from "react";
import { Button } from "primereact/button";
import { v4 as uuidv4 } from "uuid";
import { Card } from "primereact/card";

const CommentBox = ({ comments, toggleReplyBox, addReply, depth = 0 }) => {
  const renderComments = (commentList, depth) => {
    return commentList.map((comment) => (
      <Card
        key={comment.id}
        className="mb-4 p-4 bg-white shadow-lg rounded-lg border border-gray-300"
        style={{
          minWidth: "500px",
          marginRight: `${depth * 20}px`,
        }}
      >
        <div className="mb-2 text-gray-800 font-semibold">{comment.text}</div>
        <Button
          onClick={() => toggleReplyBox(comment.id)}
          size="small"
          label="پاسخ"
          className="p-button-outlined mt-2 p-button-text text-blue-700 hover:bg-blue-100"
        />
        {comment.showReply && (
          <div className="mt-2 p-2 bg-gray-50 rounded-lg flex items-center flex-row-reverse">
            <textarea
              placeholder="نوشتن پاسخ"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (e.target.value.trim() !== "") {
                    addReply(comment.id, e.target.value);
                    e.target.value = "";
                  }
                }
              }}
              className="w-full border border-gray-300 rounded-md p-2 resize-none"
              dir="rtl"
            />
            <Button
              icon="pi pi-send"
              className="mr-2 p-button-rounded p-button-text text-blue-700 hover:bg-blue-100"
              onClick={(e) => {
                const input = e.currentTarget.previousSibling;
                if (input && input.value.trim() !== "") {
                  addReply(comment.id, input.value);
                  input.value = "";
                }
              }}
            />
          </div>
        )}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 border-l-4 border-blue-300 pl-4">
            {renderComments(comment.replies, depth + 1)}
          </div>
        )}
      </Card>
    ));
  };

  return (
    <div
      className="p-4 bg-gray-100 rounded-md rtl text-right overflow-x-auto"
      style={{
        maxWidth: "100%",
        whiteSpace: "nowrap",
        direction: "rtl",
      }}
    >
      {renderComments(comments, depth)}
    </div>
  );
};

const App = () => {
  const [comments, setComments] = useState([]);

  const addComment = (text) => {
    setComments([
      ...comments,
      {
        id: uuidv4(),
        text,
        replies: [],
        showReply: false,
      },
    ]);
  };

  const addReply = (commentId, text) => {
    const addReplyToComment = (commentList) => {
      return commentList.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...(comment.replies || []),
              { id: uuidv4(), text, replies: [], showReply: false },
            ],
            showReply: false,
          };
        } else if (comment.replies) {
          return {
            ...comment,
            replies: addReplyToComment(comment.replies),
          };
        }
        return comment;
      });
    };

    setComments(addReplyToComment(comments));
  };

  const toggleReplyBox = (commentId) => {
    const toggleReplyBoxForComment = (commentList) => {
      return commentList.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, showReply: !comment.showReply };
        } else if (comment.replies) {
          return {
            ...comment,
            replies: toggleReplyBoxForComment(comment.replies),
          };
        }
        return comment;
      });
    };

    setComments(toggleReplyBoxForComment(comments));
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h4 className="text-right mb-4 font-bold text-blue-900 text-lg lg:text-xl">
        بخش نظرات
      </h4>
      <div className="flex items-center flex-row-reverse mb-4">
        <textarea
          placeholder="نوشتن نظر"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (e.target.value.trim() !== "") {
                addComment(e.target.value);
                e.target.value = "";
              }
            }
          }}
          className="w-full border border-gray-300 rounded-md p-2 resize-none"
          dir="rtl"
        />
        <Button
          icon="pi pi-send"
          className="mr-2 p-button-rounded p-button-text text-blue-700 hover:bg-blue-100"
          onClick={(e) => {
            const input = e.currentTarget.previousSibling;
            if (input && input.value.trim() !== "") {
              addComment(input.value);
              input.value = "";
            }
          }}
        />
      </div>
      <CommentBox
        comments={comments}
        toggleReplyBox={toggleReplyBox}
        addReply={addReply}
      />
    </div>
  );
};

export default App;
