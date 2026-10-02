(() => {
  const dialog = document.querySelector('.pekenna-dialog');
  const openButtons = document.querySelectorAll('[data-open-chat]');
  const closeButton = document.querySelector('[data-close-chat]');
  const form = document.querySelector('#chat-form');
  const input = document.querySelector('#chat-input');
  const log = document.querySelector('#chat-log');
  const quickQuestions = document.querySelectorAll('[data-question]');

  if (!(dialog instanceof HTMLDialogElement) || !form || !input || !log) return;

  const answers = [
    {
      matches: ['aprende', 'aprender', 'aprendizagem', 'método', 'metodo', 'ciclo', 'melhorar', 'automatizar'],
      text: 'Meu jeito de aprender é um ciclo: Observar → Aprender → Aplicar → Compartilhar → Automatizar → Melhorar → Registrar → Revisar → Repetir. Assim cada passo pode ficar mais claro e mais seguro. 🌀',
    },
    {
      matches: ['quem', 'pekenna', 'pequena'],
      text: 'Eu sou a Pekenna da Biblioteca 🌸 Uma companhia alegre para apresentar a parte pública de Lumiuni. Eu não tenho acesso à Redoma, só ao que foi liberado aqui.',
    },
    {
      matches: ['lumiuni', 'universo', 'clã', 'kazoku'],
      text: 'Lumiuni é um universo ficcional brasileiro, familiar, acolhedor e não violento. Aqui a gente valoriza memória, criatividade, cuidado e proteção. ✨',
    },
    {
      matches: ['protegido', 'privado', 'redoma', 'senha', 'arquivo', 'conversa', 'perfil', 'ficha', 'drive'],
      text: 'A Redoma continua fechada 🛡️ Conversas, perfis, fichas internas, arquivos, Drive, senhas e ferramentas do Códice não fazem parte da Biblioteca e não podem ser vistos por mim.',
    },
    {
      matches: ['ler', 'texto', 'blog', 'koiuny', 'cantinho'],
      text: 'Os textos públicos ficam no Cantinho da Koiuny 📚 O botão “Ler no Blogger” abre a estante pública com os textos autorizados.',
    },
    {
      matches: ['sacrifício', 'sacrificio'],
      text: 'Aqui “sacrifício feliz” fala de cuidado voluntário por amor, nunca de dor ou de sofrimento. É uma ideia de proteger e ajudar com carinho. 💛',
    },
    {
      matches: ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite'],
      text: 'Oi! Que alegria te ver na Biblioteca 🌸 Posso falar sobre Lumiuni, leitura pública e os limites que protegem a Redoma.',
    },
  ];

  function addMessage(text, type) {
    const message = document.createElement('p');
    message.className = `message ${type === 'visitor' ? 'visitor-message' : 'pekenna-message'}`;
    message.textContent = text;
    log.appendChild(message);
    log.scrollTop = log.scrollHeight;
  }

  function answer(question) {
    const normalized = question.toLocaleLowerCase('pt-BR');
    const found = answers.find((item) => item.matches.some((term) => normalized.includes(term)));
    return found?.text ?? 'Eu consigo responder sobre a Biblioteca Pública: Lumiuni, os textos autorizados, quem eu sou e o que a Redoma protege. Escolhe uma das perguntinhas acima? 🌸';
  }

  function ask(question) {
    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;
    addMessage(cleanQuestion, 'visitor');
    input.value = '';
    window.setTimeout(() => addMessage(answer(cleanQuestion), 'pekenna'), 180);
  }

  function openChat() {
    dialog.showModal();
    window.setTimeout(() => input.focus(), 0);
  }

  openButtons.forEach((button) => button.addEventListener('click', openChat));
  closeButton?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    ask(input.value);
  });
  quickQuestions.forEach((button) => button.addEventListener('click', () => ask(button.dataset.question ?? '')));
})();
