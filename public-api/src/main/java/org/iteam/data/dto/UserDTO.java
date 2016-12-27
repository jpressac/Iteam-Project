package org.iteam.data.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
@Table(name = "user")
@DynamicUpdate
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(Include.NON_NULL)
public class UserDTO {

    private static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    @Id
    private String username;

    @JsonProperty(access = Access.WRITE_ONLY)
    private String password;
    private String name;

    @Column(name = "last_name")
    private String lastName;
    private String gender;
    private String nationality;

    @Column(name = "born_date")
    private Long bornDate;
    private String hobbies;
    private String profession;

    @Column(name = "logical_delete")
    private boolean logicalDelete = false;

    @Column(name = "insertion_date")
    private Long insertionDate;
    private String mail;

    public UserDTO() {

    }

    public UserDTO(boolean logicalDelete) {
        this.logicalDelete = logicalDelete;
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
        this.password = PASSWORD_ENCODER.encode(password);
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

    public String getHobbies() {
        return hobbies;
    }

    public void setHobbies(String hobbies) {
        this.hobbies = hobbies;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
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
