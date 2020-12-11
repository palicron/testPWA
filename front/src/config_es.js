// Config starter code
import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "./components/homePage/chatavatar/BotAvatar";

const config_es = {
  initialMessages: [
    createChatBotMessage(`Hola soy Omicromio!, ¿en qué te puedo ayudar hoy?`),
    createChatBotMessage(`1. ¿Cómo los contacto?\n2. ¿Qué hacemos? \n 3. ¿Quiénes somos?`),
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
