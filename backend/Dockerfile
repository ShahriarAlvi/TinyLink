# ---------- Stage 1: Build the application ----------
FROM maven:3.9.9-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy only pom.xml and download dependencies first (cache-friendly)
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline

# Now copy the entire project
COPY src ./src

# Build the JAR file (skip tests for faster build)
RUN ./mvnw clean package -DskipTests

# ---------- Stage 2: Run the application ----------
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy the built JAR file from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the port your Spring Boot app runs on
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
