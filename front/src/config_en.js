// Config starter code
import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "./components/homePage/chatavatar/BotAvatar";

const config_es = {
  initialMessages: [
    createChatBotMessage(`Hello I'm Omicromio!, What can i help you with?`),
    createChatBotMessage(`1. Contact information\n2. What do we do?\n3. About us`),
  ],
  botName: "Omicromio",
  customComponents: {
    botAvatar: (props) => <BotAvatar {...props} />,
  },
  // Defines an object of custom styles if you want to override styles
  customStyles: {
    // Overrides the chatbot message styles
    botMessageBox: {
      backgroundColor: "#5ccc9d",
    },
    // Overrides the chat button styles
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  state: {
    movieTittle: ["hola", "hih"],
  },
};

export default config_es;
