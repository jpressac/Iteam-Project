package org.iteam.data.dto;

import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(Include.NON_EMPTY)
public class UserDTO {

    // TODO: add creation/modification date
    private String username;
    private String password;
    private String newPassword;
    private String name;
    private String lastName;
    private String gender;
    private String nationality;
    private Long bornDate;
    private List<String> hobbies;
    private String profession;
    private String mbtiTest;
    private String discTest;
    private boolean logicalDelete = false;
    private Long insertionDate;
    private String mail;

    public UserDTO(boolean logicalDelete) {
        this.logicalDelete = logicalDelete;
    }

    public UserDTO() {

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

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
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

    public Long getBornDate() {
        return bornDate;
    }

    public void setBornDate(Long bornDate) {
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

    public Long getInsertionDate() {
        return insertionDate;
    }

    public void setInsertionDate(Long insertionDate) {
        this.insertionDate = insertionDate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }
}
