package org.iteam.configuration;

import org.iteam.services.user.IteamUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class UserSecurityConfiguration extends WebSecurityConfigurerAdapter {

	private IteamUserDetailService userDetailService;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(this.userDetailService);
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/bower_components/**", "scripts/**/*.js", "scripts/**/*.jsx", "/styles/**/*",
				"/imgs/**/*.*");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers("/screenboard/**/*").permitAll()
				.antMatchers(HttpMethod.GET, "/user/authenticated").permitAll().antMatchers(HttpMethod.OPTIONS, "/**/*")
				.permitAll().anyRequest().authenticated().and().formLogin().loginPage("/login")
				.defaultSuccessUrl("/application", true).permitAll().and().httpBasic().and().csrf().disable().logout()
				.logoutSuccessUrl("/application").deleteCookies("JSESSIONID");
	}

	@Autowired
	private void setUserDetailService(IteamUserDetailService userDetailService) {
		this.userDetailService = userDetailService;
	}

}
