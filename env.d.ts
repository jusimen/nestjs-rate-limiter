export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      DATABASE_NAME: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
      SESSION_ID: string;
    }
  }
}
