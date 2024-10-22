/**
 * Get the best scoring result based on the answers and questions
 * @param {Array} answerList - List of user answers (e.g., ["A", "B"])
 * @param {Array} questions - List of questions with options
 * @param {Array} questionResults - List of possible results
 */
export function getBestQuestionResult(answerList, questions, questionResults) {
  // Object to store counts of each result type
  const optionCount = {};

  // Traverse through the list of questions
  for (const question of questions) {
    // Traverse through the list of user-selected answers
    for (const answer of answerList) {
      // Traverse through each option in the question
      for (const option of question.options) {
        // If the option key matches the user answer
        if (option.key === answer) {
          const result = option.result;
          // Increment the count for the result type
          optionCount[result] = (optionCount[result] || 0) + 1;
        }
      }
    }
  }

  // Initialize variables to track the best score and corresponding result
  let maxScore = 0;
  let bestResult = questionResults[0];

  // Traverse through the list of possible results
  for (const result of questionResults) {
    // Calculate the score for the current result
    const score = result.resultProp.reduce((count, prop) => count + (optionCount[prop] || 0), 0);

    // Update the best result if the current score exceeds the max score
    if (score > maxScore) {
      maxScore = score;
      bestResult = result;
    }
  }

  // Return the best scoring result
  return bestResult;
}

// Sample data
const answerList = ["B", "B", "B", "A"];
const questions = [
  {
    title: "Which do you prefer?",
    options: [
      {
        result: "I",
        value: "Working alone",
        key: "A",
      },
      {
        result: "E",
        value: "Working with others",
        key: "B",
      },
    ],
  },
  {
    title: "Regarding daily scheduling",
    options: [
      {
        result: "S",
        value: "Structured and routine",
        key: "A",
      },
      {
        result: "N",
        value: "Flexible and spontaneous",
        key: "B",
      },
    ],
  },
  {
    title: "When facing problems",
    options: [
      {
        result: "P",
        value: "Consider possibilities first",
        key: "A",
      },
      {
        result: "J",
        value: "Consider consequences first",
        key: "B",
      },
    ],
  },
  {
    title: "How do you perceive time?",
    options: [
      {
        result: "T",
        value: "Time is a valuable resource",
        key: "A",
      },
      {
        result: "F",
        value: "Time is a flexible concept",
        key: "B",
      },
    ],
  },
];

const questionResults = [
  {
    resultProp: ["I", "S", "T", "J"],
    resultDesc: "Loyal and reliable, known for practicality and attention to detail.",
    resultPicture: "icon_url_istj",
    resultName: "ISTJ (Logistician)",
  },
  {
    resultProp: ["I", "S", "F", "J"],
    resultDesc: "Kind and caring, characterized by compassion and responsibility.",
    resultPicture: "icon_url_isfj",
    resultName: "ISFJ (Defender)",
  },
];

console.log(getBestQuestionResult(answerList, questions, questionResults));
