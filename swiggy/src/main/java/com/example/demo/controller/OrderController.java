package com.example.demo.controller;

import com.example.demo.entity.Order;
import com.example.demo.entity.User;
import com.example.demo.service.AuthService;
import com.example.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private AuthService authService;

    private User getAuthenticatedUser(String token) {
        if (token == null || token.isEmpty()) throw new RuntimeException("Unauthorized");
        return authService.getUserByToken(token.replace("Bearer ", ""));
    }

    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request) {
        try {
            User user = getAuthenticatedUser(token);
            String address = request.get("address");
            String paymentMethod = request.get("paymentMethod");
            Order order = orderService.placeOrder(user, address, paymentMethod);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getUserOrders(@RequestHeader("Authorization") String token) {
        try {
            User user = getAuthenticatedUser(token);
            List<Order> orders = orderService.getUserOrders(user);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }
}
