package org.iteam.controllers.rest;

import java.util.List;

import javax.validation.Valid;

import org.iteam.data.model.Nationalities;
import org.iteam.services.utilities.UtilitiesServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UtilitiesController {

	private UtilitiesServiceImpl utilitiesServiceImpl;

	/**
	 * Insert nationalities to full fill drop down list (nationalities)
	 * 
	 * @param nationalities,
	 *            the list of nationalities
	 * @return true 200 OK if it was successful
	 */
	@RequestMapping(value = "/utilities/nationality/insert", method = RequestMethod.POST)
	public ResponseEntity<Void> saveNationalitiesDropDown(@RequestBody @Valid Nationalities nationalities) {
		boolean succes = utilitiesServiceImpl.insertNationalities(nationalities);

		if (succes) {
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Get the nationalities for full fill the drop down list.
	 * 
	 * @return Nationalities.
	 */
	@RequestMapping(value = "/utilities/nationality/get", method = RequestMethod.GET)
	public Nationalities getNationalitiesDDL() {
		return utilitiesServiceImpl.getNationalities();
	}

	/**
	 * Get all the professions in the database.
	 * 
	 * @return a list of professions.
	 */
	@RequestMapping(value = "/utilities/professions", method = RequestMethod.GET)
	public List<String> getProfessions() {
		return utilitiesServiceImpl.getProfessions();
	}

	@Autowired
	private void setUtilitiesServiceImpl(UtilitiesServiceImpl utilitiesServiceImpl) {
		this.utilitiesServiceImpl = utilitiesServiceImpl;
	}
}
