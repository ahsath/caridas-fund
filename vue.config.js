const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

const prod = process.NODE_ENV === 'production'

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
  },
  configureWebpack: {
    plugins: prod ? [new PrerenderSPAPlugin({ staticDir: path.join(__dirname, 'dist'), routes: ['/acerca', '/terminos-y-condiciones'] })] : []
  }
}