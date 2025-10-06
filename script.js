document.addEventListener("DOMContentLoaded", () => {
  const inputs = Array.from(document.querySelectorAll(".code"));

  // Ensure required ids exist (code-1 .. code-6)
  inputs.forEach((inp, i) => { inp.id = `code-${i + 1}`; });

  // Initial focus on first box
  inputs[0].focus();

  inputs.forEach((input, idx) => {
    // Accept only digits, move forward on entry
    input.addEventListener("input", (e) => {
      let v = e.target.value.replace(/\D/g, "");
      e.target.value = v.slice(-1);               // keep only last digit
      if (e.target.value && idx < inputs.length - 1) {
        inputs[idx + 1].focus();
      }
    });

    // Backspace behavior:
    // - if box has value: clear it (stay here)
    // - if box empty: move focus to previous and clear it
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        if (input.value === "" && idx > 0) {
          e.preventDefault();
          inputs[idx - 1].value = "";
          inputs[idx - 1].focus();
        }
      }
    });
  });

  // Nice-to-have: paste a 6-digit code
  inputs[0].addEventListener("paste", (e) => {
    const text = (e.clipboardData || window.clipboardData)
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, inputs.length);

    if (!text) return;
    e.preventDefault();

    text.split("").forEach((ch, i) => { inputs[i].value = ch; });
    const focusIndex = Math.min(text.length, inputs.length) - 1;
    inputs[Math.max(focusIndex, 0)].focus();
  });
});
