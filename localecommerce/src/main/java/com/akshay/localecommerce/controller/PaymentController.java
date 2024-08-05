package com.akshay.localecommerce.controller;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.akshay.localecommerce.service.StripeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/adminuser/payment")
public class PaymentController {

    @Autowired
    private StripeService stripeService;

    @PostMapping("/create")
    public PaymentIntent createPaymentIntent(@RequestBody Map<String, Object> data) throws StripeException {
        Long amount = Long.parseLong(data.get("amount").toString());
        String currency = data.get("currency").toString();
        Integer orderId = Integer.parseInt(data.get("orderId").toString());
        return stripeService.createPaymentIntent(amount, currency, orderId);
    }
}
