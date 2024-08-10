# Use an official OpenJDK runtime as a parent image
FROM openjdk:22-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the project JAR file into the container
COPY target/localecommerce-0.0.1-SNAPSHOT.jar /app/localecommerce.jar

# Expose port 8080
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "/app/localecommerce.jar"]