package org.iteam.configuration;

import static com.google.common.collect.Lists.newArrayList;

import java.util.Collections;
import java.util.List;

import javax.annotation.Resource;

import org.iteam.configuration.google.GoogleAccessTokenConverter;
import org.iteam.configuration.google.GoogleTokenServices;
import org.iteam.services.user.IteamUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.DefaultOAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.filter.OAuth2ClientAuthenticationProcessingFilter;
import org.springframework.security.oauth2.client.filter.OAuth2ClientContextFilter;
import org.springframework.security.oauth2.client.resource.OAuth2ProtectedResourceDetails;
import org.springframework.security.oauth2.client.token.AccessTokenRequest;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails;
import org.springframework.security.oauth2.common.AuthenticationScheme;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;
import org.springframework.security.web.access.ExceptionTranslationFilter;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
@EnableOAuth2Client
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class UserSecurityConfiguration extends WebSecurityConfigurerAdapter {

	private static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

	private IteamUserDetailService userDetailService;

	@Autowired
	private Environment environment;

	@Resource
	@Qualifier("accessTokenRequest")
	private AccessTokenRequest accessTokenRequest;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailService).passwordEncoder(PASSWORD_ENCODER);
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/*.js", "/*.css", "/*.jpg", "/*.ico", "/*.png", "/*.js.*");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers(HttpMethod.POST, "/user").permitAll()
				.antMatchers(HttpMethod.GET, "/user/authenticated").permitAll()
				.antMatchers(HttpMethod.GET, "/utilities/nationality/get").permitAll()
				.antMatchers(HttpMethod.GET, "/utilities/professions").permitAll()
				.antMatchers(HttpMethod.POST, "/utilities/nationality/insert").permitAll()
				.antMatchers(HttpMethod.POST, "/usergoogle").permitAll().antMatchers(HttpMethod.OPTIONS, "/**/*")
				.permitAll().anyRequest().authenticated().and().formLogin().loginPage("/application/nmember/home")
				.defaultSuccessUrl("/application/member/home", true).permitAll().and().httpBasic().and().csrf()
				.disable().logout().logoutSuccessUrl("/application/nmember/home").deleteCookies("JSESSIONID").and()
				.sessionManagement().and().httpBasic().authenticationEntryPoint(clientAuthenticationEntryPoint()).and()
				.addFilterAfter(oAuth2ClientContextFilter(), ExceptionTranslationFilter.class)
				.addFilterBefore(oAuth2AuthenticationProcessingFilter(), FilterSecurityInterceptor.class);
	}

	@Bean
	public LoginUrlAuthenticationEntryPoint clientAuthenticationEntryPoint() {
		return new LoginUrlAuthenticationEntryPoint("/usergoogle");
	}

	@Bean
	public GoogleTokenServices tokenServices() {
		GoogleTokenServices googleTokenServices = new GoogleTokenServices();
		googleTokenServices.setClientId(environment.getProperty("google.client.id"));
		googleTokenServices.setClientSecret(environment.getProperty("google.client.secret"));
		googleTokenServices.setCheckTokenEndpointUrl("https://www.googleapis.com/oauth2/v1/tokeninfo");
		googleTokenServices.setAccessTokenConverter(accessTokenConverter());

		return googleTokenServices;
	}

	@Bean
	public GoogleAccessTokenConverter accessTokenConverter() {
		return new GoogleAccessTokenConverter();
	}

	@Bean
	public OAuth2ClientContextFilter oAuth2ClientContextFilter() {
		return new OAuth2ClientContextFilter();
	}

	@Bean
	public OAuth2ClientAuthenticationProcessingFilter oAuth2AuthenticationProcessingFilter() {
		OAuth2ClientAuthenticationProcessingFilter oAuth2ClientAuthenticationProcessingFilter = new OAuth2ClientAuthenticationProcessingFilter(
				"/usergoogle");
		oAuth2ClientAuthenticationProcessingFilter.setTokenServices(tokenServices());
		oAuth2ClientAuthenticationProcessingFilter.setRestTemplate(googleRestTemplate());

		return oAuth2ClientAuthenticationProcessingFilter;
	}

	@Bean
	public OAuth2ProtectedResourceDetails googleResource() {
		AuthorizationCodeResourceDetails details = new AuthorizationCodeResourceDetails();
		details.setId("google-oauth-client");
		details.setClientId(environment.getProperty("google.client.id"));
		details.setClientSecret(environment.getProperty("google.client.secret"));
		details.setAccessTokenUri(environment.getProperty("google.accessTokenUri"));
		details.setUserAuthorizationUri(environment.getProperty("google.userAuthorizationUri"));
		details.setTokenName(environment.getProperty("google.authorization.code"));
		String commaSeparatedScopes = environment.getProperty("google.auth.scope");
		details.setScope(parseScopes(commaSeparatedScopes));
		// details.setPreEstablishedRedirectUri(env.getProperty("google.preestablished.redirect.url"));
		// details.setUseCurrentUri(false);
		details.setAuthenticationScheme(AuthenticationScheme.query);
		details.setClientAuthenticationScheme(AuthenticationScheme.form);
		return details;
	}

	private List<String> parseScopes(String commaSeparatedScopes) {
		List<String> scopes = newArrayList();
		Collections.addAll(scopes, commaSeparatedScopes.split(","));
		return scopes;
	}

	@Bean
	public OAuth2RestTemplate googleRestTemplate() {
		return new OAuth2RestTemplate(googleResource(), new DefaultOAuth2ClientContext(accessTokenRequest));
	}

	@Autowired
	private void setUserDetailService(IteamUserDetailService userDetailService) {
		this.userDetailService = userDetailService;
	}

}
