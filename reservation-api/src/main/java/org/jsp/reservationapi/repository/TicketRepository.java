package org.jsp.reservationapi.repository;

import java.util.List;

import org.jsp.reservationapi.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TicketRepository extends JpaRepository<Ticket, Integer>{

	@Query("select t from Ticket t where t.user.id=?1")
	List<Ticket> findByUserId(int user_id);

}
