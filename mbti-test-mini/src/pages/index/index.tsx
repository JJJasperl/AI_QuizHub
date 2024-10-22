import { View, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import headerBg from "../../../assets/headerBg.jpg";
import GlobalFooter from "../../components/GlobalFooter";
import "./index.scss";
import Taro from "@tarojs/taro";

/**
 * Main Page
 */

export default () => {
  return (
    <View className='indexPage'>
      <View className='at-article__h1 title'>MBTI Personality Test</View>

      <View className='at-article__h2 subtitle'>Describe Who You Are!</View>
      <AtButton type='primary' circle className='enterButton'  onClick={() => {
        Taro.navigateTo({
          url: '/pages/question/index'
        })
      }}
      >
        Start
      </AtButton>
      <Image className='headerBg' src={headerBg} />
      <GlobalFooter />
    </View>
  );
};
