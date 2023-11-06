const Web3 = require('web3');

// Подключение к вашему локальному узлу Ethereum (Ganache)
const web3 = new Web3('http://127.0.0.1:8545'); // Замените на соответствующий URL вашего Ganache

// Баланс адреса 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266: 999.973205206727613402 ETH
// Баланс адреса 0x70997970C51812dc3A010C7d01b50e0d17dc79C8: 18974.498508070961042866 ETH
// Баланс адреса 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC: 10000 ETH

// Ваш кошелек и приватный ключ
const yourAddress = '0xf86D3359ed9047662b1CF404Ac639E0742a483c2';
const signPrivateKey = '0xb239d595137590b5c6331a8ec9798e56bc8cd5e5028a2c3e6a88bc5a16ad5a70';

// const signPrivateKey = '0x3d9fa74d4157a59d714992a412d0b5edc309a67cce691cde889b2c881f2f00c9';

// Список адресов, которым нужно начислить эфир
const recipientAddresses = [
    // //alice
    '0x93beB904Abf2B2E6B640E4a178103454162B3030',
    // //bob
    '0xA900c63e2807fA2b3aD3C10fa6c4406424B71fbA',
    //coordinator
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    // Добавьте остальные адреса в этот массив
    '0xf86D3359ed9047662b1CF404Ac639E0742a483c2',

];

async function sendEther() {
    try {
      for (const to of recipientAddresses) {
        const value = web3.utils.toWei('10000', 'ether');
        const gas = 396296; // Лимит газа (постоянный для перевода)
        const gasPrice = await web3.eth.getGasPrice(); // Получаем текущую цену газа
        const maxFeePerGas = 44363475285; // Максимальная цена за газ (может быть установлена совпадающей с текущей ценой)
        const rawTxn = {
          to,
          gas,
          maxFeePerGas,
          value,
          data: '0x', // Дополнительные данные (пусто в данном случае)
        };
  
        const signedTx = await web3.eth.accounts.signTransaction(rawTxn, signPrivateKey);
  
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
        console.log(`Transaction Hash for ${to}: ${receipt.transactionHash}`);
        console.log(`Transaction Status: ${receipt.status === true ? 'Success' : 'Failed'}`);
      }
    } catch (error) {
      console.error(`Transaction Failed: ${error.message}`);
    }
  }
  
  sendEther();