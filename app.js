const result = document.querySelector("#result");
const calcs = document.querySelector("#calcs");
const buttons = document.querySelectorAll("button");
const theme_button = document.querySelector("#theme_button");
const theme = document.querySelector("#theme");
const arr = [];

const playAnimation = (targetElement, animationName, durationSecs) => {
    if (!targetElement.classList.contains(animationName)) {
        targetElement.classList.add(animationName);
        setTimeout(() => {
            targetElement.classList.remove(animationName);
        }, durationSecs);
    }
}

theme_button.parentElement.addEventListener("click", () => {
    const currentTheme = theme.href.split("/");
    const name = currentTheme[currentTheme.length-1];
    name === "light.css" ? theme.href = "./styles/dark.css" : theme.href = "./styles/light.css"
}); 

buttons.forEach(button => {
    button.addEventListener("click", () => {
        try {
            const registerInput = () => {
                if (calcs.textContent.length < 30) {
                    arr.push(button.textContent)
                } else {
                    playAnimation(calcs, "shake", 500)
                }
            }

            const displayResult = () => {
                calcs.textContent = arr.join("");
                const input = arr[arr.length - 1];
                if (input !== "-" && input !== "+" && input !== "*" && input !== "/") {
                    result.textContent = eval(calcs.textContent);

                    if (result.textContent === "NaN") {
                        throw Error()
                    }
                }
            }

            switch (button.textContent) {
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                case "+":
                case "-":
                case "/":
                case "*":
                case "0":
                case ".":
                    registerInput();
                    displayResult();
                    break;
                case "DEL":
                    arr.pop();
                    displayResult();
                    break;
                case "C":
                    arr.length = 0;
                    result.textContent = "";
                    calcs.textContent = "";
                    buttons.forEach(b => b.disabled = false)
                    break;
                case "=":
                    if (calcs.textContent.length) {
                        result.textContent = eval(calcs.textContent);
                        arr.length = 0;
                        arr.push(result.textContent);
                        calcs.textContent = arr.join("");
                        result.textContent = "";
                        playAnimation(calcs, "pop", 1000)
                    }
                    break;
            }
        }
        catch (e) {
            buttons.forEach(b => b.disabled = true)
            result.textContent = "Error";
            const cIndex = Array.from(buttons).findIndex(b => b.textContent === "C");
            buttons[cIndex].disabled = false;
        }
    })
})