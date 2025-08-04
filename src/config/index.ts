import Config from 'react-native-config';

export interface AppConfig {
  ENV: string;
  API_URL: string;
  APP_NAME: string;
  APP_BUNDLE_ID: string;
  LOG_LEVEL: string;
  ENABLE_LOGGING: boolean;
  ENABLE_ANALYTICS: boolean;
}

export const appConfig: AppConfig = {
  ENV: Config.ENV || 'development',
  API_URL: Config.API_URL || 'https://dev-api.smartplatform.com',
  APP_NAME: Config.APP_NAME || 'SmartPlatform Dev',
  APP_BUNDLE_ID: Config.APP_BUNDLE_ID || 'com.baseSetup.dev',
  LOG_LEVEL: Config.LOG_LEVEL || 'debug',
  ENABLE_LOGGING: Config.ENABLE_LOGGING === 'true',
  ENABLE_ANALYTICS: Config.ENABLE_ANALYTICS === 'true',
};

export const isDevelopment = appConfig.ENV === 'development';
export const isStaging = appConfig.ENV === 'staging';
export const isProduction = appConfig.ENV === 'production';

export const getApiUrl = (): string => appConfig.API_URL;
export const getAppName = (): string => appConfig.APP_NAME;
export const getLogLevel = (): string => appConfig.LOG_LEVEL;
export const shouldEnableLogging = (): boolean => appConfig.ENABLE_LOGGING;
export const shouldEnableAnalytics = (): boolean => appConfig.ENABLE_ANALYTICS;

export default appConfig;
