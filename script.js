const form = document.querySelector("form");
const button = document.querySelector(".submit");
const inputs = document.querySelectorAll("input");

button.addEventListener("click", (event) => {
  if (form.checkValidity()) {
    console.log("submitting..");
  } else {
    event.preventDefault();

    inputs.forEach((input) => {
      if (!input.validity.valid) {
        input.style.outline = "1px solid red";
        input.parentElement.querySelector(".error").textContent =
          input.validationMessage;
      }
    });

    return;
  }
});

inputs.forEach((input) => {
  input.addEventListener("focus", checkFocus);

  input.addEventListener("input", checkInputs);

  input.addEventListener("blur", checkBlur);
});

function logInputs(input) {
  console.log(this);
}

function checkFocus() {
  const label = this.parentElement.querySelector("label");
  const line = this.parentElement.querySelector(".line");

  label.classList.add("active");
  setTimeout(() => {
    line.classList.add("active");
  }, 120);
}

function checkInputs() {
  const parent = this.parentElement;
  const error = parent.querySelector(".error");

  if (this.id === "confirm-pwd") {
    if (this.value !== document.getElementById("pwd").value) {
      this.setCustomValidity("Passwords do not match!");
    } else {
      this.setCustomValidity("");
    }
  }

  if (!this.validity.valid) {
    this.style.outline = "1px solid red";
    switch (this.id) {
      case "email":
        error.textContent = "Email is not valid.";
        break;

      case "country":
        error.textContent = "Please provide country.";
        break;

      case "zip":
        error.textContent = "Must contain at least 5 characters.";
        break;

      case "pwd":
        error.textContent = "Must contain at least 8 characters.";
        break;

      case "confirm-pwd":
        error.textContent = "Passwords do not match!";
        break;
    }
  } else {
    this.style.outline = "";
    error.textContent = "";
  }
}

function checkBlur() {
  const label = this.parentElement.querySelector("label");
  const line = this.parentElement.querySelector(".line");

  if (this.value === "") {
    label.classList.remove("active");
    line.classList.remove("active");
  }
}
