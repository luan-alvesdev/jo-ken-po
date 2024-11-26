const TelegramBot = require('node-telegram-bot-api');
const jogar = require('./game');

const token = '7605251314:AAFNdy7K7DenoGyRFgVZ-w9mXFYJ4V_OCSQ';
const bot = new TelegramBot(token, { polling: true });

// Objeto para armazenar os nomes dos usuários
let userNames = {};
let userSessions = {};
let handledQueries = {};  // Para armazenar queries já processadas
let lastMessageId = null;

bot.on('message', (msg) => {
    console.log(msg)
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (messageText === '/start') {
        bot.sendMessage(chatId, 'Boas vindas! Qual seu nome?');
        // Esperar a resposta do usuário
        bot.once('message', (responseMsg) => {
            const name = responseMsg.text; // Salva o nome enviado pelo usuário
            userNames[chatId] = name; // Salva o nome associado ao chatId
            userSessions[chatId] = true;
            bot.sendMessage(chatId, `Prazer em te conhecer, ${userNames[chatId]}! Gostaria de iniciar o jogo? Para isso, toque aqui: /jogar`);
        });
    }
    if (userSessions[chatId]) {
        if (messageText === '/jogar') {
            // bot.sendMessage(chatId, 'Vamos jogar Jan-ken-po! Para isso, escolha sua jogada: /pedra, /papel e /tesoura!');
            // Primeira imagem com botões associados
            bot.sendPhoto(chatId, 'https://i.pinimg.com/736x/5b/14/01/5b1401d0d4e8a48ef11fe2730f301892.jpg', {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "Pedra",
                                callback_data: "pedra"
                            },
                            {
                                text: "Papel",
                                callback_data: "papel"
                            },
                            {
                                text: "Tesoura",
                                callback_data: "tesoura"
                            }
                        ]
                    ]
                }
            });
        }

        const mensagemJogarNovamente = function() {
            // `Deseja jogar novamente? Escolha: ` + 
            bot.sendPhoto(chatId, 'https://i.pinimg.com/736x/5b/14/01/5b1401d0d4e8a48ef11fe2730f301892.jpg', {
                caption: 'Deseja jogar novamente? Escolha:',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "Pedra",
                                callback_data: "pedra"
                            },
                            {
                                text: "Papel",
                                callback_data: "papel"
                            },
                            {
                                text: "Tesoura",
                                callback_data: "tesoura"
                            }
                        ]
                    ]
                }
            });
        }
    
        bot.on('callback_query', (callbackQuery) => {
            const message = callbackQuery.message;
            const data = callbackQuery.data;
            const queryId = callbackQuery.id;  // Pegando o id da query
    
            // Verificando se já tratamos essa query
            if (handledQueries[queryId]) return;
            handledQueries[queryId] = true;  // Marcando a query como tratada
    
            if (data === 'pedra') {
                const resp = jogar(0, Math.floor(Math.random() * 3));
                if (resp === 'a') {
                    bot.sendMessage(message.chat.id, `Parabéns ${userNames[message.chat.id]}, você venceu!`)
                    .then(() => {
                        return mensagemJogarNovamente();
                    })
                } else if (resp === 'b') {
                    bot.sendMessage(message.chat.id, `Que pena, você perdeu!`)
                    .then(() => {
                        return mensagemJogarNovamente();
                    })
                } else {
                    bot.sendMessage(message.chat.id, `Empatou!`)
                    .then(() => {
                        return mensagemJogarNovamente();
                    })
                }
            }
    
            if (data === 'papel') {
                const resp = jogar(1, Math.floor(Math.random() * 3));
                if (resp === 'a') {
                    bot.sendMessage(message.chat.id, `Parabéns ${userNames[message.chat.id]}, você venceu!`)
                    .then(() => {
                        return mensagemJogarNovamente();
                    })
                } else if (resp === 'b') {
                    bot.sendMessage(message.chat.id, `Que pena, você perdeu!`)
                    .then(() => {
                        return mensagemJogarNovamente();
                    })
                } else {
                    bot.sendMessage(message.chat.id, `Empatou!`)
                    .then(() => {
                        return mensagemJogarNovamente();
                    })
                }
            }
    
            if (data === 'tesoura') {
                const resp = jogar(2, Math.floor(Math.random() * 3));
                if (resp === 'a') {
                    bot.sendMessage(message.chat.id, `Parabéns ${userNames[message.chat.id]}, você venceu!`)
                    .then(() => {
                        return mensagemJogarNovamente();
                    })
                } else if (resp === 'b') {
                    bot.sendMessage(message.chat.id, `Que pena, você perdeu!`)
                    .then(() => {
                        return mensagemJogarNovamente();
                    })
                } else {
                    bot.sendMessage(message.chat.id, `Empatou!`)
                    .then(() => {
                        return mensagemJogarNovamente();
                    })
                }
            }
        });
    } 

});