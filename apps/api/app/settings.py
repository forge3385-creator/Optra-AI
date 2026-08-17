from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    NODE_ENV: str = "development"
    DATABASE_URL: str = "postgresql+asyncpg://copilot:copilot@localhost:5432/operations_copilot"
    MONGO_URI: str = "mongodb://localhost:27017"
    MONGO_DB: str = "operations_copilot"
    REDIS_URL: str = "redis://localhost:6379/0"
    JWT_SECRET: str = "change-me-32-bytes-random-key-operations-copilot"
    JWT_ACCESS_TTL: int = 900
    JWT_REFRESH_TTL: int = 2592000

    class Config:
        env_file = ".env"
        extra = "ignore"

@lru_cache()
def get_settings() -> Settings:
    return Settings()
