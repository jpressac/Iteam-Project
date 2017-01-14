package org.iteam.data.dto;

public enum ActionsEnum {

    INSERT_SHARED_BOARD("INSERT_SHARED_BOARD", "insertSharedBoard"), USER_CONNECTED("USER_CONNECTED",
            "user connected"), INSERT_CACHE("INSERT_CACHE", "insertCache"), UPDATE_SHARED_BOARD_CACHE(
                    "UPDATE_SHARED_BOARD_CACHE", "updateSharedBoardCache"), UPDATE_DELETE_CACHE("UPDATE_DELETE_CACHE",
                            "updateCacheDelete"), END_MEETING("END_MEETING", "endMeeting");

    private String actionName;
    private String fieldName;

    public String getFieldName() {
        return fieldName;
    }

    private ActionsEnum(final String actionName, final String fieldName) {
        this.actionName = actionName;
        this.fieldName = fieldName;
    }

    public final String getActionName() {
        return actionName;
    }

    public static ActionsEnum toActionName(String value) {

        for (ActionsEnum action : values()) {

            if (action.getFieldName().equalsIgnoreCase(value)) {
                return action;
            }

        }

        throw new IllegalArgumentException("Invalid hashType value: " + value);
    }

}
