package com.example.demo.controller;

import com.example.demo.entity.Cart;
import com.example.demo.entity.User;
import com.example.demo.service.AuthService;
import com.example.demo.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private AuthService authService;

    private User getAuthenticatedUser(String token) {
        if (token == null || token.isEmpty()) throw new RuntimeException("Unauthorized");
        return authService.getUserByToken(token.replace("Bearer ", ""));
    }

    @GetMapping
    public ResponseEntity<?> getCart(@RequestHeader("Authorization") String token) {
        try {
            User user = getAuthenticatedUser(token);
            return ResponseEntity.ok(cartService.getCartByUser(user));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addItemToCart(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> payload) {
        try {
            User user = getAuthenticatedUser(token);
            Long menuItemId = Long.valueOf(payload.get("menuItemId").toString());
            Integer quantity = Integer.valueOf(payload.getOrDefault("quantity", 1).toString());
            return ResponseEntity.ok(cartService.addItemToCart(user, menuItemId, quantity));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/update/{cartItemId}")
    public ResponseEntity<?> updateQuantity(@RequestHeader("Authorization") String token, 
                                            @PathVariable Long cartItemId, 
                                            @RequestBody Map<String, Integer> payload) {
        try {
            User user = getAuthenticatedUser(token);
            return ResponseEntity.ok(cartService.updateItemQuantity(user, cartItemId, payload.get("quantity")));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(@RequestHeader("Authorization") String token) {
        try {
            User user = getAuthenticatedUser(token);
            return ResponseEntity.ok(cartService.clearCart(user));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }
}
