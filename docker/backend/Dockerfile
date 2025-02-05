# Build stage
FROM maven:3.6.3-openjdk-22 AS build
WORKDIR /build 
COPY pom.xml .
RUN maven dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM amazoncorretto:22
ARG PROFILE=dev
ARG APP_VERSION=1.0.0

WORKDIR /app
COPY --from=build /build/target/localecommerce-*.jar /app/

EXPOSE 8080


ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} localecommerce-${JAR_VERSION}.jar