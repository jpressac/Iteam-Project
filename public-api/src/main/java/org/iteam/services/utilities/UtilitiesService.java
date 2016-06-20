package org.iteam.services.utilities;

import org.iteam.data.model.Nationalities;

public interface UtilitiesService {

	/**
	 * Insert nationalities.
	 * 
	 * @param nationalities,
	 *            the list of nationalities.
	 * @return true if it was successful, false otherwise.
	 */
	public boolean insertNationalities(Nationalities nationalities);

	/**
	 * Get the nationalities.
	 * 
	 * @return Nationalities.
	 */
	public Nationalities getNationalities();
}
