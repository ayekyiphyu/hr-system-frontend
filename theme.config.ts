const themeConfig = {
  colors: {
    primary: "#D6351A",
    secondary: "#FFF8F8",
    white: "#ffffff",
    black: "#333333",
    green: "#286E34",
    yellow: "#FFEEAA",
    blue: "#C8EDFD",
    darkBlue: "#023F81",
    red: "#df4759",
    yellowLight: "#3498db",
    greenLight: "#32ff7e",
    navy: "#130f40",
    orange: "#f39c12",
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
    fontSmall: "0.9rem",
  },
};

export default themeConfig;
