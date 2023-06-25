function quiz(url) {
    const h2 = document.querySelector("h2");
    const p = document.querySelector("p");
    const btn = document.getElementById("reveal");
    const x = document.querySelector(".x");
    const circle = document.querySelector(".circle");
    const nextButton = document.getElementById('next');

    let result = 0;

    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(function (jsonData) {
            var data = jsonData;
            const keys = Object.keys(data);
            nextButton.addEventListener('click', nextElement);


        })
        .catch(function (error) {
            console.log("Error: " + error.message);
        });
}

function nextElement() {
    if (keys.length > 0) {
        var randomIndex = Math.floor(Math.random() * keys.length);
        var randomKey = keys[randomIndex];
        var element = data[randomKey];

        h2.insertAdjacentText("beforebegin", element.word + element.pronounciation);
        p.style.display = "none";
        p.insertAdjacentText("beforebegin", element.meaning);

        //displayedElements.push(randomKey);
        keys.splice(randomIndex, 1);
    } else {
        console.log("すべての要素を表示しました。");
        nextButton.disabled = true; // ボタンを無効化する
    }
}