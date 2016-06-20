package org.iteam.services.utilities;

import org.iteam.data.dal.utilities.UtilitiesRepositoryImpl;
import org.iteam.data.model.Nationalities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UtilitiesServiceImpl implements UtilitiesService {

	private UtilitiesRepositoryImpl utilitiesRepositoryImpl;

	@Override
	public boolean insertNationalities(Nationalities nationalities) {
		return utilitiesRepositoryImpl.insertNationalities(nationalities);
	}

	@Override
	public Nationalities getNationalities() {
		return utilitiesRepositoryImpl.getNationalities();
	}

	@Autowired
	private void setUtilitiesRepositoryImpl(UtilitiesRepositoryImpl utilitiesRepositoryImpl) {
		this.utilitiesRepositoryImpl = utilitiesRepositoryImpl;
	}

}
