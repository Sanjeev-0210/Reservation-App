package org.jsp.reservationapi.dto;

import java.util.List;

import org.jsp.reservationapi.model.Bus;

import lombok.Data;

@Data
public class AdminRequest {
	private String name;
	private long phone;
	private String email;
	private String gst_number;
	private String travels_name;
	private String password;
	
	private List<Bus> buses;

}
