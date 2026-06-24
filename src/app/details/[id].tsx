import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Text, View, Image, Button, TouchableOpacity } from "react-native";

const placeholderUrl = "https://placehold.co/600x400/png";

export default function Details() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <View className="flex-1 py-8 justify-center items-center">
      <Text className="text-black text-2xl font-bold">Details {id}</Text>
      <TouchableOpacity onPress={handleBack}>
        <Text className="text-blue-500 text-md font-bold">{"Back"}</Text>
      </TouchableOpacity>
    </View>
  );
}
