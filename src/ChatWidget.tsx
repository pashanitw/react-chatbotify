/* eslint-disable */
import React from "react";
import ChatBot from "./components/ChatBot";
import DynamicForm from "./DynamicForm";


const Chatbot = () => {
    const flow = {
        start: {
            message: "Hello! How can I assist you today?",
            path: "process_message",
        },
        process_message: {
            message: async (params: any) => {
                const userInput = params.userInput;
                try {
                    const response = await fetch("http://localhost:8000/api/chat", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ message: userInput }),
                    });
                    const data = await response.json();
                    return data.response || "Sorry, I didn't understand that.";
                } catch {
                    return "There was an error. Please try again later.";
                }
            },
            path: "process_message",
        },
    };
    const themes = [
        {
            id: "simple_blue",
            version: "0.1.0", // Optional: specify the theme version
        },
    ];

    return (
        <div style={{ maxWidth: "400px", margin: "auto" }}>
            <ChatBot
                themes={themes}
                styles={{
                    notificationBadgeStyle: {
                        display: "none", // Hides the bell icon
                    },
                }}
                settings={{
                    general: { embedded: true },
                    chatHistory: { storageKey: "chat-history" },
                    header: {
                        title: "Aero Simple"
                    },

                }}
                flow={flow}
            />
        </div>
    );
};

export default Chatbot;
