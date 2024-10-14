FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the Maven build output
COPY api/target/api-1.1.0-exec.jar app.jar

# Expose the port your application runs on
EXPOSE 8082

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
