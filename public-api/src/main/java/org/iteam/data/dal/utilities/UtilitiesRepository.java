package org.iteam.data.dal.utilities;

import java.util.List;

import org.iteam.data.model.Nationalities;

public interface UtilitiesRepository {

    /**
     * Insert nationalities.
     * 
     * @param nationalities,
     *            the list of nationalities.
     * @return true if it was successful, false otherwise.
     */
    public boolean insertNationalities(Nationalities nationalities);

    /**
     * Get nationalities.
     * 
     * @return Nationalities.
     */
    public Nationalities getNationalities();

    /**
     * Get the list of professions.
     * 
     * @return, the list of professions.
     */
    public List<String> getProfessions();

}
