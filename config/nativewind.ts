import { cssInterop } from "nativewind";

import { Image } from "expo-image";

import FeatherIcon from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


cssInterop(Image, { className: "style" });
cssInterop(MaterialCommunityIcons, { className: "style" });
cssInterop(FeatherIcon, { className: "style" });
cssInterop(FontAwesome, { className: "style" });
cssInterop(FontAwesome5, { className: "style" });
cssInterop(FontAwesome6, { className: "style" });