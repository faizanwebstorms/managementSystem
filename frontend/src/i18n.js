import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      dashboard: "Dashboard",
      home: "Home",
      profile: "Profile",
      contact: "Contact",
      settings: "Settings",
      logout: "Logout",
      welcomeMessage: "Welcome to your Dashboard",
      recentActivities: "Recent Activities",
      item1: "Item 1",
      item2: "Item 2",
      item3: "Item 3",
      /* Add all other translatable content here */
    },
  },
  zh: {
    translation: {
      dashboard: "仪表板",
      home: "家",
      profile: "个人资料",
      contact: "接触",
      settings: "设置",
      logout: "登出",
      welcomeMessage: "欢迎来到您的仪表板",
      recentActivities: "最近活动",
      item1: "项目 1",
      item2: "项目 2",
      item3: "项目 3",
      /* Add all other translatable content here */
    },
  },
  ur: {
    translation: {
      dashboard: "ڈیش بورڈ",
      home: "گھر",
      profile: "پروفائل",
      contact: "رابطہ",
      settings: "ترتیبات",
      logout: "لاگ آوٹ",
      welcomeMessage: "آپ کے ڈیش بورڈ پر خوش آمدید",
      recentActivities: "حالیہ سرگرمیاں",
      item1: "آئٹم 1",
      item2: "آئٹم 2",
      item3: "آئٹم 3",
      /* Add all other translatable content here */
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
