package org.jsp.reservationapi.model;


import java.time.LocalDate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Bus {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(nullable = false)
	private String name;
	@Column(nullable = false)
	private LocalDate departure_date;
	@Column(nullable = false)
	private String bus_no;
	@Column(nullable = false)
	private String from_loc,to_loc;
	@Column(nullable = false)
	private int no_of_seats;
	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name="admin_id")
	private Admin admin;

}
