package org.iteam.services.utilities;

import java.util.List;

import org.iteam.data.dto.Nationalities;

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

    /**
     * Get the list of all professions.
     * 
     * @return, list of professions.
     */
    public List<String> getProfessions();
}
