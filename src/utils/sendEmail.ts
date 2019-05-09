import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
    apiKey : process.env.MAILGUN_API_KEY || "",
    domain : "sandboxb550cf21aa324c9e9af2b99ab955ab10.mailgun.org"
});
//실제 유료 계정일때 서브젝트 앞에 to : string으로 설정하면 다른사람한테 보낼수잇음
const sendEmail = (subject : string, html : string) => {
    const emailData = {
        from : "kang5858111@naver.com",
        to : "kang5858111@naver.com",
        subject,
        html
    };
    return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key : string)=> {
    const emailSubject = `Hello! ${fullName}, please verify your email`;
    const emailBody = `Verify your email by clicking <a href = "http://nuver.com/verification/${key}/">here</a>`;
    return sendEmail(emailSubject, emailBody);
};