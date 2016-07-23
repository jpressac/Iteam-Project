package org.iteam.data.dal.user;

import org.iteam.data.model.User;

/**
 * This class controls all the request for getting and setting information about
 * the users
 *
 */
public interface UserRepsoitory {

    /**
     * Get the user with all his information.
     * 
     * @param username,
     *            the user name.
     * @return a user which contains all the information about him.
     */
    public User getUser(String username);

    /**
     * Insert a new user into the database
     * 
     * @param user,
     *            the user to be inserted @return, true if the insertion was
     *            successfully, false otherwise
     */
    public boolean setUser(User user);

    /**
     * Check if an specific user name already exists.
     * 
     * @param username,
     *            the user name to check.
     * @return true if it exists, false otherwise.
     */
    public boolean checkUserExistance(String username);

    /**
     * Modify an existent user.
     * 
     * @param doc,
     *            the information to modify.
     * @param username,
     *            the username of the user to modify.
     * @return true if it was successful, false otherwise.
     */
    public boolean modifyUser(String doc, String username);

    /**
     * Delete logically a user.
     * 
     * @param doc,
     *            the information to delete the user.
     * @param username,
     *            the username of the user to modify.
     * @return true if it was successful, false otherwise.
     */
    public boolean logicalDelete(String doc, String username);
}
