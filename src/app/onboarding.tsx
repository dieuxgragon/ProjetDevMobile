import { useRouter } from "expo-router";
import { View } from "react-native";
import { useAsyncStorage } from "../hooks/use-async-storage";
import { Slider } from "../components/slider";

const items = [
  {
    id: "1",
    imageUrl:
      "https://i.pinimg.com/736x/5a/f3/12/5af312bd3ebb3a67d92bc1e266065d30.jpg",
    title: "Start Cooking",
    text:"Let's join our community to cook better food!",
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [_, setOnboardingCompleted] = useAsyncStorage(
    "onboardingCompleted",
    false,
  );

  const onComplete = () => {
    setOnboardingCompleted(true);
    router.replace("/");
  };

  return (
    <View className="flex-1 bg-white">
      <Slider items={items} onComplete={onComplete} />
    </View>
  );
}
