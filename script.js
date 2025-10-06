const codes = document.querySelectorAll(".code");

// Auto-focus first box
codes[0].focus();

codes.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    const value = e.target.value;
    if (value.length === 1 && index < codes.length - 1) {
      codes[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace") {
      if (input.value === "" && index > 0) {
        codes[index - 1].focus();
        codes[index - 1].value = "";
      } else {
        input.value = "";
      }
    }
  });
});
