package org.jsp.reservationapi.controller;

import java.io.IOException;

import org.jsp.reservationapi.dto.ResponseStructure;
import org.jsp.reservationapi.dto.UserRequest;
import org.jsp.reservationapi.dto.UserResponse;
import org.jsp.reservationapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	private UserService userService;
	
	@PostMapping
	public ResponseEntity<ResponseStructure<UserResponse>>  saveUser(@Valid @RequestBody UserRequest userRequest, HttpServletRequest request) {
		return userService.save(userRequest,request);
		
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ResponseStructure<UserResponse>> updateUser(@RequestBody UserRequest userRequest, @PathVariable int id){
		return userService.update(userRequest,id);
		
	}
	
	@GetMapping("{id}")
	public ResponseEntity<ResponseStructure<UserResponse>> findById(@PathVariable int id) {
		return userService.findById(id);
	}

	@PostMapping("/verify-by-phone")
	public ResponseEntity<ResponseStructure<UserResponse>> verify(@RequestParam long phone, @RequestParam String password) {
		return userService.verify(phone, password);
	}

	@PostMapping("/verify-by-email")
	public ResponseEntity<ResponseStructure<UserResponse>> verify(@RequestParam String email, @RequestParam String password) {
		return userService.verify(email, password);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ResponseStructure<String>> delete(@PathVariable int id) {
		return userService.delete(id);
	}
	
	@GetMapping("/activate")
	public String activate(@RequestParam String token) {
		return userService.activate(token);
	}
	
	@PostMapping("/forgot-password")
	public String forgotPassword(@RequestParam String email,HttpServletRequest request) {
		return userService.forgotPassword(email, request);
	}
	
	@GetMapping("/verify-link")
	public void verifyLink(@RequestParam String token, HttpServletResponse response) {
		UserResponse userResponse =  userService.verifyLink(token);
		if(userResponse != null) {
			try {
				response.sendRedirect("http://localhost:3000/reset-password");
			}
			catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

}
