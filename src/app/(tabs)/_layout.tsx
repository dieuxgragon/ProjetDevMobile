import "../../global.css";
import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";

export default function Layout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search">
        <Icon sf="gear" drawable="custom_settings_drawable" />
        <Label>Search</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
