
import dotenv from 'dotenv';
dotenv.config();
import venom from 'venom-bot';
import SqsConsumer from '../consumer/SqsConsumer.js'

venom
  .create(
    'markfy-notification',
    undefined,
    (statusSession, session) => {
      console.log('Status Session: ', statusSession);
      //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || initWhatsapp || erroPageWhatsapp || successPageWhatsapp || waitForLogin || waitChat || successChat
      //Create session wss return "serverClose" case server for close
      console.log('Session name: ', session);
    }
  )
  .then((client) => {
    console.log('Venom iniciado!');
    const sqs = new SqsConsumer(client);
    sqs.start();
  })
  .catch((erro) => {
    console.log(erro);
  });



