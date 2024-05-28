package org.jsp.reservationapi.controller;

import java.time.LocalDate;
import java.util.List;

import org.jsp.reservationapi.dto.BusRequest;
import org.jsp.reservationapi.dto.ResponseStructure;
import org.jsp.reservationapi.model.Bus;
import org.jsp.reservationapi.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bus")
public class BusController {
	@Autowired
	private BusService busService;
	
	@PostMapping("/{admin_id}")
	public ResponseEntity<ResponseStructure<Bus>>  saveBus(@RequestBody BusRequest busRequest,@PathVariable int admin_id){
		return busService.saveBus(busRequest,admin_id);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ResponseStructure<Bus>> update(@RequestBody BusRequest busRequest, @PathVariable int id){
		return busService.updateBus(busRequest,id);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ResponseStructure<Bus>> findById(@PathVariable int id){
		return busService.findById(id);
	}
	
	@GetMapping("/findByDeparture_Date")
	public ResponseEntity<ResponseStructure<List<Bus>>> findByDeparture_Date(@RequestParam(name="date") LocalDate date){
		return busService.findByDeparture_Date(date);
	}

	@GetMapping("/findByFrom_LoctoTo_Loc")
	public ResponseEntity<ResponseStructure<List<Bus>>> findByFrom_LoctoTo_Loc(@RequestParam(name="from_loc") String from_loc, @RequestParam(name="to_loc") String to_loc){
		return busService.findByFrom_LoctoTo_Loc(from_loc,to_loc)
;	}
}
