import { View, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import headerBg from "../../../assets/headerBg.jpg";
import questions from "../../data/questions.json";
import GlobalFooter from "../../components/GlobalFooter";
import question_results from "../../data/question_results.json"
// eslint-disable-next-line import/first
import Taro from "@tarojs/taro";
import "./index.scss";
import {getBestQuestionResult} from "../../utils/bizUtils";

/**
 * Result Page
 */

export default () => {
  const answerList = Taro.getStorageSync("answerList");
  if (!answerList || answerList.length === 0) {
    Taro.showToast({
      title: "Answer is empty",
      icon: "error",
      duration: 3000,
    });
    }

  const result = getBestQuestionResult(answerList, questions, question_results);

  return (
    <View className='resultPage'>
      <View className='at-article__h1 title'>{result.resultName}</View>

      <View className='at-article__h2 subtitle'>{result.resultDesc}</View>
      <AtButton type='primary' circle className='enterButton' onClick={() => {
        Taro.reLaunch({
          url: '/pages/index/index'
        })
      }}
      >
        Back to Main Page
      </AtButton>
      <Image className='headerBg' src={headerBg} />
      <GlobalFooter />
    </View>
  );
};
