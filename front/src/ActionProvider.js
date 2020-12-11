// ActionProvider starter code
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  opcionUnoHanddler = () => {
    let message = this.createChatBotMessage(
      "Write us an e-mail to omicron@gmail.com",
    );
    if (navigator.language.startsWith("es")) {
      message = this.createChatBotMessage(
        "Escríbenos un correo a omicron@gmail.com",
      );
    }

    this.setChatbotMessage(message);
  };

  opcionDosHanddler = () => {
    let message = this.createChatBotMessage(
      "We allow teachers to receive the activities of their students in virtual times",
    );
    if (navigator.language.startsWith("es")) {
      message = this.createChatBotMessage(
        "Permitimos a los profesores ver las actividades enviadas por los estudiantes a través de Telegram de manera organizada. Con el propósito de que el proceso de calificar y hacer seguimiento de las actividades se vuelva un tarea fácil en tiempos de virtualidad.",
      );
    }
    this.setChatbotMessage(message);
  };

  opcionTresHanddler = () => {
    let message = this.createChatBotMessage(
      "We are Computer and Systems Engineering students at the University of Los Andes who observed how 96% of the country's municipalities do not have the resources or the coverage to develop virtual courses.",
    );
    if (navigator.language.startsWith("es")) {
      message = this.createChatBotMessage(
        "Somos estudiantes de Ingeniería de Sistemas y Computación en la Universidad de Los Andes que observó cómo el 96% de los municipios del país no tiene los recursos ni la cobertura para desarrollar cursos virtuales.",
      );
    }
    this.setChatbotMessage(message);
  };

  setChatbotMessage = (message) => {
    this.setState((state) => ({
      ...state,
      messages: [...state.messages, message],
    }));
  };
}

export default ActionProvider;
