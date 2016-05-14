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
	 * @param userName,
	 *            the user name
	 * @param password,
	 *            the pass to that user
	 * @return a user which contains all the information about him.
	 */
	public User getUser(String userName, String password);

	/**
	 * Insert a new user into the database
	 * 
	 * @param user,
	 *            the user to be inserted @return, true if the insertion was
	 *            successfully, false otherwise
	 */
	public boolean setUser(User user);

	/**
	 * Check if an specific user name already exists
	 * 
	 * @param userName,
	 *            the user name to check
	 * @return true if it exists, false otherwise
	 */
	public boolean checkUserExistance(String userName);
}
