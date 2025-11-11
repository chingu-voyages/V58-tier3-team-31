module.exports = function (api) {
 api.cache(true);


 return {
   presets: ['babel-preset-expo'],
   plugins: [
     [
       'module:react-native-dotenv',
       {
         moduleName: '@env',
         path: '../../.env.local', // path from mobile/ folder to root .env.local
         safe: false,              // set to true if you want .env.example validation
         allowUndefined: true,     // don't throw if variable is undefined
       },
     ],
   ],
 };
};
