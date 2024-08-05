package com.akshay.localecommerce.service;

import com.akshay.localecommerce.model.Order;
import com.akshay.localecommerce.repository.OrderRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class StripeService {

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @Autowired
    private OrderRepository orderRepository;

    public StripeService() {
        Stripe.apiKey = stripeApiKey;
    }

    public PaymentIntent createPaymentIntent(Long amount, String currency, Integer orderId) throws StripeException {
        PaymentIntentCreateParams createParams = new PaymentIntentCreateParams.Builder()
                .setAmount(amount)
                .setCurrency(currency)
                .build();
        PaymentIntent paymentIntent = PaymentIntent.create(createParams);

        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus("PENDING");
        order.setIsPaid(false);
        orderRepository.save(order);

        return paymentIntent;
    }

    public void updateOrderStatus(String paymentIntentId) throws StripeException {
        PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
        String status = paymentIntent.getStatus();

        if ("succeeded".equals(status)) {
            // Find order by paymentIntentId and update status
            Order order = orderRepository.findByPaymentIntentId(paymentIntentId)
                    .orElseThrow(() -> new RuntimeException("Order not found"));
            order.setStatus("PAID");
            order.setIsPaid(true);
            orderRepository.save(order);
        }
    }
}
