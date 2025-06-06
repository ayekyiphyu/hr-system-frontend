const themeConfig = {
  colors: {
    primary: "#283747",
    secondary: "#EAEDED",
    secondaryDark: "#283747 ",
    white: "#ffffff",
    gray: "#cccccc",
    grayLight: "#c0c0c0",
    black: "#000000",
    green: "#badc58",
    yellow: "#f9ca24",
    purple: "#341f97",
    red: "#df4759",
    blue: "#227093",
    yellowLight: "#3498db",
    greenLight: "#32ff7e",
    navy: "#130f40",
  } as { [key: string]: string },
  fontFamily: {
    body: [
      "Hiragino Kaku Gothic Pro W3",
      "游ゴシック",
      "YuGothic",
      "ヒラギノ角ゴ ProN W3",
      "Hiragino Kaku Gothic ProN",
      "メイリオ",
      "Meiryo",
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      "sans-serif",
    ],
  },
  fontSize: {
    fontError: "5rem",
    fontHeader: "3rem",
    fontTitle: "2rem",
    fontLarge: "1.6rem",
    fontRegular: "1.2rem",
  },
};

export default themeConfig;
