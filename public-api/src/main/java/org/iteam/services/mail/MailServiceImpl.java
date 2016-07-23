package org.iteam.services.mail;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Properties;

import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.google.api.client.repackaged.org.apache.commons.codec.binary.Base64;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;

//@Service
public class MailServiceImpl implements MailService {

    @Override
    public void sendEmail() {
        try {

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Create a MimeMessage using the parameters provided.
     *
     * @param to
     *            Email address of the receiver.
     * @param from
     *            Email address of the sender, the mailbox account.
     * @param subject
     *            Subject of the email.
     * @param bodyText
     *            Body text of the email.
     * @return MimeMessage to be used to send email.
     * @throws MessagingException
     */
    private MimeMessage createEmail(String to, String from, String subject, String bodyText) throws MessagingException {
        Properties props = new Properties();
        Session session = Session.getDefaultInstance(props, null);

        MimeMessage email = new MimeMessage(session);
        InternetAddress tAddress = new InternetAddress(to);
        InternetAddress fAddress = new InternetAddress(from);

        email.setFrom(new InternetAddress(from));
        email.addRecipient(javax.mail.Message.RecipientType.TO, new InternetAddress(to));
        email.setSubject(subject);
        email.setText(bodyText);

        return email;
    }

    /**
     * Create a Message from an email
     *
     * @param email
     *            Email to be set to raw of message
     * @return Message containing base64url encoded email.
     * @throws IOException
     * @throws MessagingException
     */
    private Message createMessageWithEmail(MimeMessage email) throws MessagingException, IOException {
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        email.writeTo(bytes);
        String encodedEmail = Base64.encodeBase64URLSafeString(bytes.toByteArray());
        Message message = new Message();
        message.setRaw(encodedEmail);
        return message;
    }

    /**
     * Send an email from the user's mailbox to its recipient.
     *
     * @param service
     *            Authorized Gmail API instance.
     * @param userId
     *            User's email address. The special value "me" can be used to
     *            indicate the authenticated user.
     * @param email
     *            Email to be sent.
     * @throws MessagingException
     * @throws IOException
     */
    private void sendMessage(Gmail service, String userId, MimeMessage email) throws MessagingException, IOException {
        Message message = createMessageWithEmail(email);
        message = service.users().messages().send(userId, message).execute();

        System.out.println("Message id: " + message.getId());
        System.out.println(message.toPrettyString());
    }
}

// try {
//
// sender.setHost("smtp.gmail.com");
//
// MimeMessage message = sender.createMimeMessage();
// MimeMessageHelper helper = new MimeMessageHelper(message);
// try {
// helper.setTo("pressaccojuan@gmail.com");
// helper.setFrom(new InternetAddress("iteam.proyecto@gmail.com"));
// helper.setText("Thank you for ordering!");
// } catch (MessagingException e) {
// // TODO: handles this exception
// }
//
// sender.send(message);
// } catch (MailException e) {
// // TODO: handles this exception
// }
// }
