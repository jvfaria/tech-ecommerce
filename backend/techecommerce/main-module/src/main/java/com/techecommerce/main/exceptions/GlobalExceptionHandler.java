package com.techecommerce.main.exceptions;

import com.techecommerce.main.dto.ApiResponse;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    private static final List<Class<? extends Throwable>> BAD_REQUEST_EXCEPTIONS = List.of(
            EmailExistsException.class,
            CategoryNameExistsException.class,
            ResourceNotFoundException.class,
            EntityNotFoundException.class,
            MessageProcessingException.class,
            FileStorageException.class,
            UsernameExistsException.class,
            IllegalArgumentException.class,
            BrandNameExistsException.class,
            EmailExistsException.class,
            UsernameExistsException.class,
            UsernameNotFoundException.class,
            CategoryNameExistsException.class,
            EmptyProductsException.class,
            FileStorageException.class,
            MessageProcessingException.class,
            InvalidDataAccessApiUsageException.class
    );

    private static final List<Class<? extends Throwable>> UNAUTHORIZED_EXCEPTIONS = List.of(
            UserNotFoundException.class,
            BadCredentialsException.class,
            ExpiredJwtException.class,
            MalformedJwtException.class,
            UsernameNotFoundException.class,
            AccessDeniedException.class
    );

    @ExceptionHandler
    public ResponseEntity<ApiResponse<ErrorDetails>> handleBadRequestException(Throwable exception, HttpServletRequest request) {
        HttpStatus status;

        if (BAD_REQUEST_EXCEPTIONS.contains(exception.getClass())) {
            status = HttpStatus.BAD_REQUEST;
        } else if (UNAUTHORIZED_EXCEPTIONS.contains(exception.getClass())) {
            status = HttpStatus.UNAUTHORIZED;
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return buildErrorResponse(exception, status, request);
    }

    private ResponseEntity<ApiResponse<ErrorDetails>> buildErrorResponse(Throwable exception, HttpStatus status, HttpServletRequest request) {
        String formattedDateTime = getFormattedDateTime();
        ErrorDetails errorDetails = new ErrorDetails(
                formattedDateTime,
                status.value(),
                status.name(),
                request.getRequestURL().toString(),
                exception.getMessage()
        );
        log.error("Exception handled: {} {}", exception.getClass().getSimpleName(), exception.getMessage());
        return ResponseEntity.status(status)
                .body(buildApiResponse(exception, errorDetails));
    }

    private static String getFormattedDateTime() {
        return LocalDateTime.now().format(DATE_TIME_FORMATTER);
    }

    private static ApiResponse<ErrorDetails> buildApiResponse(Throwable exception, ErrorDetails errorDetails) {
        return ApiResponse.<ErrorDetails>builder()
                .data(errorDetails)
                .error(exception.getCause() != null ? exception.getCause().getMessage() : "No root cause")
                .message(exception.getMessage())
                .build();
    }
}