import { Redirect, Href } from "expo-router";

export default function Index() {
  return <Redirect href={"/(tabs)/home" as Href} />;
}
