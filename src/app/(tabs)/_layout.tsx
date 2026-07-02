// @ts-ignore: CSS import type declarations missing
import "../../global.css";
import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";

export default function Layout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon
          sf={{ default: 'house', selected: 'house.fill' }}
          androidSrc={require('../../../assets/icons/Home.png')}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="favoris">
        <Icon
          sf={{ default: 'heart', selected: 'heart.fill' }}
          androidSrc={require('../../../assets/icons/Path_33961(2).png')}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="notifications">
        <Icon
          sf={{ default: 'bell', selected: 'bell.fill' }}
          androidSrc={require('../../../assets/icons/Notification.png')}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <Icon
          sf={{ default: 'person', selected: 'person.fill' }}
          androidSrc={require('../../../assets/icons/Profile.png')}
        />
      </NativeTabs.Trigger>

      
    </NativeTabs>
  );
}
