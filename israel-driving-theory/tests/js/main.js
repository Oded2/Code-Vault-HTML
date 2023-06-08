/*
 * Parses the HTML content in each record of the input data, extracting question information.
 * @param {Object} data - The input data containing the records to parse.
 * @returns {Object[]} An array of question objects.
 */
function parseQuestions(data) {
  return data.result.records.map((record) => {
    const htmlContent = record.description4;

    // Matches both the normal answers and the correct answer.
    // It then removes HTML tags and trims whitespace from each answer.
    const answersMatch = htmlContent.match(
      /<li><span>(.*?)<\/span><\/li>|<span id=\"correctAnswer\d+\">(.*?)<\/span>/g
    );
    const answers = answersMatch
      ? answersMatch.map((answer) =>
          answer.replace(/<\/?[^>]+(>|$)/g, "").trim()
        )
      : [];

    // Matches the correct answer and extracts it, or null if no match was found.
    const correctAnswerMatch = htmlContent.match(
      /<span id=\"correctAnswer\d+\">(.*?)<\/span>/
    );
    const correctAnswer = correctAnswerMatch ? correctAnswerMatch[1] : null;

    // Matches the image URL and extracts it, or null if no match was found.
    const imageUrlMatch = htmlContent.match(/<img src=\"(.*?)\"/);
    const imageUrl = imageUrlMatch ? imageUrlMatch[1] : null;

    // Extracts the question number from the title.
    const questionNumber = record.title2.split(".")[0];

    return {
      questionNumber: questionNumber,
      question: record.title2.split(". ")[1], // Excludes the part before the dot
      answers: answers,
      correctAnswer: correctAnswer,
      category: record.category,
      imageUrl: imageUrl, // Adds the image URL to the result object
    };
  });
}

async function getQuestions(lang = "HE", count = 30, category = "All") {
  let resource_id;
  switch (lang) {
    case "HE":
      resource_id = "bf7cb748-f220-474b-a4d5-2d59f93db28d";
      break;
    case "AR":
      resource_id = "fe998a65-83a3-45e5-b4b7-3e0ce86ae072";
      break;
    case "EN":
      resource_id = "9a197011-adf9-45a2-81b9-d17dabdf990b";
      break;
    case "FR":
      resource_id = "a106ea08-ff97-4971-8720-c85bdd3d2264";
      break;
    case "RU":
      resource_id = "ca264280-1669-45ce-a96f-a4c9ed71e812";
      break;
    default:
      resource_id = "bf7cb748-f220-474b-a4d5-2d59f93db28d";
      break;
  }

  const data = await fetch(
    `https://data.gov.il/api/3/action/datastore_search?resource_id=${resource_id}&limit=${count}`
  ).then((response) => response.json());
  const allQuestions = await parseQuestions(data);
  let questions = [];

  if (category === "All") {
    questions = allQuestions;
  } else {
    //TODO: filter by category (with locale)
  }

  // Shuffle the array to randomize the questions
  questions = shuffleArray(questions);

  // Return the desired number of questions, ensuring it doesn't exceed the available questions
  return questions.slice(0, Math.min(count, questions.length));
}

// Helper function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
