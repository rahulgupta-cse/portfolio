import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { name, email, subject, message } = req.body;

    // ==========================
    // EMAIL 1: Send to yourself
    // ==========================
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "mairahulgupta03@gmail.com", // Replace with your email
      subject: subject || "New Portfolio Contact",
      html: `
        <h2>New Portfolio Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
    });

    // ==========================
    // EMAIL 2: Auto-reply to visitor
    // ==========================
    await resend.emails.send({
      from: "Rahul Gupta <onboarding@resend.dev>",
      to: email,
      subject: "Thank you for contacting Rahul Gupta",
      html: `
        <h2>Thank You for Contacting Me!</h2>
        <p>Hi <strong>${name}</strong>,</p>

        <p>Thank you for contacting me through my portfolio website.</p>

        <p>I have successfully received your message and will get back to you within <strong>24–48 hours</strong>.</p>

        <p>Best regards,<br>
        <strong>Rahul Gupta</strong><br>
        Python Full Stack Developer</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message.",
    });
  }
}