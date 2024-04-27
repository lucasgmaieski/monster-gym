const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

module.exports = (() => {
  // Obter a configuração padrão do Metro do Expo
  const defaultConfig = getDefaultConfig(__dirname);

  // Adicionar configurações adicionais
  const config = {
    ...defaultConfig,
    // Adicionar configurações específicas do NativeWind, se necessário
  };

  // Adicionar configurações do React Native SVG Transformer
  const { transformer, resolver } = config;
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  // Se necessário, aplicar configurações do NativeWind
  const finalConfig = withNativeWind(config, { input: './src/styles/global.css' });

  return finalConfig;
})();
