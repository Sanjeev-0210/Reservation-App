package org.jsp.reservationapi.dto;

import java.time.LocalDate;

import org.jsp.reservationapi.model.Admin;

import lombok.Data;

@Data
public class BusRequest {
	
	private int id;
	private String name;
	private LocalDate departure_date;
	private String bus_no;
	private String from_loc,to_loc;
	private int no_of_seats;
	private Admin admin;
	private double cost_per_seat;

}
