package com.techecommerce.api.exceptions;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailExistsException.class)
    public ResponseEntity handleException(EmailExistsException exception, HttpServletRequest request) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.name(),
                request.getRequestURL().toString(),
                exception.getMessage()
        );

        return new ResponseEntity(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity handleException(ResourceNotFoundException exception, HttpServletRequest req) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.name(),
                req.getRequestURL().toString(),
                exception.getMessage()
        );
        return new ResponseEntity(errorDetails,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity handleException(UserNotFoundException exception, HttpServletRequest req) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.name(),
                req.getRequestURL().toString(),
                exception.getMessage()
        );
        return new ResponseEntity(errorDetails,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UsernameExistsException.class)
    public ResponseEntity handleException(UsernameExistsException exception, HttpServletRequest req) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.name(),
                req.getRequestURL().toString(),
                exception.getMessage()
        );
        return new ResponseEntity(errorDetails,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity handleException(UsernameNotFoundException exception, HttpServletRequest req) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.name(),
                req.getRequestURL().toString(),
                exception.getMessage()
        );
        return new ResponseEntity(errorDetails,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity handleException(BadCredentialsException exception, HttpServletRequest req) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.name(),
                req.getRequestURL().toString(),
                exception.getMessage()
        );
        return new ResponseEntity(errorDetails,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity handleException(IllegalArgumentException exception, HttpServletRequest req) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.name(),
                req.getRequestURL().toString(),
                exception.getMessage()
        );
        return new ResponseEntity(errorDetails,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity handleException(AccessDeniedException exception, HttpServletRequest req) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.name(),
                req.getRequestURL().toString(),
                exception.getMessage()
        );
        return new ResponseEntity(errorDetails,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity handleException(ExpiredJwtException exception, HttpServletRequest req) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.name(),
                req.getRequestURL().toString(),
                exception.getMessage()
        );
        return new ResponseEntity(errorDetails,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MalformedJwtException.class)
    public ResponseEntity handleException(MalformedJwtException exception, HttpServletRequest req) {
        LocalDateTime now = LocalDateTime.now();
        ErrorDetails errorDetails = new ErrorDetails(
                now,
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.name(),
                req.getRequestURL().toString(),
                exception.getMessage()
        );
        return new ResponseEntity(errorDetails,HttpStatus.NOT_FOUND);
    }
}
