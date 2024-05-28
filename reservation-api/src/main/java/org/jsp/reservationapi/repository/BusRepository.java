package org.jsp.reservationapi.repository;

import java.time.LocalDate;
import java.util.List;

import org.jsp.reservationapi.model.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BusRepository extends JpaRepository<Bus, Integer>{

	@Query("select b from Bus b where b.departure_date=?1")
	List<Bus> findByDeparture_date(LocalDate date);

	@Query("select b from Bus b where b.from_loc=?1 and b.to_loc=?2")
	List<Bus> findByFrom_LoctoTo_Loc(String from_loc, String to_loc);


}
