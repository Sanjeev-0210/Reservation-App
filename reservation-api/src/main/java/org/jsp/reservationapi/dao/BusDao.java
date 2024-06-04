package org.jsp.reservationapi.dao;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.jsp.reservationapi.model.Bus;
import org.jsp.reservationapi.repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BusDao {
	
	@Autowired
	private BusRepository busRepository;

	public Bus saveBus(Bus bus) {
		return busRepository.save(bus);
	}

	public Optional<Bus> findById(int id) {
		return busRepository.findById(id);
	}

	public List<Bus> findByDeparture_Date(LocalDate date) {
		return busRepository.findByDeparture_date(date);
	}

	public List<Bus> findByFrom_LoctoTo_Loc(String from_loc, String to_loc) {
		return busRepository.findByFrom_LoctoTo_Loc(from_loc,to_loc);
		
	}

	public List<Bus> findAllBus() {
		return busRepository.findAll();
	}

	public List<Bus> findBuses(String from_loc, String to_loc, LocalDate date) {
		return busRepository.findBuses(from_loc, to_loc, date);
	}

}
