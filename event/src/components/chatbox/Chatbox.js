import React, { useState } from 'react';
import './Chatbox.css';

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  const generateBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

if (msg.includes('oi') || msg.includes('olá') || msg.includes('bom dia') || msg.includes('boa tarde')) {
    return 'Olá! Bem-vindo ao sistema de gerenciamento de eventos. Como posso te ajudar? 😊';
  } else if (msg.includes('quais eventos') || msg.includes('eventos disponíveis') || msg.includes('lista de eventos')) {
    return 'Atualmente temos os seguintes eventos disponíveis: Feira de Tecnologia, Workshop de Marketing e Congresso de Saúde.';
  } else if (msg.includes('como me inscrevo') || msg.includes('inscrição') || msg.includes('cadastrar')) {
    return 'Para se inscrever em um evento, vá até a página de eventos, escolha o evento desejado e clique em "Inscrever-se".';
  } else if (msg.includes('onde acontece') || msg.includes('local') || msg.includes('localização')) {
    return 'Os eventos acontecem no Centro de Convenções da cidade. Consulte o evento específico para detalhes de endereço.';
  } else if (msg.includes('quando') || msg.includes('data') || msg.includes('datas dos eventos')) {
    return 'As datas dos eventos estão disponíveis na página de detalhes de cada evento.';
  } else if (msg.includes('custo') || msg.includes('preço') || msg.includes('valor')) {
    return 'Alguns eventos são gratuitos, outros têm um custo de inscrição. Verifique as informações na página do evento desejado.';
  } else if (msg.includes('contato') || msg.includes('falar com alguém') || msg.includes('ajuda')) {
    return 'Se precisar de ajuda, entre em contato conosco pelo e-mail: contato@eventos.com ou pelo telefone (11) 99999-9999.';
  } else if (msg.includes('cancelar') || msg.includes('desistir') || msg.includes('reembolso')) {
    return 'Para cancelar sua inscrição, acesse sua conta, vá até "Meus Eventos" e clique em "Cancelar Inscrição". Reembolsos estão sujeitos à política de cancelamento.';
  } else {
    return 'Desculpe, ainda estou aprendendo sobre eventos... Por favor, reformule sua pergunta ou consulte a nossa página de FAQ.';
  }
};

  const handleSend = () => {
    if (newMessage.trim() !== '') {
      const userMessage = newMessage;
      const botResponse = generateBotResponse(userMessage);

      setMessages([...messages, { sender: 'user', text: userMessage }, { sender: 'bot', text: botResponse }]);
      setNewMessage('');
    }
  };

  return (
    <div className="chatbox-container">
      <button onClick={toggleChatbox} className="chatbox-toggle">
        {isOpen ? 'Fechar Chat' : 'Abrir Chat'}
      </button>

      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbox-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbox-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
