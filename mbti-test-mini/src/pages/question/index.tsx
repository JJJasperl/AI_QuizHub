import { View } from "@tarojs/components";
import { AtButton, AtRadio } from "taro-ui";
import GlobalFooter from "../../components/GlobalFooter";
import questions from "../../data/questions.json";
import "./index.scss";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";

/**
 * Question Page
 */

export default () => {
  const [current, setCurrent] = useState<number>(1); // current question number
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]); // current question
  const questionOptions = currentQuestion.options.map((option) => {
    return { label: `${option.key}. ${option.value}`, value: option.key };
  });
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [answerList] = useState<string[]>([]);


  // update current question and answer when current number changes
  useEffect(() => {
    setCurrentQuestion(questions[current - 1]);
    setCurrentAnswer(answerList[current - 1]);
  }, [current]);

  return (
    <View className="questionPage">
      {/*{JSON.stringify(answerList)}*/}
      <View className="at-article__h1 title">
        {current} {currentQuestion.title}
      </View>
      <view className="options-wrapper">
        <AtRadio
          options={questionOptions}
          value={currentAnswer}
          onClick={(value) => {
            answerList[current - 1] = value;
            setCurrentAnswer(value);
          }}
        />
      </view>

      {
        // if it's not the first question, show the previous question button
        current > 1 && (
          <AtButton
            type="primary"
            circle
            className="enterButton"
            onClick={() => setCurrent(current - 1)}
          >
            Previous Question
          </AtButton>
        )
      }

      {
        // if it's not the last question, show the next question button
        current < questions.length && (
          <AtButton
            circle
            className="enterButton"
            onClick={() => setCurrent(current + 1)}
            disabled={!currentAnswer}
          >
            Next Question
          </AtButton>
        )
      }

      {
        // if it's the last question, show the check result button
        current === questions.length && (
          <AtButton
            type="primary"
            circle
            className="enterButton"
            disabled={!currentAnswer}
            onClick={() => {
              // pass the answer list to the result page
              Taro.setStorageSync("answerList", answerList);

              // navigate to the result page
              Taro.navigateTo({
                url: "/pages/result/index",
              });
            }}
          >
            Check Result
          </AtButton>
        )
      }

      <GlobalFooter />
    </View>
  );
};
