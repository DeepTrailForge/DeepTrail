document.addEventListener("DOMContentLoaded", function () {
 
  const userTokenInput = document.getElementById('userTokenInput');

  // Get the token entered by the user from localStorage
  const userToken = localStorage.getItem("selectedToken");

  // Display the user token on the second screen
  if (userTokenInput) {
      userTokenInput.innerHTML = userToken;
  }

  // Example of initial data values for the functions
  const activeSmartWallets = 50;  // Active smart wallets
  const totalWallets = 200; // Total number of wallets
  const currentVolume = 1500000; // Current volume
  const avgPreviousVolume = 1000000; // Average previous volume
  const tokenLiquidity = 500000; // Token liquidity
  const tokenActivity = 1500; // Token activity (number of transactions)

  // Function definitions

  // Smart Wallet Signal
  function smartWalletSignal(activeSmartWallets, totalWallets) {
    const ratio = activeSmartWallets / totalWallets;
    if (ratio > 0.25) return "Strong signal";
    if (ratio > 0.1) return "Moderate activity";
    return "No signal";
  }

  // Volume Spike Detection
  function volumeSpikeIndex(currentVolume, avgPreviousVolume) {
    return ((currentVolume / avgPreviousVolume) * 100).toFixed(1); // % 
  }

  // Token Trend Analyzer
  function tokenTrendAnalyzer(tokenLiquidity, tokenActivity) {
    const liquidityScore = tokenLiquidity / 1000000;
    const activityScore = tokenActivity / 1000;
    if (liquidityScore > 1.5 && activityScore > 1) {
      return "Uptrend";
    } else if (liquidityScore < 1 && activityScore < 0.5) {
      return "Downtrend";
    }
    return "Stable";
  }

  // Run calculations based on the example data
  const smartWalletSignalREZ = smartWalletSignal(activeSmartWallets, totalWallets);
  const volumeSpikeREZ = volumeSpikeIndex(currentVolume, avgPreviousVolume);
  const tokenTrendREZ = tokenTrendAnalyzer(tokenLiquidity, tokenActivity);

  // Display the results
  if (volumeSpikeElement) volumeSpikeElement.innerHTML = `${volumeSpikeREZ}% Volume Spike`;
  if (smartWalletSignalElement) smartWalletSignalElement.innerHTML = smartWalletSignalREZ;
  if (tokenTrendElement) tokenTrendElement.innerHTML = tokenTrendREZ;

  // Example button handling
  if (exampleBtn) {
      exampleBtn.addEventListener('click', function() {
          window.location.href = 'third_screen.html';
      });
  }

  // Back button handling
  if (backBtn) {
      backBtn.addEventListener('click', function() {
          window.location.href = 'popup.html';
      });
  }
});