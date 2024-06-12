package org.jsp.reservationapi.service;

import java.util.Optional;
import java.util.Random;

import org.jsp.reservationapi.dao.AdminDao;
import org.jsp.reservationapi.dto.AdminRequest;
import org.jsp.reservationapi.dto.AdminResponse;
import org.jsp.reservationapi.dto.EmailConfiguration;
import org.jsp.reservationapi.dto.ResponseStructure;
import org.jsp.reservationapi.exception.AdminNotFoundException;
import org.jsp.reservationapi.model.Admin;
import org.jsp.reservationapi.util.AccountStatus;
import org.jsp.reservationapi.util.VerifyOtp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import net.bytebuddy.utility.RandomString;

@Service
public class AdminService {

	@Autowired
	private AdminDao adminDao;
	
	@Autowired
	private ReservationAPIMailService mailService;
	@Autowired
	private EmailConfiguration emailConfiguration;
	@Autowired
	private LinkGenerationService linkGenerationService;
	@Autowired
	private VerifyOtp verifyOtp;

	public ResponseEntity<ResponseStructure<AdminResponse>> saveAdmin(AdminRequest adminRequest,HttpServletRequest request) {
		ResponseStructure<AdminResponse> structure = new ResponseStructure<>();
		Admin admin = mapToAdmin(adminRequest);
		admin.setStatus(AccountStatus.IN_ACTIVE.toString());
		adminDao.saveAdmin(admin);
		String activation_link = linkGenerationService.getActivationLink(admin, request);
		emailConfiguration.setSubject("Activate Your Account");
		emailConfiguration.setToAddress(admin.getEmail());
		emailConfiguration.setText("Dear Admin, Please Activate your Account by clicking on the following Link: "+activation_link);
		structure.setMessage(mailService.sendMail(emailConfiguration));
		structure.setData(mapToAdminResponse(admin));
		structure.setStatusCode(HttpStatus.CREATED.value());
		return ResponseEntity.status(HttpStatus.CREATED).body(structure);
	}

	/**
	 * This method will accept {@link AdminRequest(DTO)} and Admin_Id  and update the Admin in the Database 
	 * if Identifier is valid
	 * 
	 * 
	 * @param adminRequest
	 * @param id
	 * {@return ResponseEntity}
	 * @throws {@code AdminNotFoundException} if Identifier is Invalid
	 */
	
	public ResponseEntity<ResponseStructure<AdminResponse>> update(AdminRequest adminRequest,int id) {
		Optional<Admin> recAdmin = adminDao.findById(id);
		ResponseStructure<AdminResponse> structure = new ResponseStructure<>();
		if (recAdmin.isPresent()) {
			Admin dbAdmin = recAdmin.get();
			dbAdmin.setEmail(adminRequest.getEmail());
			dbAdmin.setGst_number(adminRequest.getGst_number());
			dbAdmin.setName(adminRequest.getName());
			dbAdmin.setPhone(adminRequest.getPhone());
			dbAdmin.setPassword(adminRequest.getPassword());
			dbAdmin.setTravels_name(adminRequest.getTravels_name());
			structure.setData(mapToAdminResponse(adminDao.saveAdmin(dbAdmin)));
			structure.setMessage("Admin Updated");
			structure.setStatusCode(HttpStatus.ACCEPTED.value());
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(structure);
		}
		throw new AdminNotFoundException("Cannot Update Admin as Id is Invalid");
	}
	
	public ResponseEntity<ResponseStructure<AdminResponse>> findById(int id) {
		ResponseStructure<AdminResponse> structure = new ResponseStructure<>();
		Optional<Admin> dbAdmin = adminDao.findById(id);
		if (dbAdmin.isPresent()) {
			structure.setData(mapToAdminResponse(dbAdmin.get()));
			structure.setMessage("Admin Found");
			structure.setStatusCode(HttpStatus.OK.value());
			return ResponseEntity.status(HttpStatus.OK).body(structure);
		}
		throw new AdminNotFoundException("Invalid Admin Id");
	}

	public ResponseEntity<ResponseStructure<AdminResponse>> verify(long phone, String password) {
		ResponseStructure<AdminResponse> structure = new ResponseStructure<>();
		Optional<Admin> dbAdmin = adminDao.verify(phone, password);
		if (dbAdmin.isPresent()) {
			structure.setData(mapToAdminResponse(dbAdmin.get()));
			structure.setMessage("Verification Succesfull");
			structure.setStatusCode(HttpStatus.OK.value());
			return ResponseEntity.status(HttpStatus.OK).body(structure);
		}
		throw new AdminNotFoundException("Invalid Phone Number or Password");
	}
	
