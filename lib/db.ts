import { AppDataSource } from "./datasource";

export async function initializeDB() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  return AppDataSource;
}