package org.iteam.services.logging;

import org.iteam.data.model.User;

/**
 * This class controls all the request for getting and setting information about
 * the users
 *
 */
public interface LoggingService {

	/**
	 * Get the user with all his information.
	 * 
	 * @return a user which contains all the information about him.
	 */
	public User getUser();
}
