package org.jsp.reservationapi.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRequest {

	@NotBlank(message = "Name is Mandatory")
	private String name;
	private long phone;
	@Email(message = "Invalid Format")
	private String email;
	private int age;
	@NotBlank(message = "Gender is Mandatory")
	private String gender;
	@NotBlank(message = "Password is Mandatory")
	@Size(min = 8, max = 15, message = "Password length must between 8 to 15 Character")
	private String password;
}
