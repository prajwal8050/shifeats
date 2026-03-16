package com.example.demo.controller;

import com.example.demo.entity.Restaurant;
import com.example.demo.entity.MenuItem;
import com.example.demo.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin("*")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        return ResponseEntity.ok(restaurantService.getAllRestaurants());
    }

    @GetMapping("/all")
    public ResponseEntity<List<Restaurant>> getAllRestaurantsExplicit() {
        return ResponseEntity.ok(restaurantService.getAllRestaurants());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(restaurantService.getRestaurantById(id));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurants(@RequestParam String query) {
        return ResponseEntity.ok(restaurantService.searchRestaurants(query));
    }

    @GetMapping("/menu/search")
    public ResponseEntity<List<MenuItem>> searchMenuItems(@RequestParam String query) {
        return ResponseEntity.ok(restaurantService.searchMenuItems(query));
    }
    
    @GetMapping("/menu/{id}")
    public ResponseEntity<MenuItem> getMenuItemById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(restaurantService.getMenuItemById(id));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
