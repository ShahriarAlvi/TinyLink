# Use a lightweight Java image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Pre-download dependencies
RUN ./mvnw dependency:go-offline

# Copy project source
COPY src ./src

# Build the Spring Boot app
RUN ./mvnw clean package -DskipTests

# Expose port 8080
EXPOSE 8080

# Run the built JAR
CMD ["java", "-jar", "target/*.jar"]
