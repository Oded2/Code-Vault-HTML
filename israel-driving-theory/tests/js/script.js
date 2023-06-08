(async function () {
  const questions = await getQuestions((lang = "EN"));
  console.log(questions);
  sort(questions, 0);
})();

function sort(array, arrayNum) {
  let question = array[arrayNum].question;
  let image = array[arrayNum].imageUrl;
  let answers = array[arrayNum].answers;
  let category = array[arrayNum].category;
  let correct = array[arrayNum].correctAnswer;
  document.getElementById("question").innerText = question;
  if (image) {
    document.getElementById("image").src = image;
    document.getElementById("image").alt = image;
  }
  for (let i = 0; i < 4; i++) {
    let label = "a" + (i + 1) + "label";
    document.getElementById(label).innerText = answers[i];
  }
  document.getElementById("category").innerText = "Category: " + category;
}
