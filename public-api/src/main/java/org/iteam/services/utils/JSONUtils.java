package org.iteam.services.utils;

import java.io.IOException;

import org.iteam.exceptions.JsonParsingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * It serves as a transpiler for json objects
 *
 */
public class JSONUtils {

	private static final Logger LOGGER = LoggerFactory.getLogger(JSONUtils.class);

	private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

	private JSONUtils() {

	}

	/**
	 * Convert an Object to JSON representation.
	 * 
	 * @param object,
	 *            the object to transform.
	 * @return the json representation of the object.
	 */
	public static String ObjectToJSON(Object object) {
		try {
			return OBJECT_MAPPER.writeValueAsString(object);
		} catch (Exception e) {
			LOGGER.error("Cannot convert '{}' to JSON Error: '{}'", object.getClass(), e.getMessage());
			throw new JsonParsingException(e);
		}
	}

	/**
	 * Convert JSON to their respective object.
	 * 
	 * @param json,
	 *            the json to transform.
	 * @param objectToConvert,
	 *            the class that represent that json.
	 * @return the object representation of the json.
	 */
	public static Object JSONToObject(String json, Class<?> objectToConvert) {
		try {
			return OBJECT_MAPPER.readValue(json, objectToConvert);
		} catch (IOException e) {
			LOGGER.error("Cannot convert JSON to '{}' Error: '{}'", objectToConvert, e.getMessage());
			throw new JsonParsingException(e);
		}
	}

}
