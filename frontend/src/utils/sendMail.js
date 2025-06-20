import emailjs from "@emailjs/browser";

const sendMail = async (templateParams) => {
  const serviceID = "service_tydmfrj"; 
  const templateID = "template_8fbktdj"; 
  const publicKey = "s7Uc2PdZe7BYYk3Dm"; 

  try {
    return await emailjs.send(serviceID, templateID, templateParams, publicKey);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Email sending failed. Please try again later.");
  }
};


export default sendMail;