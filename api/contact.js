const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed"
    });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Email to you
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "YOUR_EMAIL@gmail.com",
      subject: subject || "New Portfolio Contact",
      replyTo: email,
      html: `
        <h2>New Portfolio Message</h2>

        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>

        <p><b>Message:</b></p>
        <p>${message}</p>
      `
    });


    // Auto reply to visitor
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: email,
      subject: "Thank you for contacting me",
      html: `
        <h2>Thank You for Contacting Me!</h2>

        <p>Hi <b>${name}</b>,</p>

        <p>
        Thank you for contacting me through my portfolio website.
        I have successfully received your message.
        </p>

        <p>
        I will review your message and get back to you within 24-48 hours.
        </p>

        <br>

        <p>
        Best regards,<br>
        <b>Rahul Gupta</b><br>
        Python Full Stack Developer
        </p>
      `
    });


    return res.status(200).json({
      success: true,
      message: "Message sent successfully"
    });


  } catch (error) {

    console.error("RESEND ERROR:", error);

    return res.status(500).json({
      success:false,
      message:error.message
    });

  }
};