package com.techecommerce.main.utils;


import com.techecommerce.main.config.jwt.JwtUtil;

import java.util.Date;

public class DateUtils {
    public static Date formatExpirationDateToken() {
        Date date = new Date(System.currentTimeMillis() + JwtUtil.JWT_EXPIRATION_MINUTES * 1000);
        return date;
    }
}
