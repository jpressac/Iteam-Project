package org.iteam.controllers.rest;

import javax.validation.Valid;

import org.iteam.data.dal.utilities.UtilitiesRepositoryImpl;
import org.iteam.data.model.Nationalities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Utilities {

	private UtilitiesRepositoryImpl utilitiesRepositoryImpl;

	/**
	 * Insert nationalities to full fill drop down list (nationalities)
	 * 
	 * @param nationalities,
	 *            the list of nationalities
	 * @return true (200 OK) if it was successful or false (400 Bad Request) if
	 *         it wasn't.
	 */
	@RequestMapping(value = "/utilities/nationality/insert", method = RequestMethod.POST)
	public ResponseEntity<Boolean> saveNationalitiesDropDown(@RequestBody @Valid Nationalities nationalities) {
		boolean succes = utilitiesRepositoryImpl.insertNationalities(nationalities);

		if (succes) {
			return new ResponseEntity<Boolean>(succes, HttpStatus.OK);
		} else {
			return new ResponseEntity<Boolean>(succes, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Get the nationalities for full fill the drop down list.
	 * 
	 * @return Nationalities.
	 */
	@RequestMapping(value = "/utilities/nationality/get", method = RequestMethod.GET)
	public Nationalities getNationalitiesDDL() {
		return utilitiesRepositoryImpl.getNationalities();
	}

	@Autowired
	private void setUtilitiesRepositoryImpl(UtilitiesRepositoryImpl utilitiesRepositoryImpl) {
		this.utilitiesRepositoryImpl = utilitiesRepositoryImpl;
	}

}
