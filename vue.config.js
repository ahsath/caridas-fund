module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    name: 'Caridas',
    themeColor: '#90caf9',
    msTileColro: '#121212',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#121212',
    workboxOptions: {
      skipWaiting: true
    }
  }
}