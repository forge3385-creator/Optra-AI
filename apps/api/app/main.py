import uuid
from typing import Dict, Any, List, Optional
from datetime import datetime
from fastapi import FastAPI, HTTPException, Depends, Header, Query, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Operations Copilot REST API",
    description="Enterprise AI Operations Intelligence & Business Process Operating System API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Common JSON:API Response Envelope Helper (§8.1)
def make_envelope(data: Any, took_ms: int = 24, links: Optional[Dict[str, str]] = None) -> Dict[str, Any]:
    return {
        "data": data,
        "meta": {
            "request_id": str(uuid.uuid4()),
            "trace_id": str(uuid.uuid4()),
            "took_ms": took_ms
        },
        "links": links or {"self": "/v1/api"}
    }

# Health Check
@app.get("/healthz")
async def healthz():
    return {"status": "ok", "service": "operations-copilot-api", "timestamp": datetime.utcnow().isoformat()}

@app.get("/readyz")
async def readyz():
    return {"status": "ready", "database": "connected", "redis": "connected"}

# ──────────────────────────────────────────────────────────────────
# 8.2 Auth Endpoints
# ──────────────────────────────────────────────────────────────────
class LoginRequest(BaseModel):
    email: str
    password: str
    tenant_slug: Optional[str] = None

class RegisterRequest(BaseModel):
    full_name: str
    email: str
    password: str
    company_name: str
    subdomain: str
    plan: str = "starter"

@app.post("/v1/auth/login")
async def login(req: LoginRequest):
    return make_envelope({
        "access_token": f"jwt_mock_access_token_{uuid.uuid4()}",
        "refresh_token": f"jwt_mock_refresh_token_{uuid.uuid4()}",
        "requires_mfa": True,
        "user": {
            "id": "u-101",
            "email": req.email,
            "full_name": "Sara Connor",
            "role": "company_admin"
        }
    })

@app.post("/v1/auth/register")
async def register(req: RegisterRequest):
    return make_envelope({
        "user_id": str(uuid.uuid4()),
        "tenant_id": str(uuid.uuid4()),
        "verification_required": False
    })

@app.get("/v1/auth/me")
async def get_me():
    return make_envelope({
        "id": "u-101",
        "tenant_id": "t-demo",
        "email": "sara@demo.app",
        "full_name": "Sara Connor",
        "role": "company_admin",
        "permissions": ["workflows:write", "approvals:decide", "admin:all"]
    })

# ──────────────────────────────────────────────────────────────────
# 8.3 Workflows Endpoints
# ──────────────────────────────────────────────────────────────────
@app.get("/v1/workflows")
async def list_workflows(q: Optional[str] = None, status: Optional[str] = None):
    return make_envelope([
        {
            "id": "wf-1",
            "name": "Vendor Onboarding & Compliance Validation",
            "version": 3,
            "status": "published",
            "nodes_count": 9,
            "sla_minutes": 1440
        },
        {
            "id": "wf-2",
            "name": "IT Access & Privilege Grant Request",
            "version": 2,
            "status": "published",
            "nodes_count": 7,
            "sla_minutes": 480
        }
    ])

@app.post("/v1/workflows")
async def create_workflow(payload: Dict[str, Any]):
    return make_envelope({"id": str(uuid.uuid4()), "status": "draft", **payload})

@app.post("/v1/workflows/{workflow_id}/simulate")
async def simulate_workflow(workflow_id: str, payload: Optional[Dict[str, Any]] = None):
    return make_envelope({
        "simulation_id": str(uuid.uuid4()),
        "workflow_id": workflow_id,
        "status": "succeeded",
        "steps_executed": 7,
        "duration_ms": 140,
        "logs": ["Start node initialized", "AI prompt validated inputs", "Approval rule passed", "ERP PO created", "Finished"]
    })

# ──────────────────────────────────────────────────────────────────
# 8.4 Tasks Endpoints
# ──────────────────────────────────────────────────────────────────
@app.get("/v1/tasks")
async def list_tasks():
    return make_envelope([
        {
            "id": "tsk-1",
            "title": "Review Tax ID & Compliance Attachments",
            "priority": "high",
            "status": "in_progress",
            "assignee": "Eve Polastri"
        },
        {
            "id": "tsk-2",
            "title": "Provision AWS Cloud IAM Credentials",
            "priority": "critical",
            "status": "todo",
            "assignee": "Jonas Kahn"
        }
    ])

# ──────────────────────────────────────────────────────────────────
# 8.5 Approvals Endpoints
# ──────────────────────────────────────────────────────────────────
@app.get("/v1/approvals/inbox")
async def get_approval_inbox():
    return make_envelope([
        {
            "id": "req-1042",
            "subject": "SAP Purchase Order #PO-9401",
            "amount": 12500.00,
            "currency": "USD",
            "requester": "Jonas Kahn",
            "status": "pending"
        }
    ])

@app.post("/v1/approvals/requests/{request_id}/decide")
async def decide_approval(request_id: str, payload: Dict[str, Any]):
    return make_envelope({
        "request_id": request_id,
        "decision": payload.get("decision", "approved"),
        "decided_at": datetime.utcnow().isoformat(),
        "status": "completed"
    })

# ──────────────────────────────────────────────────────────────────
# 8.6 Incidents Endpoints
# ──────────────────────────────────────────────────────────────────
@app.get("/v1/incidents")
async def list_incidents():
    return make_envelope([
        {
            "id": "inc-101",
            "title": "PostgreSQL Secondary Replica Lag Spiking > 45s",
            "severity": "sev1",
            "status": "open",
            "assignee": "Sara Connor"
        }
    ])

# ──────────────────────────────────────────────────────────────────
# 8.9 KPIs Endpoints
# ──────────────────────────────────────────────────────────────────
@app.get("/v1/kpis/overview")
async def get_kpi_overview():
    return make_envelope({
        "sla_compliance_rate": 96.4,
        "process_duration_days": 4.2,
        "workflow_success_rate": 99.1,
        "operational_cost_per_process": 1.32
    })

# ──────────────────────────────────────────────────────────────────
# 8.10 Risks Endpoints
# ──────────────────────────────────────────────────────────────────
@app.get("/v1/risks")
async def list_risks():
    return make_envelope([
        {
            "id": "risk-1",
            "source": "workflow",
            "score": 0.78,
            "severity": "high",
            "rationale": "Workflow 'Vendor Onboarding' avg breach rate 24% over last 30 runs."
        }
      ])

@app.post("/v1/risks/scan")
async def trigger_risk_scan():
    return make_envelope({
        "scan_id": str(uuid.uuid4()),
        "signals_detected": 3,
        "scanned_at": datetime.utcnow().isoformat()
    })

# ──────────────────────────────────────────────────────────────────
# 8.13 AI Assistant Endpoints
# ──────────────────────────────────────────────────────────────────
@app.post("/v1/ai/conversations")
async def create_ai_conversation(payload: Dict[str, Any]):
    return make_envelope({
        "conversation_id": str(uuid.uuid4()),
        "title": payload.get("title", "New Conversation")
    })

@app.post("/v1/ai/conversations/{conversation_id}/messages")
async def send_ai_message(conversation_id: str, payload: Dict[str, Any]):
    user_content = payload.get("content", "")
    return make_envelope({
        "message_id": str(uuid.uuid4()),
        "conversation_id": conversation_id,
        "reply": f"Operations Copilot AI processed: {user_content}",
        "tool_calls": [
            {
                "tool": "list_approvals",
                "status": "completed",
                "result": [{"id": "req-1042", "subject": "SAP Purchase Order #PO-9401"}]
            }
        ]
    })
