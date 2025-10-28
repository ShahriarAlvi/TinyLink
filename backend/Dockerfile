# Stage 1: Build locally
# Build your Spring Boot JAR locally using:
# ./mvnw clean package -DskipTests

# Stage 2: Runtime image
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copy the prebuilt JAR
COPY target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the application
ENTRYPOINT ["java","-jar","app.jar"]
