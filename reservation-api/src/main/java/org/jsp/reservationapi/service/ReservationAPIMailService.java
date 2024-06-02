package org.jsp.reservationapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ReservationAPIMailService {

	@Autowired
	private JavaMailSender javaMailSender;
	
	public String sendMail(String email,String url) {
		SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
		simpleMailMessage.setTo(email);
		simpleMailMessage.setText("Dear user, Please activate your account with following link: "+url);
		simpleMailMessage.setSubject("Activate Your Account");
		javaMailSender.send(simpleMailMessage);
		return "Registration successfull and verification mail has been send to "+email;
	}
}