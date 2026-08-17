from typing import Protocol, Dict, Any, List, Optional
from pydantic import BaseModel

class LLMResponse(BaseModel):
    content: str
    tool_calls: List[Dict[str, Any]] = []
    prompt_tokens: int = 0
    completion_tokens: int = 0
    cost_usd: float = 0.0

class LLMProvider(Protocol):
    """Protocol for LLM Provider abstraction (§9.1)"""
    async def generate(
        self,
        messages: List[Dict[str, Any]],
        tools: Optional[List[Dict[str, Any]]] = None,
        temperature: float = 0.7
    ) -> LLMResponse:
        ...
