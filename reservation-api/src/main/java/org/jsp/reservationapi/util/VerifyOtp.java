package org.jsp.reservationapi.util;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class VerifyOtp {
	
	private int generated_otp;
	
	public String verifyotp(int otp) {
		String value;
		if(otp==generated_otp) {
			value = "verified";
			return value;
		}
		return null;
		
	}

}
