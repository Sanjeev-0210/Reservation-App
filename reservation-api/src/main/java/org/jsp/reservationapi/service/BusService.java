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
		return Bus.builder().id(busRequest.getId()).name(busRequest.getName()).departure_date(busRequest.getDeparture_date())
				.bus_no(busRequest.getBus_no()).from_loc(busRequest.getFrom_loc()).to_loc(busRequest.getTo_loc())
				.no_of_seats(busRequest.getNo_of_seats()).available_seats(busRequest.getAvailable_seats()).cost_per_seat(busRequest.getCost_per_seat()).admin(busRequest.getAdmin()).build();
	}
	
	private BusResponse mapToBusResponse(Bus bus) {
		return BusResponse.builder().id(bus.getId()).name(bus.getName()).departure_date(bus.getDeparture_date())
				.bus_no(bus.getBus_no()).from_loc(bus.getFrom_loc()).to_loc(bus.getTo_loc())
				.no_of_seats(bus.getNo_of_seats()).available_seats(bus.getAvailable_seats()).cost_per_seats(bus.getCost_per_seat()).build();
	}

	public ResponseEntity<ResponseStructure<BusResponse>> saveBus(BusRequest busRequest, int admin_id) {
		Optional<Admin> recAdmin = adminDao.findById(admin_id);
		if (recAdmin.isPresent()) {
			Admin admin = recAdmin.get();
			Bus bus = mapToBus(busRequest);//map busrequest to bus
			bus.setAdmin(admin); // assigning admin to bus
			bus.setAvailable_seats(bus.getAvailable_seats());
			admin.getBuses().add(bus);// Assigning bus to admin
		ResponseStructure<BusResponse> structure = new ResponseStructure<>();
		structure.setMessage("Bus Saved");
		Bus dbBus = busDao.saveBus(bus);
		adminDao.saveAdmin(admin); //Updating admin
		structure.setData(mapToBusResponse(dbBus));//Adding product;
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
			dbBus.setCost_per_seat(busRequest.getCost_per_seat());
			dbBus.setAvailable_seats(busRequest.getNo_of_seats());
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

	public ResponseEntity<ResponseStructure<List<Bus>>> findAllBus() {
		ResponseStructure<List<Bus>> structure = new ResponseStructure<>();
		List<Bus> recBus = busDao.findAllBus();
		if(recBus.isEmpty())
			throw new BusNotFoundException("No Bus were Found!!!");
		structure.setData(recBus);
		structure.setMessage("List of buses Found!!!");
		structure.setStatusCode(HttpStatus.OK.value());
		return ResponseEntity.status(HttpStatus.OK).body(structure);
	}

	public ResponseEntity<ResponseStructure<List<Bus>>> findBuses(String from_loc, String to_loc, LocalDate date) {
		ResponseStructure<List<Bus>> structure = new ResponseStructure<>();
		List<Bus> recBus = busDao.findBuses(from_loc,to_loc,date);
		if(recBus.isEmpty())
			throw new BusNotFoundException("No Bus were Found!!!");
		structure.setData(recBus);
		structure.setMessage("List of Buses Found!!!");
		structure.setStatusCode(HttpStatus.OK.value());
		return ResponseEntity.status(HttpStatus.OK).body(structure);
	}

	public ResponseEntity<ResponseStructure<String>> delete(int id) {
		ResponseStructure<String> structure = new ResponseStructure<>();
		Optional<Bus> recBus = busDao.findById(id);
		if(recBus.isPresent()) {
			busDao.delete(id);
			structure.setData("Bus Found");
			structure.setMessage("Bus deleted");
			structure.setStatusCode(HttpStatus.OK.value());
			return ResponseEntity.status(HttpStatus.OK).body(structure);
		}
		throw new BusNotFoundException("Bus Not Found, Invalid Bus ID!!!");
	}

	public ResponseEntity<ResponseStructure<List<Bus>>> findByAdminId(int admin_id) {
		ResponseStructure<List<Bus>> structure = new ResponseStructure<>();
		List<Bus> buses = busDao.findBusesByAdminId(admin_id);
		if (buses.isEmpty())
			throw new BusNotFoundException("No Buses for entered Admin Id");
		structure.setData(buses);
		structure.setMessage("List of Buses for entered Amdin id");
		structure.setStatusCode(HttpStatus.OK.value());
		return ResponseEntity.status(HttpStatus.OK).body(structure);
	}

	
}
