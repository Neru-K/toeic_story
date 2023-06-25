function quiz(url) {
  let result = 0;

  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (jsonData) {
      const nextElement = new NextElement(jsonData);
      nextElement.init();
    })
    .catch(function (error) {
      console.log("Error: " + error.message);
    });
}

class NextElement {
  constructor(jsonData) {
    this.data = jsonData;
    this.keys = Object.keys(data);
    this.h2 = document.querySelector("h2");
    this.p = document.querySelector("p");
    this.btn = document.getElementById("reveal");
    this.nextButton = document.getElementById("next");
    this.x = document.querySelector(".x");
    this.circle = document.querySelector(".circle");
  }

  init() {
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];
    const element = data[randomKey];

    this.h2.insertAdjacentText(
      "beforebegin",
      element.word + element.pronounciation
    );
    this.p.style.display = "none";
    this.p.insertAdjacentText("beforebegin", element.meaning);

    this.nextButton.addEventListener("click", this.showQuiz);
  }

  showQuiz() {
    this.keys.splice(randomIndex, 1);
    if (this.keys.length > 0) {
      const randomIndex = Math.floor(Math.random() * keys.length);
      const randomKey = keys[randomIndex];
      const element = data[randomKey];

      this.h2.insertAdjacentText(
        "beforebegin",
        element.word + element.pronounciation
      );
      this.p.style.display = "none";
      this.p.insertAdjacentText("beforebegin", element.meaning);
    } else {
      console.log("すべての要素を表示しました。");
      this.nextButton.disabled = true; // ボタンを無効化する
    }
  }
}
