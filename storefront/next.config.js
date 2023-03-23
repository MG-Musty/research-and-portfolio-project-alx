const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")

module.exports = withStoreConfig({
  features: store.features,
  reactStrictMode: true,
      images: {
        domains: ["medusa-public-images.s3.eu-west-1.amazonaws.com", "localhost", "127.0.0.1", "mg-foods-and-market-store.s3.us-west-1.amazonaws.com"],
    },
//             remotePatterns: [
//           {
//             protocol: 'https',
//             hostname: 'mg-foods-and-market-store.s3.us-west-1.amazonaws.com',
//             port: 'localhost',
//             pathname: '/public/**',
//           },
//         ],
})

console.log("next.config.js", JSON.stringify(module.exports, null, 2))
