import "../../global.css";
import { NativeTabs, Icon } from "expo-router/unstable-native-tabs";

export default function Layout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Icon
          sf={{ default: 'house', selected: 'house.fill' }}
          androidSrc={require('../../../assets/icons/Home.png')}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="favoris">
        <Icon
          sf={{ default: 'heart', selected: 'heart.fill' }}
          androidSrc={require('../../../assets/icons/Path_33961.png')}
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
