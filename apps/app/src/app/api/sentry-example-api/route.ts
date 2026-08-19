import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export const dynamic = "force-dynamic";

export function GET() {
  try {
    throw new Error("Sentry Test Error from Optra-AI Next.js API");
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({
      status: "error_captured",
      message: "Sentry test exception triggered and captured successfully!",
    });
  }
}
