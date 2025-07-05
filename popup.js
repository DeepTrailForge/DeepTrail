document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generateBtn");
  const tokenInput = document.getElementById("tokenInput");

  if (!generateBtn || !tokenInput) return;

  generateBtn.addEventListener("click", () => {
    const token = tokenInput.value.trim();

    if (!token) {
      alert("Please enter a valid token address or ID");
      tokenInput.focus();
      return;
    }

    try {
      localStorage.setItem("selectedToken", token);
      window.location.href = "stats.html";
    } catch (e) {
      console.error("Error saving token to localStorage:", e);
      alert("An error occurred. Please try again.");
    }
  });

  // Optional: allow pressing Enter in input field to trigger generation
  tokenInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") generateBtn.click();
  });
});
