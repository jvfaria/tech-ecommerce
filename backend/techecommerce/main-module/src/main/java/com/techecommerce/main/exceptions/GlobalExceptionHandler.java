package com.techecommerce.main.exceptions;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailExistsException.class)
    public ResponseEntity<ErrorDetails> handleException(EmailExistsException exception, HttpServletRequest request) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.name(),
                request.getRequestURL().toString(),
                exception.getMessage()
        );

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CategoryNameExistsException.class)
    public ResponseEntity<ErrorDetails> handleException(CategoryNameExistsException exception, HttpServletRequest request) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.name(),
                request.getRequestURL().toString(),
                exception.getMessage()
        );

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ResourceNotFoundException.class, EntityNotFoundException.class})
    public ResponseEntity<ErrorDetails> handleException(ResourceNotFoundException exception, HttpServletRequest req) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.name(),
                req.getRequestURL().toString(),
                exception.getMessage()
        );
        return new ResponseEntity<>(errorDetails,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({MessageProcessingException.class})
    public ResponseEntity<ErrorDetails> handleException(MessageProcessingException exception, HttpServletRequest req) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.name(),
                req.getRequestURL().toString(),
                exception.getMessage()
        );
        return new ResponseEntity<>(errorDetails,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorDetails> handleException(UserNotFoundException exception, HttpServletRequest req) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.UNAUTHORIZED.value(),
                HttpStatus.UNAUTHORIZED.name(),
                req.getRequestURL().toString(),
                exception.getMessage()
        );

        return new ResponseEntity<>(errorDetails,HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(FileStorageException.class)
    public ResponseEntity<ErrorDetails> handleException(FileStorageException exception, HttpServletRequest req) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.name(),
                req.getRequestURL().toString(),
                exception.getMessage()
        );

        return new ResponseEntity<>(errorDetails,HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UsernameExistsException.class)
    public ResponseEntity<ErrorDetails> handleException(UsernameExistsException exception, HttpServletRequest req) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.name(),
                req.getRequestURL().toString(),
                exception.getMessage()
        );
        return new ResponseEntity<>(errorDetails,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorDetails> handleException(UsernameNotFoundException exception, HttpServletRequest req) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.name(),
                req.getRequestURL().toString(),
                exception.getMessage()
        );
        return new ResponseEntity<>(errorDetails,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmptyProductsException.class)
    public ResponseEntity<ErrorDetails> handleException(EmptyProductsException exception, HttpServletRequest req) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.name(),
                req.getRequestURL().toString(),
                exception.getMessage()
        );
        log.error("Exception trace: {} \n Exception message: {}", exception.getStackTrace(), exception.getMessage());
        return new ResponseEntity<>(errorDetails,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorDetails> handleException(BadCredentialsException exception, HttpServletRequest req) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.UNAUTHORIZED.value(),
                HttpStatus.UNAUTHORIZED.name(),
                req.getRequestURL().toString(),
                exception.getMessage()
        );
        return new ResponseEntity<>(errorDetails,HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorDetails> handleException(IllegalArgumentException exception, HttpServletRequest req) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.name(),
                req.getRequestURL().toString(),
                exception.getMessage()
        );
        return new ResponseEntity<>(errorDetails,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorDetails> handleException(AccessDeniedException exception, HttpServletRequest req) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.name(),
                req.getRequestURL().toString(),
                exception.getMessage()
        );
        return new ResponseEntity<>(errorDetails,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ErrorDetails> handleException(ExpiredJwtException exception, HttpServletRequest req) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.name(),
                req.getRequestURL().toString(),
                exception.getMessage()
        );
        return new ResponseEntity<>(errorDetails,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MalformedJwtException.class)
    public ResponseEntity<ErrorDetails> handleException(MalformedJwtException exception, HttpServletRequest req) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.name(),
                req.getRequestURL().toString(),
                exception.getMessage()
        );
        return new ResponseEntity<>(errorDetails,HttpStatus.BAD_REQUEST);
    }
}
