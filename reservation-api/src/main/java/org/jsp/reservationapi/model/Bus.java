package org.jsp.reservationapi.model;


import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
	@Column(nullable = false)
	private int available_seats;
	@Column(nullable = false)
	private double cost_per_seat;
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name="admin_id")
	private Admin admin;
	@OneToMany(mappedBy = "bus")
	private List<Ticket> bookedTickets;

}
