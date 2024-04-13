package co.edu.escuelaing.cvds.lab7;

import co.edu.escuelaing.cvds.lab7.model.Configuration;
import co.edu.escuelaing.cvds.lab7.model.Employee;
import co.edu.escuelaing.cvds.lab7.model.User;
import co.edu.escuelaing.cvds.lab7.model.UserRole;
import co.edu.escuelaing.cvds.lab7.repository.UserRepository;
import co.edu.escuelaing.cvds.lab7.service.ConfigurationService;
import co.edu.escuelaing.cvds.lab7.service.Prueba;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;

@SpringBootApplication
@Slf4j
public class Lab7Application {
	private final ConfigurationService configurationService;

	private final UserRepository userRepository;

	private final Prueba employeeService;

	@Autowired
	public Lab7Application(
			ConfigurationService configurationService,
			UserRepository userRepository,
			Prueba employeeService
	) {
		this.configurationService = configurationService;
		this.userRepository = userRepository;
		this.employeeService = employeeService;
	}

	public static void main(String[] args) {
		SpringApplication.run(Lab7Application.class, args);
	}

	@Bean
	public CommandLineRunner run() {
		return (args) -> {
			log.info("Adding Configurations....");
			configurationService.addConfiguration(new Configuration("premio", "810000"));
			configurationService.addConfiguration(new Configuration("descuento", "0.1"));
			configurationService.addConfiguration(new Configuration("app-name", "Miraculous: Las Aventuras de Ladybug"));
			employeeService.addEmployee(new Employee("1234", "Prueba", "Prueba", "Prueba", 123456.0));
			employeeService.addEmployee(new Employee("12345", "Ricardo", "Villamizar", "Tester", 1234567.0));
			employeeService.addEmployee(new Employee("123456", "Erick", "Montero", "Jefe", 12345678910.0));


			log.info("\nGetting all configurations....");
			configurationService.getAllConfigurations().forEach(configuration -> System.out.println(configuration));
			employeeService.getAllEmployees().forEach(employee -> System.out.println(employee));

			log.info("\nAdding admin@site.org user with Password: admin");
			userRepository.save(new User("admin@site.org", "admin", Arrays.asList(UserRole.ADMINISTRADOR, UserRole.CLIENTE)));
		};
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

}
