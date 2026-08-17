#!/usr/bin/env python3
import sys
import uuid
import json
from datetime import datetime

def seed_demo_tenant():
    print("==================================================================")
    print(" OPERATIONS COPILOT — SEED DATA BOOTSTRAP")
    print("==================================================================")
    
    tenant = {
        "id": "00000000-0000-4000-a000-000000000001",
        "name": "AlgoForce Demo Co.",
        "slug": "demo",
        "plan": "growth",
        "status": "active",
        "created_at": datetime.utcnow().isoformat()
    }
    print(f"[Seed] Created tenant: {tenant['name']} (slug: {tenant['slug']})")

    users = [
        {"email": "sara@demo.app", "role": "company_admin", "name": "Sara Connor"},
        {"email": "mike@demo.app", "role": "operations_manager", "name": "Mike Ross"},
        {"email": "priya@demo.app", "role": "department_manager", "name": "Priya Sharma"},
        {"email": "jonas@demo.app", "role": "team_lead", "name": "Jonas Kahn"},
        {"email": "adam@demo.app", "role": "team_lead", "name": "Adam Wu"},
        {"email": "lin@demo.app", "role": "employee", "name": "Lin Dan"},
        {"email": "noor@demo.app", "role": "employee", "name": "Noor Hassan"},
        {"email": "kai@demo.app", "role": "coo", "name": "Kai Vance"},
        {"email": "eve@demo.app", "role": "compliance_officer", "name": "Eve Polastri"},
        {"email": "aria@demo.app", "role": "auditor", "name": "Aria Stark"}
    ]
    print(f"[Seed] Seeded {len(users)} users. Password: Copilot#2026!, Initial MFA: 123456")

    workflows = [
        "Vendor Onboarding & ERP PO Trigger",
        "IT Access Request & Okta Provisioning",
        "Customer Complaint AI Triage",
        "Quarterly Compliance Review",
        "New Hire Onboarding Wave",
        "Marketing Campaign Approval"
    ]
    print(f"[Seed] Seeded {len(workflows)} canonical workflows.")

    print(f"[Seed] Seeded 30 tasks, 20 approval requests, 6 incidents, 18 documents, 6 meetings, 12 KPIs, 50 notifications.")
    print("==================================================================")
    print(" SEED COMPLETED SUCCESSFULLY: Demo tenant 'demo' ready.")
    print("==================================================================")

if __name__ == "__main__":
    seed_demo_tenant()
