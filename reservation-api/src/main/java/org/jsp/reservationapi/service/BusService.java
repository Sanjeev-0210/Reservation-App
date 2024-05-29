package org.jsp.reservationapi.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.jsp.reservationapi.dao.AdminDao;
import org.jsp.reservationapi.dao.BusDao;
import org.jsp.reservationapi.dto.BusRequest;
import org.jsp.reservationapi.dto.BusResponse;
import org.jsp.reservationapi.dto.ResponseStructure;
import org.jsp.reservationapi.exception.BusNotFoundException;
import org.jsp.reservationapi.model.Admin;
import org.jsp.reservationapi.model.Bus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class BusService {

	@Autowired
	private BusDao busDao;
	@Autowired
	private AdminDao adminDao;

	private Bus mapToBus(BusRequest busRequest) {
		return Bus.builder().name(busRequest.getName()).departure_date(busRequest.getDeparture_date())
				.bus_no(busRequest.getBus_no()).from_loc(busRequest.getFrom_loc()).to_loc(busRequest.getTo_loc())
				.no_of_seats(busRequest.getNo_of_seats()).admin(busRequest.getAdmin()).build();
	}
	
	private BusResponse mapToBusResponse(Bus bus) {
		return BusResponse.builder().name(bus.getName()).departure_date(bus.getDeparture_date())
				.bus_no(bus.getBus_no()).from_loc(bus.getFrom_loc()).to_loc(bus.getTo_loc())
				.no_of_seats(bus.getNo_of_seats()).admin(bus.getAdmin()).build();
	}

	public ResponseEntity<ResponseStructure<BusResponse>> saveBus(BusRequest busRequest, int admin_id) {
		Optional<Admin> recAdmin = adminDao.findById(admin_id);
		if (recAdmin.isPresent()) {
			Admin admin = recAdmin.get();
			busRequest.setAdmin(admin); // assigning admin to bus
			admin.getBuses().add(mapToBus(busRequest));// Assigning bus to admin
		ResponseStructure<BusResponse> structure = new ResponseStructure<>();
		structure.setMessage("Bus Saved");
		Bus dbBus = busDao.saveBus(mapToBus(busRequest));
		structure.setData(mapToBusResponse(dbBus));//Adding product;
		adminDao.saveAdmin(admin); //Updating admin
		structure.setStatusCode(HttpStatus.CREATED.value());
		return ResponseEntity.status(HttpStatus.CREATED).body(structure);
		}
		throw new BusNotFoundException("Can't Saved, Admin Id is not found!!!");
	}
	
//	public ResponseEntity<ResponseStructure<Bus>> saveBus(BusRequest busRequest, int admin_id) {
//		Optional<Admin> recAdmin = adminDao.findById(admin_id);
//		if (recAdmin.isPresent()) {
//			Admin admin = recAdmin.get();
//			Bus bus = mapToBus(busRequest); //Converting busrequest to bus
//			bus.setAdmin(admin); // assigning admin to bus
//			admin.getBuses().add(bus);// Assigning bus to admin
//		ResponseStructure<Bus> structure = new ResponseStructure<>();
//		structure.setMessage("Bus Saved");
//		Bus dbBus = busDao.saveBus(mapToBus(busRequest));//Adding product
//		adminDao.saveAdmin(admin); //Updating admin
//		structure.setData(dbBus);
//		structure.setStatusCode(HttpStatus.CREATED.value());
//		return ResponseEntity.status(HttpStatus.CREATED).body(structure);
//		}
//		throw new BusNotFoundException("Can't Saved, Admin Id is not found!!!");
//	}

	public ResponseEntity<ResponseStructure<BusResponse>> updateBus(BusRequest busRequest, int id) {
		ResponseStructure<BusResponse> structure = new ResponseStructure<>();
		Optional<Bus> recBus = busDao.findById(id);
		if (recBus.isPresent()) {
			Bus dbBus = recBus.get();
			dbBus.setBus_no(busRequest.getBus_no());
			dbBus.setDeparture_date(busRequest.getDeparture_date());
			dbBus.setFrom_loc(busRequest.getFrom_loc());
			dbBus.setName(busRequest.getName());
			dbBus.setNo_of_seats(busRequest.getNo_of_seats());
			dbBus.setTo_loc(busRequest.getTo_loc());
			structure.setMessage("Bus has been Updated!!!");
			structure.setData(mapToBusResponse(busDao.saveBus(dbBus)));
			structure.setStatusCode(HttpStatus.ACCEPTED.value());
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(structure);
		}
		throw new BusNotFoundException("Cannot Update Bus as Id is Invalid");
	}

	public ResponseEntity<ResponseStructure<BusResponse>> findById(int id) {
		ResponseStructure<BusResponse> structure = new ResponseStructure<>();
		Optional<Bus> dbBus = busDao.findById(id);
		if (dbBus.isPresent()) {
			structure.setMessage("Bus Found");
			structure.setData(mapToBusResponse(dbBus.get()));
			structure.setStatusCode(HttpStatus.OK.value());
			return ResponseEntity.status(HttpStatus.OK).body(structure);
		}
		throw new BusNotFoundException("Cannot Update Bus as Id is Invalid");
	}

	public ResponseEntity<ResponseStructure<List<Bus>>> findByDeparture_Date(LocalDate date) {
		ResponseStructure<List<Bus>> structure = new ResponseStructure<>();
		List<Bus> dbBus = busDao.findByDeparture_Date(date);
		if (dbBus.isEmpty()) {
			throw new BusNotFoundException("No Bus Found in this departure date");
		}
		structure.setMessage("List of Bus Found in the departure date "+date);
		structure.setData(dbBus);
		structure.setStatusCode(HttpStatus.OK.value());
		return ResponseEntity.status(HttpStatus.OK).body(structure);
	}

	public ResponseEntity<ResponseStructure<List<Bus>>> findByFrom_LoctoTo_Loc(String from_loc, String to_loc) {
		ResponseStructure<List<Bus>> structure = new ResponseStructure<>();
		List<Bus> recBus = busDao.findByFrom_LoctoTo_Loc(from_loc,to_loc);
		if(recBus.isEmpty())
				throw new BusNotFoundException("No Bus found!!!");
		structure.setData(recBus);
		structure.setMessage("List of Buses Found in "+from_loc+" to "+to_loc);
		structure.setStatusCode(HttpStatus.OK.value());
		return ResponseEntity.status(HttpStatus.OK).body(structure);
	}
	
}