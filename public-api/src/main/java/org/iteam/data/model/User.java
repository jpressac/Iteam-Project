package org.iteam.data.model;

import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class User {

	// TODO: add creation/modification date
	private String username;
	private String password;
	private String name;
	private String lastName;
	private String nationality;
	private String bornDate;
	private List<String> hobbies;
	private String profession;
	private String mbtiTest;
	private String discTest;
	private boolean logicalDelete = false;
	private String insertionDate;
	private String mail;

	public User(boolean logicalDelete) {
		this.logicalDelete = logicalDelete;
	}

	public User() {

	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String userName) {
		this.username = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getNationality() {
		return nationality;
	}

	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	public String getBornDate() {
		return bornDate;
	}

	public void setBornDate(String bornDate) {
		this.bornDate = bornDate;
	}

	public List<String> getHobbies() {
		return hobbies;
	}

	public void setHobbies(List<String> hobbies) {
		this.hobbies = hobbies;
	}

	public String getProfession() {
		return profession;
	}

	public void setProfession(String profession) {
		this.profession = profession;
	}

	public String getMbtiTest() {
		return mbtiTest;
	}

	public void setMbtiTest(String mbtiTest) {
		this.mbtiTest = mbtiTest;
	}

	public String getDiscTest() {
		return discTest;
	}

	public void setDiscTest(String discTest) {
		this.discTest = discTest;
	}

	public boolean isLogicalDelete() {
		return logicalDelete;
	}

	public void setLogicalDelete(boolean logicalDelete) {
		this.logicalDelete = logicalDelete;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getInsertionDate() {
		return insertionDate;
	}

	public void setInsertionDate(String insertionDate) {
		this.insertionDate = insertionDate;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}
}
