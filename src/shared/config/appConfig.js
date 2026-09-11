const appConfig = {
  name: "STALLIFS Insurance",

  apiUrl:
    import.meta.env.VITE_API_URL ||
    "http://localhost:3000/api",

  environment:
    import.meta.env.MODE || "development",

  isProduction:
    import.meta.env.PROD,

  isDevelopment:
    import.meta.env.DEV,

  defaultCurrency: "KES",

  defaultLocale: "en-KE",

  pagination: {
    defaultPage: 1,
    defaultLimit: 10,
  },
};

export default appConfig;