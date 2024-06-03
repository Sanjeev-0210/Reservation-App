package org.jsp.reservationapi.service;

import java.util.Optional;

import org.jsp.reservationapi.dao.UserDao;
import org.jsp.reservationapi.dto.EmailConfiguration;
import org.jsp.reservationapi.dto.ResponseStructure;
import org.jsp.reservationapi.dto.UserRequest;
import org.jsp.reservationapi.dto.UserResponse;
import org.jsp.reservationapi.exception.UserNotFoundException;
import org.jsp.reservationapi.model.User;
import org.jsp.reservationapi.util.AccountStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import net.bytebuddy.utility.RandomString;

@Service
public class UserService {
	@Autowired
	private UserDao userDao;
	@Autowired
	private ReservationAPIMailService mailService;
	@Autowired
	private EmailConfiguration emailConfiguration;
	@Autowired
	private LinkGenerationService linkGenerationService;

	public ResponseEntity<ResponseStructure<UserResponse>> save(UserRequest userRequest,HttpServletRequest request) {
		ResponseStructure<UserResponse> structure = new ResponseStructure<>();
		User user = mapToUser(userRequest);
		user.setStatus(AccountStatus.IN_ACTIVE.toString());
		userDao.saveUser(user);
		String activation_link = linkGenerationService.getActivationLink(user, request);
		emailConfiguration.setSubject("Activate Your Account");
		emailConfiguration.setToAddress(user.getEmail());
		emailConfiguration.setText("Dear User, Please Activate your Account by clicking on the following Link: "+activation_link);
		structure.setMessage(mailService.sendMail(emailConfiguration));
		structure.setData(mapToUserResponse(user));
		structure.setStatusCode(HttpStatus.CREATED.value());
		return ResponseEntity.status(HttpStatus.CREATED).body(structure);
	}

	public ResponseEntity<ResponseStructure<UserResponse>> update(UserRequest userRequest,int id) {
		Optional<User> recUser = userDao.findById(id);
		ResponseStructure<UserResponse> structure = new ResponseStructure<>();
		if (recUser.isPresent()) {
			User dbUser = recUser.get();
			dbUser.setEmail(userRequest.getEmail());
			dbUser.setName(userRequest.getName());
			dbUser.setPhone(userRequest.getPhone());
			dbUser.setAge(userRequest.getAge());
			dbUser.setGender(userRequest.getGender());
			dbUser.setPassword(userRequest.getPassword());
			structure.setData(mapToUserResponse(userDao.saveUser(dbUser)));
			structure.setMessage("User Updated");
			structure.setStatusCode(HttpStatus.ACCEPTED.value());
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(structure);
		}
		throw new UserNotFoundException("Cannot Update User as Id is Invalid");
	}

	public ResponseEntity<ResponseStructure<UserResponse>> findById(int id) {
		ResponseStructure<UserResponse> structure = new ResponseStructure<>();
		Optional<User> dbUser = userDao.findById(id);
		if (dbUser.isPresent()) {
			structure.setData(mapToUserResponse(dbUser.get()));
			structure.setMessage("User Found");
			structure.setStatusCode(HttpStatus.OK.value());
			return ResponseEntity.status(HttpStatus.OK).body(structure);
		}
		throw new UserNotFoundException("Invalid User Id");
	}

	public ResponseEntity<ResponseStructure<UserResponse>> verify(long phone, String password) {
		ResponseStructure<UserResponse> structure = new ResponseStructure<>();
		Optional<User> dbUser = userDao.verify(phone, password);
		if (dbUser.isPresent()) {
			structure.setData(mapToUserResponse(dbUser.get()));
			structure.setMessage("Verification Succesfull");
			structure.setStatusCode(HttpStatus.OK.value());
			return ResponseEntity.status(HttpStatus.OK).body(structure);
		}
		throw new UserNotFoundException("Invalid Phone Number or Password");
	}

	public ResponseEntity<ResponseStructure<UserResponse>> verify(String email, String password) {
		ResponseStructure<UserResponse> structure = new ResponseStructure<>();
		Optional<User> dbUser = userDao.verify(email, password);
		if (dbUser.isPresent()) {
			structure.setData(mapToUserResponse(dbUser.get()));
			structure.setMessage("Verification Succesfull");
			structure.setStatusCode(HttpStatus.OK.value());
			return ResponseEntity.status(HttpStatus.OK).body(structure);
		}
		throw new UserNotFoundException("Invalid Email Id or Password");
	}

	public ResponseEntity<ResponseStructure<String>> delete(int id) {
		ResponseStructure<String> structure = new ResponseStructure<>();
		Optional<User> dbUser = userDao.findById(id);
		if (dbUser.isPresent()) {
			userDao.delete(id);
			structure.setData("User Found");
			structure.setMessage("User deleted");
			structure.setStatusCode(HttpStatus.OK.value());
			return ResponseEntity.status(HttpStatus.OK).body(structure);
		}
		throw new UserNotFoundException("Cannot delete User as Id is Invalid");
	}
	
	public String activate(String token) {
		Optional<User> recUser = userDao.findByToken(token);
		if(recUser.isEmpty())
			throw new UserNotFoundException("Invalid Token!!!");
		User dbUser = recUser.get();
		dbUser.setToken(null);
		dbUser.setStatus("ACTIVE");
		userDao.saveUser(dbUser);
		return "Your account has been activated!!!";
	}
	
	private User mapToUser(UserRequest userRequest) {
		return User.builder().name(userRequest.getName()).email(userRequest.getEmail()).phone(userRequest.getPhone()).age(userRequest.getAge())
				.gender(userRequest.getGender()).password(userRequest.getPassword()).build();
	}
	
	private UserResponse mapToUserResponse(User user) {
		return UserResponse.builder().name(user.getName()).email(user.getEmail()).phone(user.getPhone()).age(user.getAge())
				.gender(user.getGender()).password(user.getPassword()).build();
	}

	

}
