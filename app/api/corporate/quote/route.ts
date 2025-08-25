import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // In a real app, this would save to database and send emails
    const quoteRequest = {
      id: `QUOTE-${Date.now()}`,
      ...data,
      status: "pending",
      createdAt: new Date().toISOString(),
      estimatedResponse: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    }

    // Simulate email notification to corporate team
    console.log("Sending quote request notification:", quoteRequest)

    // Simulate customer confirmation email
    console.log("Sending confirmation email to:", data.email)

    return NextResponse.json({
      success: true,
      quoteId: quoteRequest.id,
      message: "Quote request submitted successfully",
      estimatedResponse: "24 hours",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to submit quote request" }, { status: 500 })
  }
}
