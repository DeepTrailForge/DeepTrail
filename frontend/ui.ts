interface WalletScore {
  address: string;
  score: number;
}

function generateWallets(): WalletScore[] {
  const wallets: WalletScore[] = [];
  for (let i = 0; i < 10; i++) {
    const score = Math.floor(Math.random() * 100);
    wallets.push({ address: `wallet_${i}`, score });
  }
  return wallets;
}

function render(wallets: WalletScore[]): void {
  wallets.forEach(wallet => {
    console.log(`🧠 ${wallet.address} — Score: ${wallet.score}`);
  });
}

const walletData = generateWallets();
render(walletData);