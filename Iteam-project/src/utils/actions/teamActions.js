import axios from 'axios'
import {TEAM} from '../../constants/HostConfiguration'

export function createTeam(user, teamName, members) {
  return axios.post(TEAM.TEAM_CREATE, {
    ownerName: user,
    name: teamName,
    members: members
  })
}

export function teamNameExistence(teamName, user) {
  return axios.get(TEAM.TEAM_NAME_EXISTENT, {
    params: {
      teamName: teamName,
      teamOwner: user
    }
  })
}

export function selectTeam(filter) {
  return axios.get(TEAM.TEAM_SELECT, {
    params: {
      filter: filter
    }
  })
}

export function getTeamByOwner(token, offset, limit) {
  return axios.get(TEAM.TEAM_BY_OWNER_SEARCH, {
    params: {
      token: token,
      offset: offset,
      limit: limit
    }
  })
}

export function getTeamByOwnerPaginated(offset, itemsPerPage) {
  return axios.get(TEAM.TEAM_BY_OWNER_PAGINATED, {
    params: {
      offset: offset,
      limit: itemsPerPage
    }
  })
}
