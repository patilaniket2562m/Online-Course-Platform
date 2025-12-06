# STEP 1: Build JAR using Maven
FROM maven:3.8.6-amazoncorretto-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# STEP 2: Run Spring Boot with Java 17
FROM amazoncorretto:17
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Render will auto-inject PORT
EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar","--server.port=${PORT}"]
