// package org.iteam.services.user;
//
// import org.elasticsearch.action.get.GetResponse;
// import org.iteam.data.dal.client.ElasticsearchClientImpl;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Configuration;
// import
// org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
// import
// org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.core.authority.AuthorityUtils;
// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import
// org.springframework.security.core.userdetails.UsernameNotFoundException;
//
// @Configuration
// @EnableWebSecurity
// @EnableGlobalMethodSecurity(prePostEnabled = true)
// public class IteamUserDetailService implements UserDetailsService {
//
// private ElasticsearchClientImpl elasticsearchRepository;
//
// @Override
// public UserDetails loadUserByUsername(String username) throws
// UsernameNotFoundException {
// GetResponse response = elasticsearchRepository.checkUser("user", "data",
// username);
// if (response.isExists()) {
// String userRoles = response.getField("roles").getValue().toString();
// return new User(response.getId(),
// response.getField("password").getValue().toString(),
// AuthorityUtils.createAuthorityList(userRoles));
// } else {
// return new User("admin", "admin", AuthorityUtils.createAuthorityList(new
// String[] { "ROLE_ADMIN" }));
// }
// }
//
// @Autowired
// private void setElasticsearchRepository(ElasticsearchClientImpl
// elasticsearchRepository) {
// this.elasticsearchRepository = elasticsearchRepository;
// }
//
// }
