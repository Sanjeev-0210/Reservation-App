package org.jsp.reservationapi.dto;

import java.util.List;

import org.jsp.reservationapi.model.Bus;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AdminRequest {
	
	@NotBlank(message = "Name is Mandatory")
	private String name;
	private long phone;
	@Email(message = "Invalid Format")
	private String email;
	@NotBlank(message = "GST number is mandatory")
	@Size(min = 15, max = 15, message= "GST number must have 15 character")
	private String gst_number;
	@NotBlank(message = "Travels Name is Mandatory")
	private String travels_name;
	@NotBlank(message = "Password is Mandatory")
	@Size(min = 8, max = 15, message = "Password length must between 8 to 15 Character")
	private String password;
	
	private List<Bus> buses;

}
