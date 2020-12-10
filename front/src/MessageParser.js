class MessageParser {

    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      const lowercase = message.toLowerCase();
    
      if(lowercase.includes("1")  ) {
        this.actionProvider.opcionUnoHanddler()
      }
      if(lowercase.includes("2") ) {
        this.actionProvider.opcionDosHanddler()
      }
      if(lowercase.includes("3") ) {
        this.actionProvider.opcionTresHanddler()
      }
  
    }
  }
  
  export default MessageParser;
  