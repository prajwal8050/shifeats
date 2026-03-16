package com.example.demo;

import com.example.demo.entity.MenuItem;
import com.example.demo.entity.Restaurant;
import com.example.demo.repository.MenuItemRepository;
import com.example.demo.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Override
    public void run(String... args) throws Exception {
        try {
            long count = restaurantRepository.count();
            System.out.println("DEBUG: Current restaurant count: " + count);
            if (count < 5) {
                System.out.println("DEBUG: Seeding database with realistic Swiggy-like data...");

                // 1. Nandhana Palace
                Restaurant nandhana = new Restaurant();
                nandhana.setName("Nandhana Palace");
                nandhana.setRating(4.4);
                nandhana.setDeliveryTime("25-30 mins");
                nandhana.setCuisine("Biryani, Andhra, South Indian");
                nandhana.setLocation("Residency Road");
                nandhana.setImage("images/nandhana-palace.png");
                nandhana.setOffer("50% OFF UPTO ₹100");
                restaurantRepository.save(nandhana);

                menuItemRepository.saveAll(Arrays.asList(
                    createMenuItem("Nandhana Special Biryani", "Authentic Andhra Spicy Chicken Biryani", 320.0, "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/7f3a9a5f4d454d4f87a8b83984e03f56", "Biryani", nandhana),
                    createMenuItem("Nellore Chicken Curry", "Spicy Nellore style chicken", 280.0, "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/8e85848d5b1b4d0897d8c6d3d4b9b9c9", "Curry", nandhana),
                    createMenuItem("Amaravathi Chicken Fry", "Andhra style deep fried chicken", 310.0, "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/6683f064c5828ed7df9d28d022b31121", "Starter", nandhana),
                    createMenuItem("Andhra Veg Meal", "Traditional Andhra platter with pappu, sambar, and curries", 250.0, "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/7f3a9a5f4d454d4f87a8b83984e03f56", "Meals", nandhana)
                ));

                // 2. KFC
                Restaurant kfc = new Restaurant();
                kfc.setName("KFC");
                kfc.setRating(4.3);
                kfc.setDeliveryTime("25-30 mins");
                kfc.setCuisine("Burgers, Fast Food, Rolls & Wraps");
                kfc.setLocation("Koramangala");
                kfc.setImage("https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/56c9ab92bd79745fd152a30fa2525426");
                kfc.setOffer("40% OFF UPTO ₹80");
                restaurantRepository.save(kfc);

                menuItemRepository.saveAll(Arrays.asList(
                    createMenuItem("Zinger Burger", "Classic KFC Zinger Burger", 180.0, "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/RX_THUMBNAIL/IMAGES/VENDOR/2024/4/17/5d0c595a-dfb2-472b-8eb0-c449f0b2a6c3_432976.JPG", "Burger", kfc),
                    createMenuItem("Hot & Crispy Chicken", "2 pcs hot & crispy fried chicken", 220.0, "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/RX_THUMBNAIL/IMAGES/VENDOR/2024/4/17/74026330-81f7-48f8-842b-e4a9e52d3a3c_432976.JPG", "Chicken", kfc),
                    createMenuItem("Popcorn Chicken", "Small pieces of crispy fried chicken", 150.0, "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/RX_THUMBNAIL/IMAGES/VENDOR/2024/4/17/6344275f-3d60-4493-9c8e-360f38b53e8d_432976.JPG", "Chicken", kfc),
                    createMenuItem("Chicken Rice Bowl", "Spicy chicken with rice and gravy", 190.0, "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/RX_THUMBNAIL/IMAGES/VENDOR/2024/4/17/5d0c595a-dfb2-472b-8eb0-c449f0b2a6c3_432976.JPG", "Meals", kfc)
                ));

                // 3. Domino's Pizza
                Restaurant dominos = new Restaurant();
                dominos.setName("Domino's Pizza");
                dominos.setRating(4.2);
                dominos.setDeliveryTime("20-25 mins");
                dominos.setCuisine("Pizzas, Italian, Pastas, Desserts");
                dominos.setLocation("Indiranagar");
                dominos.setImage("https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/d0450ce1a6ba19ea60cd724471ed54a8");
                dominos.setOffer("FREE DELIVERY");
                restaurantRepository.save(dominos);

                menuItemRepository.saveAll(Arrays.asList(
                    createMenuItem("Margherita Pizza", "Classic cheese and tomato", 150.0, "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/jzhsz7tstx0mslygcl2z", "Pizza", dominos),
                    createMenuItem("Pepperoni Pizza", "Loaded with pepperoni", 300.0, "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/exd0j9a5099okw9l0n7o", "Pizza", dominos),
                    createMenuItem("Farmhouse Pizza", "Delightful combination of onion, capsicum, tomato & mushroom", 280.0, "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/v1260787258/Farmhouse.jpg", "Pizza", dominos),
                    createMenuItem("Garlic Breadsticks", "Freshly baked bread with garlic butter", 99.0, "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/garlic_bread", "Sides", dominos)
                ));

                // 4. McDonald's
                Restaurant mcd = new Restaurant();
                mcd.setName("McDonald's");
                mcd.setRating(4.4);
                mcd.setDeliveryTime("25-30 mins");
                mcd.setCuisine("Burgers, Beverages, Cafe, Desserts");
                mcd.setLocation("MG Road");
                mcd.setImage("https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/ee5f8e06b300efc07c9fe3f4df40dfc4");
                mcd.setOffer("₹125 OFF ABOVE ₹349");
                restaurantRepository.save(mcd);

                menuItemRepository.saveAll(Arrays.asList(
                    createMenuItem("McAloo Tikki Burger", "Golden fried potato patty with spices", 75.0, "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/RX_THUMBNAIL/IMAGES/VENDOR/2024/4/17/ab9280a3-4809-4786-81e1-c89bdf1c5306_22452.JPG", "Burger", mcd),
                    createMenuItem("Maharaja Mac", "Tallest burger with doubleveg/chicken patties", 210.0, "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/RX_THUMBNAIL/IMAGES/VENDOR/2024/4/17/c97a858e-0f72-466d-85ca-829dce53c07e_22452.JPG", "Burger", mcd),
                    createMenuItem("McSpicy Chicken Burger", "Tender chicken patty with spicy creamy sauce", 185.0, "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/RX_THUMBNAIL/IMAGES/VENDOR/2024/4/17/5a0c325d-256d-4672-970f-155799732782_22452.JPG", "Burger", mcd),
                    createMenuItem("French Fries (L)", "World famous crispy golden fries", 110.0, "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/RX_THUMBNAIL/IMAGES/VENDOR/2024/4/17/c9e1e19d-7c5a-4702-864a-380d0d826a79_22452.JPG", "Sides", mcd)
                ));

                // 5. Truffles
                Restaurant truffles = new Restaurant();
                truffles.setName("Truffles");
                truffles.setRating(4.6);
                truffles.setDeliveryTime("35-40 mins");
                truffles.setCuisine("American, Continental, Desserts");
                truffles.setLocation("Koramangala");
                truffles.setImage("https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/cd832b6167eb9f88aeb1ccdebf38d942");
                truffles.setOffer("20% OFF UPTO ₹50");
                restaurantRepository.save(truffles);

                menuItemRepository.saveAll(Arrays.asList(
                    createMenuItem("All American Cheeseburger", "Juicy beef/veg patty with cheddar cheese", 250.0, "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/RX_THUMBNAIL/IMAGES/VENDOR/2024/4/1/cd832b6167eb9f88aeb1ccdebf38d942_main.JPG", "Burger", truffles),
                    createMenuItem("Truffles Special Pasta", "Creamy white sauce pasta with herbs", 320.0, "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/RX_THUMBNAIL/IMAGES/VENDOR/2024/4/1/cd832b6167eb9f88aeb1ccdebf38d942_pasta.JPG", "Pasta", truffles),
                    createMenuItem("Peri Peri Fries", "Crispy fries tossed in peri peri spice", 140.0, "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/RX_THUMBNAIL/IMAGES/VENDOR/2024/4/1/cd832b6167eb9f88aeb1ccdebf38d942_fries.JPG", "Sides", truffles)
                ));

                // 6. Empire Restaurant
                Restaurant empire = new Restaurant();
                empire.setName("Empire Restaurant");
                empire.setRating(4.4);
                empire.setDeliveryTime("30-35 mins");
                empire.setCuisine("North Indian, Biryani, Kebabs");
                empire.setLocation("Church Street");
                empire.setImage("https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/10f8b483521b9359d9c8fcd37f23c9d3");
                empire.setOffer("30% OFF UPTO ₹75");
                restaurantRepository.save(empire);

                menuItemRepository.saveAll(Arrays.asList(
                    createMenuItem("Empire Special Chicken Kabab", "Deep fried chicken with secret spices", 240.0, "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/RX_THUMBNAIL/IMAGES/VENDOR/2024/4/1/10f8b483521b9359d9c8fcd37f23c9d3_kabab.JPG", "Starter", empire),
                    createMenuItem("Ghee Rice", "Fragrant rice cooked in pure ghee", 180.0, "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/RX_THUMBNAIL/IMAGES/VENDOR/2024/4/1/10f8b483521b9359d9c8fcd37f23c9d3_ghee.JPG", "Main Course", empire),
                    createMenuItem("Mutton Biryani", "Succulent mutton with fragrant rice", 350.0, "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/RX_THUMBNAIL/IMAGES/VENDOR/2024/4/1/10f8b483521b9359d9c8fcd37f23c9d3_biryani.JPG", "Biryani", empire)
                ));

                // 7. Burger King
                Restaurant bk = new Restaurant();
                bk.setName("Burger King");
                bk.setRating(4.1);
                bk.setDeliveryTime("25-30 mins");
                bk.setCuisine("Burgers, American");
                bk.setLocation("Whitefield");
                bk.setImage("images/burger-king.png");
                bk.setOffer("50% OFF");
                restaurantRepository.save(bk);

                menuItemRepository.saveAll(Arrays.asList(
                    createMenuItem("Veg Whopper", "Signature plant-based patty burger", 169.0, "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/RX_THUMBNAIL/IMAGES/VENDOR/2024/4/1/52e92027-e9a6-4876-905e-855c65f1e85f_23678.JPG", "Burger", bk),
                    createMenuItem("Crispy Chicken Burger", "Crunchy chicken patty with mayo", 149.0, "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/RX_THUMBNAIL/IMAGES/VENDOR/2024/4/1/cb52a65a-6fa8-48b4-a481-9b160b7306fd_23678.JPG", "Burger", bk)
                ));

                // 8. Subway
                Restaurant subway = new Restaurant();
                subway.setName("Subway");
                subway.setRating(4.2);
                subway.setDeliveryTime("20-25 mins");
                subway.setCuisine("Healthy Food, Salads, Snacks");
                subway.setLocation("HSR Layout");
                subway.setImage("https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/63178e3e64d503a479f2a2048a474552");
                subway.setOffer("BUY 1 GET 1");
                restaurantRepository.save(subway);

                menuItemRepository.saveAll(Arrays.asList(
                    createMenuItem("Paneer Tikka Sub", "Sub with spicy paneer tikka", 210.0, "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/RX_THUMBNAIL/IMAGES/VENDOR/2024/4/1/55b34d70-a33d-4c57-885f-83a37d6e60b1_10204.JPG", "Sandwich", subway),
                    createMenuItem("Roasted Chicken Sub", "Sub with slow roasted chicken", 240.0, "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/f9864a7c-6fa1-4560-b6a8-a6d57b542861_10204.JPG", "Sandwich", subway)
                ));

                System.out.println("DEBUG: Seeding completed successfully.");
            } else {
                System.out.println("DEBUG: Skipping seeding, data already exists.");
            }

            // Force update specific images
            restaurantRepository.findAll().forEach(r -> {
                if (r.getName().equalsIgnoreCase("Nandhana Palace")) {
                    r.setImage("images/nandhana-palace.png");
                    restaurantRepository.save(r);
                } else if (r.getName().equalsIgnoreCase("Burger King")) {
                    r.setImage("images/burger-king.png");
                    restaurantRepository.save(r);
                }
            });
            System.out.println("DEBUG: Forced image updates complete.");
        } catch (Exception e) {
            System.err.println("DEBUG: SEEDING FAILED: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private MenuItem createMenuItem(String name, String description, Double price, String image, String category, Restaurant restaurant) {
        MenuItem item = new MenuItem();
        item.setName(name);
        item.setDescription(description);
        item.setPrice(price);
        item.setImage(image);
        item.setCategory(category);
        item.setRestaurant(restaurant);
        return item;
    }
}
