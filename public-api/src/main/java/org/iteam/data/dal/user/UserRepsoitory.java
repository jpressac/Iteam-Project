package org.iteam.data.dal.user;

import org.iteam.data.dto.UserDTO;

/**
 * This class controls all the request for getting and setting information about
 * the users
 *
 */
public interface UserRepsoitory {

    /**
     * Get the user with all his information.
     * 
     * @param username
     *            the user name.
     * @return a user which contains all the information about him.
     */
    public UserDTO getUser(String username);

    /**
     * Insert a new user into the database
     * 
     * @param user
     *            the user to be inserted.
     */
    public void setUser(UserDTO user);

    /**
     * Check if an specific user name already exists.
     * 
     * @param username
     *            the user name to check.
     * @return true if it exists, false otherwise.
     */
    public boolean checkUserExistance(String username);

    /**
     * Modify an existent user.
     * 
     * @param user
     *            the information to modify.
     * @param username
     *            the username of the user to modify.
     */
    public void modifyUser(UserDTO user, String username);

    /**
     * Delete logically a user.
     * 
     * @param doc
     *            the information to delete the user.
     * @param username
     *            the username of the user to modify.
     * @return true if it was successful, false otherwise.
     */
    public boolean logicalDelete(String doc, String username);

    /**
     * Validate the given password match the user
     * 
     * @param username
     *            the username to validate.
     * @param password
     *            the password to be validated.
     * @return true if the password was valid, false otherwise
     */
    public boolean validatePassword(String username, String password);
}
