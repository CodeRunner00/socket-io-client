import React from "react";

const ChatMessage = (props) => {
    const { messageData } = props;
    return (
        <div>
            <p style={{ fontWeight: "bold" }}>{messageData.author}</p>
            <p>{messageData.message}</p>
        </div>
    );
}

export default ChatMessage;