	public ResponseEntity<ResponseStructure<AdminResponse>> verify(String email, String password) {
		ResponseStructure<AdminResponse> structure = new ResponseStructure<>();
		Optional<Admin> dbAdmin = adminDao.verify(email, password);
		if (dbAdmin.isPresent()) {
			Admin admin = dbAdmin.get();
			
			if(admin.getStatus().equals(AccountStatus.IN_ACTIVE.toString()))
				throw new IllegalStateException("Plaese Activate your Account before Logging In!!!");
			
			Random random = new Random();
			int otp = 100000 + random.nextInt(900000);
			emailConfiguration.setSubject("One Time Verification Code");
			emailConfiguration.setToAddress(email);
			emailConfiguration.setText("Dear Admin, Enter the 6-digit code below to verify your identity: "+otp);
			
			verifyOtp.setGenerated_otp(otp);
			
			structure.setMessage(mailService.sendMail(emailConfiguration));
			
			structure.setData(mapToAdminResponse(dbAdmin.get()));
			structure.setMessage("Verification Succesfull");
			structure.setStatusCode(HttpStatus.OK.value());
			return ResponseEntity.status(HttpStatus.OK).body(structure);
		}
		throw new AdminNotFoundException("Invalid Email Id or Password");
	}

	public ResponseEntity<ResponseStructure<String>> delete(int id) {
		ResponseStructure<String> structure = new ResponseStructure<>();
		Optional<Admin> dbAdmin = adminDao.findById(id);
		if (dbAdmin.isPresent()) {
			adminDao.delete(id);
			structure.setData("Admin Found");
			structure.setMessage("Admin deleted");
			structure.setStatusCode(HttpStatus.OK.value());
			return ResponseEntity.status(HttpStatus.OK).body(structure);
		}
		throw new AdminNotFoundException("Cannot delete Admin as Id is Invalid");
	}
	
	public String activate(String token) {
		Optional<Admin> recAdmin = adminDao.findByToken(token);
		if(recAdmin.isEmpty())
			throw new AdminNotFoundException("Invalid token");
		Admin dbAdmin = recAdmin.get();
		dbAdmin.setStatus("ACTIVE");
		dbAdmin.setToken(null);
		adminDao.saveAdmin(dbAdmin);
		return "Your Account has been activated";
	}
	
	public String forgotPassword(String email,HttpServletRequest request) {
		Optional<Admin> recAdmin = adminDao.findByEmail(email);
		if(recAdmin.isEmpty())
			throw new AdminNotFoundException("Invalid Email Id");
		Admin dbAdmin = recAdmin.get();
		String resetPasswordLink = linkGenerationService.getResetPasswordLink(dbAdmin, request);
		emailConfiguration.setSubject("RESET YOUR PASSWORD");
		emailConfiguration.setToAddress(email);
		emailConfiguration.setText("Please click on the following link to reset your password: "+resetPasswordLink);
		mailService.sendMail(emailConfiguration);
		return "Reset Password link has been sent to entered Mail Id!!!";
	}
	
	public AdminResponse verifyLink(String token) {
		Optional<Admin> recAdmin = adminDao.findByToken(token);
		if(recAdmin.isEmpty())
			throw new AdminNotFoundException("Link has been Expired or Invalid!!!");
		Admin dbAdmin = recAdmin.get();
		dbAdmin.setToken(null);
		adminDao.saveAdmin(dbAdmin);
		return mapToAdminResponse(dbAdmin);
	}
	
	private Admin mapToAdmin(AdminRequest adminRequest) {
		return Admin.builder().name(adminRequest.getName()).phone(adminRequest.getPhone()).email(adminRequest.getEmail())
				.gst_number(adminRequest.getGst_number()).travels_name(adminRequest.getTravels_name()).password(adminRequest.getPassword()).build();
	}
	
	private AdminResponse mapToAdminResponse(Admin admin) {
		return AdminResponse.builder().id(admin.getId()).name(admin.getName()).phone(admin.getPhone()).email(admin.getEmail())
				.gst_number(admin.getGst_number()).travels_name(admin.getTravels_name()).password(admin.getPassword()).build();
	}
}
