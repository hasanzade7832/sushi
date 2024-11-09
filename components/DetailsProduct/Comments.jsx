import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { v4 as uuidv4 } from "uuid";
import { Card } from "primereact/card";

const CommentBox = ({ comments, toggleReplyBox, addReply }) => {
  const renderComments = (commentList) => {
    return commentList.map((comment) => (
      <Card
        key={comment.id}
        className="mb-4 ml-4 p-4 bg-white shadow-lg rounded-lg border border-gray-300 lg:mx-2 sm:mx-0"
        style={{ minWidth: "500px" }} // عرض ثابت برای کارت نظر
      >
        <div className="mb-2 text-gray-800 font-semibold">{comment.text}</div>
        <Button
          onClick={() => toggleReplyBox(comment.id)}
          size="small"
          label="پاسخ"
          className="p-button-outlined mt-2 p-button-text text-blue-700 hover:bg-blue-100"
        />
        {comment.showReply && (
          <div className="mt-2 p-2 bg-gray-50 rounded-lg">
            <InputText
              placeholder="نوشتن پاسخ"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim() !== "") {
                  addReply(comment.id, e.target.value);
                  e.target.value = "";
                }
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              dir="rtl"
            />
          </div>
        )}
        {comment.replies && (
          <div className="mt-4 border-l-4 border-blue-300 pl-4">
            {comment.replies.map((reply) => (
              <div key={reply.id} className="mb-2 text-gray-700">
                {reply.text}
              </div>
            ))}
          </div>
        )}
      </Card>
    ));
  };

  return (
    <div
      className="p-4 bg-gray-100 rounded-md rtl text-right overflow-x-auto"
      style={{ maxWidth: "100%", whiteSpace: "nowrap" }} // محدود کردن عرض و فعال کردن اسکرول افقی
    >
      {renderComments(comments)}
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
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [...comment.replies, { id: uuidv4(), text }],
              showReply: false,
            }
          : comment
      )
    );
  };

  const toggleReplyBox = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, showReply: !comment.showReply }
          : comment
      )
    );
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h4 className="text-right mb-4 font-bold text-blue-900 text-lg lg:text-xl">
        بخش نظرات
      </h4>
      <InputText
        placeholder="نوشتن نظر"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value.trim() !== "") {
            addComment(e.target.value);
            e.target.value = "";
          }
        }}
        className="w-full mb-4 border border-gray-300 rounded-md p-2"
        dir="rtl"
      />
      <CommentBox
        comments={comments}
        toggleReplyBox={toggleReplyBox}
        addReply={addReply}
      />
    </div>
  );
};

export default App;
