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
    this.keys = Object.keys(this.data);
    this.h2 = document.querySelector("h2");
    this.p = document.querySelector("p");
    this.btn = document.getElementById("reveal");
    this.nextButton = document.getElementById("next");
    this.x = document.querySelector(".x");
    this.circle = document.querySelector(".circle");

    this.showQuiz = this.showQuiz.bind(this); // showQuizメソッドのthisをバインドする
    this.showMeaning = this.showMeaning.bind(this);
  }

  init() {
    this.nextButton.addEventListener("click", this.showQuiz);
    this.btn.addEventListener("click", this.showMeaning);
    this.displayNextElement();
  }

  displayNextElement() {
    if (this.keys.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.keys.length);
      const randomKey = this.keys[randomIndex];
      const element = this.data[randomKey];

      this.h2.textContent = "";
      this.p.textContent = "";

      this.h2.insertAdjacentText(
        "beforeend",
        element.word + " " + element.pronounciation
      );
      this.p.style.display = "none";
      this.p.insertAdjacentText("beforeend", element.meaning);

      this.keys.splice(randomIndex, 1);
    } else {
      console.log("すべての要素を表示しました。");
      this.nextButton.disabled = true; // ボタンを無効化する
    }
  }
  showMeaning() {
    this.p.style.display = "block";
  }

  showQuiz() {
    this.displayNextElement();
  }
}
