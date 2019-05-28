package service;

import org.springframework.test.context.ActiveProfilesResolver;

public class SpringActiveProfileResolver implements ActiveProfilesResolver {
    @Override
    public String[] resolve(Class<?> testClass) {
    	String[] activeProfiles = {"dev-direct", "dynamodb-stats"};
        String activeProfilesStr = System.getProperty("spring.profiles.active");
        if(activeProfilesStr != null && !activeProfilesStr.isEmpty() && activeProfilesStr.contains(",")) {
        	activeProfiles = activeProfilesStr.split(",");
        }
        return activeProfiles;
    }
}
