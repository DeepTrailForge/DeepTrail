interface TokenSnapshot {
  name: string;
  volumeIndex: number;
  signalStrength: string;
  flashRisk: string;
}

function display(snapshot: TokenSnapshot): void {
  console.log(`📊 ${snapshot.name}: Vol ${snapshot.volumeIndex} | Signal ${snapshot.signalStrength} | Flash ${snapshot.flashRisk}`);
}