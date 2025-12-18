import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export interface OrderEmailDetails {
    orderId: number;
    customerName: string;
    customerEmail: string;
    totalAmount: number;
    items: { product_name: string; quantity: number; price: number }[];
    trackingToken: string;
}

export async function sendOrderConfirmationEmail(details: OrderEmailDetails) {
    if (!process.env.SMTP_USER) {
        console.warn("⚠️ SMTP Credentials not found. Skipping email sending.");
        return;
    }

    const { orderId, customerName, customerEmail, totalAmount, items, trackingToken } = details;

    const itemsList = items
        .map(item => `<li>${item.product_name} x ${item.quantity} - ₦${item.price.toLocaleString()}</li>`)
        .join('');

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Order Confirmation</h1>
      <p>Hi ${customerName},</p>
      <p>Thank you for your order! We've received it and are processing it now.</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h2>Order #${orderId}</h2>
        <p><strong>Total:</strong> ₦${totalAmount.toLocaleString()}</p>
        <p><strong>Tracking Token:</strong> <code>${trackingToken}</code></p>
      </div>

      <h3>Items:</h3>
      <ul>
        ${itemsList}
      </ul>

      <p>You can track your order status on our website using the token above.</p>
      
      <br />
      <p>Seehms Shoes Team</p>
    </div>
  `;

    try {
        const info = await transporter.sendMail({
            from: `"Seehms Shoes" <${process.env.SMTP_USER}>`,
            to: customerEmail,
            subject: `Order Confirmation #${orderId} - Seehms Shoes`,
            html: html,
        });
        console.log("✅ Email sent: %s", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("❌ Error sending email:", error);
        return { success: false, error };
    }
}

export async function sendPaymentApprovedEmail(details: { orderId: number; customerName: string; customerEmail: string }) {
    if (!process.env.SMTP_USER) return;

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #4BB543;">Payment Approved!</h1>
      <p>Hi ${details.customerName},</p>
      <p>Great news! Your payment for <strong>Order #${details.orderId}</strong> has been verified.</p>
      <p>We are now processing your order and will let you know when it ships.</p>
      <br />
      <p>Seehms Shoes Team</p>
    </div>
  `;

    try {
        await transporter.sendMail({
            from: `"Seehms Shoes" <${process.env.SMTP_USER}>`,
            to: details.customerEmail,
            subject: `Payment Approved - Order #${details.orderId}`,
            html,
        });
    } catch (error) {
        console.error("❌ Error sending approved email:", error);
    }
}

export async function sendOrderDeliveredEmail(details: { orderId: number; customerName: string; customerEmail: string }) {
    if (!process.env.SMTP_USER) return;

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Order Delivered</h1>
      <p>Hi ${details.customerName},</p>
      <p>Your order <strong>#${details.orderId}</strong> has been delivered! We hope you love your new shoes.</p>
      
      <div style="background-color: #f0f7ff; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
        <h3>How did we do?</h3>
        <p>We'd love to hear your feedback. Please take a moment to leave a review.</p>
        <a href="https://seemsshoes.com/shop" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Leave a Review</a>
      </div>

      <p>Available on WhatsApp? <a href="https://wa.me/2349012345678">Chat with us</a></p>
      
      <br />
      <p>Seehms Shoes Team</p>
    </div>
  `;

    try {
        await transporter.sendMail({
            from: `"Seehms Shoes" <${process.env.SMTP_USER}>`,
            to: details.customerEmail,
            subject: `Order Delivered - Tell us what you think!`,
            html,
        });
    } catch (error) {
        console.error("❌ Error sending delivered email:", error);
    }
}
