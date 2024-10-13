# Use a Java 11 base image
FROM openjdk:11-jdk-slim

VOLUME /tmp

# Set the working directory
WORKDIR /app

# Copy the Maven build output
COPY api/target/api-1.1.0.jar app.jar

# Expose the port your application runs on
EXPOSE 8082

CMD ["java", "-jar", "TechecommerceApplication.jar"]

# Run the application
ENTRYPOINT ["java", "-jar", "shaded-artifact.jar", "app.jar"]