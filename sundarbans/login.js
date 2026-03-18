async function login() {
  const emailInput = document.getElementById("email");
  const message = document.getElementById("message");

  const email = emailInput.value.trim().toLowerCase();
  message.innerText = "";

  // 🚫 Empty check
  if (!email) {
    message.innerText = "Please enter your email.";
    return;
  }

  // 🎓 IITM domain check
  if (!email.endsWith("@ds.study.iitm.ac.in")) {
    message.innerText = "Only IITM BS emails allowed.";
    return;
  }

  try {
    // 📂 Fetch members list
    const response = await fetch("members.json");
    const data = await response.json();

    // 🔎 Check if email exists
    if (data.members.includes(email)) {
      localStorage.setItem("houseMember", email);
      window.location.href = "members.html";
    } else {
      message.innerText = "You are not registered in Sundarbans House.";
    }

  } catch (error) {
    console.error("Error:", error);
    message.innerText = "System error. Please try again later.";
  }
}
