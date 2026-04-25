import { useState } from "react";

const groceryData = [
  { id: 1, name: "Amul Full Cream Milk 1L", category: "Dairy", image: "🥛", prices: { Zepto: { price: 68, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 72, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 65, available: true, url: "https://blinkit.com" } } },
  { id: 2, name: "Amul Toned Milk 500ml", category: "Dairy", image: "🥛", prices: { Zepto: { price: 32, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 30, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 31, available: true, url: "https://blinkit.com" } } },
  { id: 3, name: "Amul Butter 500g", category: "Dairy", image: "🧈", prices: { Zepto: { price: 250, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 245, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 252, available: true, url: "https://blinkit.com" } } },
  { id: 4, name: "Amul Butter 100g", category: "Dairy", image: "🧈", prices: { Zepto: { price: 55, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 52, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 54, available: true, url: "https://blinkit.com" } } },
  { id: 5, name: "Amul Paneer 200g", category: "Dairy", image: "🧀", prices: { Zepto: { price: 85, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 80, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 83, available: true, url: "https://blinkit.com" } } },
  { id: 6, name: "Mother Dairy Curd 400g", category: "Dairy", image: "🥣", prices: { Zepto: { price: 45, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 42, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 44, available: true, url: "https://blinkit.com" } } },
  { id: 7, name: "Amul Cheese Slices 200g", category: "Dairy", image: "🧀", prices: { Zepto: { price: 110, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 105, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 108, available: false, url: "https://blinkit.com" } } },
  { id: 8, name: "Nestle Milk 1L", category: "Dairy", image: "🥛", prices: { Zepto: { price: 70, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 68, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 71, available: true, url: "https://blinkit.com" } } },
  { id: 9, name: "Amul Lassi 200ml", category: "Dairy", image: "🥤", prices: { Zepto: { price: 25, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 22, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 24, available: true, url: "https://blinkit.com" } } },
  { id: 10, name: "Amul Shrikhand 500g", category: "Dairy", image: "🍮", prices: { Zepto: { price: 110, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 105, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 108, available: true, url: "https://blinkit.com" } } },
  { id: 11, name: "Britannia Brown Bread", category: "Bakery", image: "🍞", prices: { Zepto: { price: 40, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 38, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 42, available: false, url: "https://blinkit.com" } } },
  { id: 12, name: "Britannia White Bread", category: "Bakery", image: "🍞", prices: { Zepto: { price: 35, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 33, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 36, available: true, url: "https://blinkit.com" } } },
  { id: 13, name: "Britannia Good Day Biscuit 200g", category: "Bakery", image: "🍪", prices: { Zepto: { price: 30, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 28, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 30, available: true, url: "https://blinkit.com" } } },
  { id: 14, name: "Parle-G Biscuit 800g", category: "Bakery", image: "🍪", prices: { Zepto: { price: 80, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 75, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 78, available: true, url: "https://blinkit.com" } } },
  { id: 15, name: "Hide & Seek Biscuit 120g", category: "Bakery", image: "🍪", prices: { Zepto: { price: 35, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 33, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 35, available: true, url: "https://blinkit.com" } } },
  { id: 16, name: "English Oven Multigrain Bread", category: "Bakery", image: "🍞", prices: { Zepto: { price: 55, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 52, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 54, available: true, url: "https://blinkit.com" } } },
  { id: 17, name: "Oreo Biscuit 300g", category: "Bakery", image: "🍪", prices: { Zepto: { price: 60, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 58, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 60, available: true, url: "https://blinkit.com" } } },
  { id: 18, name: "Marie Gold Biscuit 200g", category: "Bakery", image: "🍪", prices: { Zepto: { price: 25, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 22, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 24, available: true, url: "https://blinkit.com" } } },
  { id: 19, name: "Fortune Sunflower Oil 1L", category: "Oils", image: "🫙", prices: { Zepto: { price: 155, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 148, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 152, available: true, url: "https://blinkit.com" } } },
  { id: 20, name: "Fortune Sunflower Oil 5L", category: "Oils", image: "🫙", prices: { Zepto: { price: 720, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 699, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 710, available: true, url: "https://blinkit.com" } } },
  { id: 21, name: "Saffola Gold Oil 1L", category: "Oils", image: "🫙", prices: { Zepto: { price: 175, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 168, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 172, available: true, url: "https://blinkit.com" } } },
  { id: 22, name: "Dhara Mustard Oil 1L", category: "Oils", image: "🫙", prices: { Zepto: { price: 165, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 158, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 162, available: false, url: "https://blinkit.com" } } },
  { id: 23, name: "Olive Oil 500ml", category: "Oils", image: "🫙", prices: { Zepto: { price: 350, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 340, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 345, available: true, url: "https://blinkit.com" } } },
  { id: 24, name: "Coconut Oil 500ml", category: "Oils", image: "🫙", prices: { Zepto: { price: 180, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 175, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 178, available: true, url: "https://blinkit.com" } } },
  { id: 25, name: "Tata Salt 1kg", category: "Spices", image: "🧂", prices: { Zepto: { price: 24, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 22, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 24, available: true, url: "https://blinkit.com" } } },
  { id: 26, name: "MDH Chana Masala 100g", category: "Spices", image: "🌶️", prices: { Zepto: { price: 55, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 52, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 54, available: true, url: "https://blinkit.com" } } },
  { id: 27, name: "MDH Garam Masala 100g", category: "Spices", image: "🌶️", prices: { Zepto: { price: 65, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 60, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 62, available: true, url: "https://blinkit.com" } } },
  { id: 28, name: "Everest Turmeric Powder 100g", category: "Spices", image: "🌶️", prices: { Zepto: { price: 45, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 42, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 44, available: true, url: "https://blinkit.com" } } },
  { id: 29, name: "Catch Red Chilli Powder 100g", category: "Spices", image: "🌶️", prices: { Zepto: { price: 48, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 45, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 47, available: true, url: "https://blinkit.com" } } },
  { id: 30, name: "MDH Rajma Masala 100g", category: "Spices", image: "🌶️", prices: { Zepto: { price: 55, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 50, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 53, available: true, url: "https://blinkit.com" } } },
  { id: 31, name: "Aashirvaad Atta 5kg", category: "Grains", image: "🌾", prices: { Zepto: { price: 280, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 275, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 285, available: false, url: "https://blinkit.com" } } },
  { id: 32, name: "Aashirvaad Atta 10kg", category: "Grains", image: "🌾", prices: { Zepto: { price: 540, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 520, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 535, available: true, url: "https://blinkit.com" } } },
  { id: 33, name: "Basmati Rice 5kg", category: "Grains", image: "🍚", prices: { Zepto: { price: 420, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 399, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 415, available: true, url: "https://blinkit.com" } } },
  { id: 34, name: "India Gate Basmati Rice 1kg", category: "Grains", image: "🍚", prices: { Zepto: { price: 110, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 105, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 108, available: true, url: "https://blinkit.com" } } },
  { id: 35, name: "Tata Sampann Toor Dal 1kg", category: "Grains", image: "🫘", prices: { Zepto: { price: 145, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 138, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 142, available: true, url: "https://blinkit.com" } } },
  { id: 36, name: "Tata Sampann Moong Dal 1kg", category: "Grains", image: "🫘", prices: { Zepto: { price: 130, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 125, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 128, available: true, url: "https://blinkit.com" } } },
  { id: 37, name: "Chana Dal 1kg", category: "Grains", image: "🫘", prices: { Zepto: { price: 95, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 90, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 92, available: true, url: "https://blinkit.com" } } },
  { id: 38, name: "Urad Dal 1kg", category: "Grains", image: "🫘", prices: { Zepto: { price: 120, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 115, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 118, available: true, url: "https://blinkit.com" } } },
  { id: 39, name: "Poha 500g", category: "Grains", image: "🌾", prices: { Zepto: { price: 45, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 42, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 44, available: true, url: "https://blinkit.com" } } },
  { id: 40, name: "Sooji 500g", category: "Grains", image: "🌾", prices: { Zepto: { price: 35, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 32, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 34, available: true, url: "https://blinkit.com" } } },
  { id: 41, name: "Nescafe Classic Coffee 50g", category: "Beverages", image: "☕", prices: { Zepto: { price: 199, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 189, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 195, available: true, url: "https://blinkit.com" } } },
  { id: 42, name: "Tropicana Orange Juice 1L", category: "Beverages", image: "🍊", prices: { Zepto: { price: 120, available: false, url: "https://www.zeptonow.com" }, BigBasket: { price: 115, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 118, available: true, url: "https://blinkit.com" } } },
  { id: 43, name: "Real Fruit Juice Mixed 1L", category: "Beverages", image: "🧃", prices: { Zepto: { price: 99, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 95, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 98, available: true, url: "https://blinkit.com" } } },
  { id: 44, name: "Tata Tea Gold 500g", category: "Beverages", image: "🍵", prices: { Zepto: { price: 250, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 240, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 245, available: true, url: "https://blinkit.com" } } },
  { id: 45, name: "Red Bull Energy Drink 250ml", category: "Beverages", image: "🥤", prices: { Zepto: { price: 125, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 120, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 122, available: true, url: "https://blinkit.com" } } },
  { id: 46, name: "Coca Cola 2L", category: "Beverages", image: "🥤", prices: { Zepto: { price: 95, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 90, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 92, available: true, url: "https://blinkit.com" } } },
  { id: 47, name: "Sprite 2L", category: "Beverages", image: "🥤", prices: { Zepto: { price: 95, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 88, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 92, available: true, url: "https://blinkit.com" } } },
  { id: 48, name: "Bournvita 500g", category: "Beverages", image: "☕", prices: { Zepto: { price: 220, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 210, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 215, available: true, url: "https://blinkit.com" } } },
  { id: 49, name: "Horlicks 500g", category: "Beverages", image: "☕", prices: { Zepto: { price: 235, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 225, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 230, available: true, url: "https://blinkit.com" } } },
  { id: 50, name: "Maggi Noodles 12 Pack", category: "Snacks", image: "🍜", prices: { Zepto: { price: 144, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 138, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 144, available: true, url: "https://blinkit.com" } } },
  { id: 51, name: "Haldiram Aloo Bhujia 400g", category: "Snacks", image: "🥨", prices: { Zepto: { price: 110, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 105, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 108, available: true, url: "https://blinkit.com" } } },
  { id: 52, name: "Lays Classic Chips 73g", category: "Snacks", image: "🥔", prices: { Zepto: { price: 20, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 20, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 20, available: true, url: "https://blinkit.com" } } },
  { id: 53, name: "Kurkure Masala Munch 100g", category: "Snacks", image: "🌽", prices: { Zepto: { price: 25, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 23, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 25, available: true, url: "https://blinkit.com" } } },
  { id: 54, name: "Bingo Mad Angles 130g", category: "Snacks", image: "🌽", prices: { Zepto: { price: 30, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 28, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 30, available: true, url: "https://blinkit.com" } } },
  { id: 55, name: "Haldiram Mixture 400g", category: "Snacks", image: "🥨", prices: { Zepto: { price: 95, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 90, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 92, available: true, url: "https://blinkit.com" } } },
  { id: 56, name: "Pringles Original 107g", category: "Snacks", image: "🥔", prices: { Zepto: { price: 149, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 140, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 145, available: true, url: "https://blinkit.com" } } },
  { id: 57, name: "Dettol Handwash 200ml", category: "Personal Care", image: "🧴", prices: { Zepto: { price: 89, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 85, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 92, available: false, url: "https://blinkit.com" } } },
  { id: 58, name: "Lifebuoy Soap 100g", category: "Personal Care", image: "🧼", prices: { Zepto: { price: 38, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 35, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 37, available: true, url: "https://blinkit.com" } } },
  { id: 59, name: "Colgate Toothpaste 200g", category: "Personal Care", image: "🪥", prices: { Zepto: { price: 99, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 95, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 98, available: true, url: "https://blinkit.com" } } },
  { id: 60, name: "Head & Shoulders Shampoo 340ml", category: "Personal Care", image: "🧴", prices: { Zepto: { price: 299, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 285, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 292, available: true, url: "https://blinkit.com" } } },
  { id: 61, name: "Dove Body Wash 250ml", category: "Personal Care", image: "🧴", prices: { Zepto: { price: 185, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 178, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 182, available: true, url: "https://blinkit.com" } } },
  { id: 62, name: "Gillette Shaving Gel 200g", category: "Personal Care", image: "🪒", prices: { Zepto: { price: 180, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 172, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 176, available: true, url: "https://blinkit.com" } } },
  { id: 63, name: "Whisper Pads 15 Count", category: "Personal Care", image: "🛍️", prices: { Zepto: { price: 65, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 60, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 63, available: true, url: "https://blinkit.com" } } },
  { id: 64, name: "Surf Excel Detergent 1kg", category: "Household", image: "🧺", prices: { Zepto: { price: 175, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 168, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 172, available: true, url: "https://blinkit.com" } } },
  { id: 65, name: "Ariel Detergent 2kg", category: "Household", image: "🧺", prices: { Zepto: { price: 320, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 305, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 315, available: true, url: "https://blinkit.com" } } },
  { id: 66, name: "Vim Dishwash Liquid 500ml", category: "Household", image: "🍽️", prices: { Zepto: { price: 95, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 90, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 93, available: true, url: "https://blinkit.com" } } },
  { id: 67, name: "Harpic Toilet Cleaner 500ml", category: "Household", image: "🧹", prices: { Zepto: { price: 115, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 110, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 112, available: true, url: "https://blinkit.com" } } },
  { id: 68, name: "Colin Glass Cleaner 500ml", category: "Household", image: "🪟", prices: { Zepto: { price: 99, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 95, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 97, available: false, url: "https://blinkit.com" } } },
  { id: 69, name: "Good Knight Mosquito Coil", category: "Household", image: "🌀", prices: { Zepto: { price: 45, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 42, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 44, available: true, url: "https://blinkit.com" } } },
  { id: 70, name: "Lizol Floor Cleaner 500ml", category: "Household", image: "🧹", prices: { Zepto: { price: 125, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 118, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 122, available: true, url: "https://blinkit.com" } } },
  { id: 71, name: "Tomato 1kg", category: "Vegetables", image: "🍅", prices: { Zepto: { price: 35, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 30, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 33, available: true, url: "https://blinkit.com" } } },
  { id: 72, name: "Onion 1kg", category: "Vegetables", image: "🧅", prices: { Zepto: { price: 40, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 35, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 38, available: true, url: "https://blinkit.com" } } },
  { id: 73, name: "Potato 1kg", category: "Vegetables", image: "🥔", prices: { Zepto: { price: 28, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 25, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 27, available: true, url: "https://blinkit.com" } } },
  { id: 74, name: "Capsicum 250g", category: "Vegetables", image: "🫑", prices: { Zepto: { price: 35, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 30, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 32, available: true, url: "https://blinkit.com" } } },
  { id: 75, name: "Spinach 250g", category: "Vegetables", image: "🥬", prices: { Zepto: { price: 25, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 22, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 24, available: true, url: "https://blinkit.com" } } },
  { id: 76, name: "Carrot 500g", category: "Vegetables", image: "🥕", prices: { Zepto: { price: 30, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 28, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 29, available: true, url: "https://blinkit.com" } } },
  { id: 77, name: "Garlic 100g", category: "Vegetables", image: "🧄", prices: { Zepto: { price: 25, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 22, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 24, available: true, url: "https://blinkit.com" } } },
  { id: 78, name: "Ginger 100g", category: "Vegetables", image: "🫚", prices: { Zepto: { price: 20, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 18, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 19, available: true, url: "https://blinkit.com" } } },
  { id: 79, name: "Broccoli 500g", category: "Vegetables", image: "🥦", prices: { Zepto: { price: 65, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 60, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 62, available: false, url: "https://blinkit.com" } } },
  { id: 80, name: "Cauliflower 1 piece", category: "Vegetables", image: "🥦", prices: { Zepto: { price: 40, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 35, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 38, available: true, url: "https://blinkit.com" } } },
  { id: 81, name: "Banana 6 pieces", category: "Fruits", image: "🍌", prices: { Zepto: { price: 35, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 30, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 32, available: true, url: "https://blinkit.com" } } },
  { id: 82, name: "Apple 1kg", category: "Fruits", image: "🍎", prices: { Zepto: { price: 160, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 150, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 155, available: true, url: "https://blinkit.com" } } },
  { id: 83, name: "Orange 4 pieces", category: "Fruits", image: "🍊", prices: { Zepto: { price: 60, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 55, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 58, available: true, url: "https://blinkit.com" } } },
  { id: 84, name: "Watermelon 1 piece", category: "Fruits", image: "🍉", prices: { Zepto: { price: 80, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 75, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 78, available: true, url: "https://blinkit.com" } } },
  { id: 85, name: "Grapes 500g", category: "Fruits", image: "🍇", prices: { Zepto: { price: 70, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 65, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 68, available: true, url: "https://blinkit.com" } } },
  { id: 86, name: "Mango 1kg", category: "Fruits", image: "🥭", prices: { Zepto: { price: 120, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 110, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 115, available: false, url: "https://blinkit.com" } } },
  { id: 87, name: "Pomegranate 1 piece", category: "Fruits", image: "🍎", prices: { Zepto: { price: 80, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 75, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 78, available: true, url: "https://blinkit.com" } } },
  { id: 88, name: "Chicken Breast 500g", category: "Meat", image: "🍗", prices: { Zepto: { price: 175, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 168, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 172, available: true, url: "https://blinkit.com" } } },
  { id: 89, name: "Eggs 12 Pack", category: "Meat", image: "🥚", prices: { Zepto: { price: 78, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 72, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 75, available: true, url: "https://blinkit.com" } } },
  { id: 90, name: "Fish Rohu 500g", category: "Meat", image: "🐟", prices: { Zepto: { price: 140, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 132, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 136, available: false, url: "https://blinkit.com" } } },
  { id: 91, name: "Frozen Peas 500g", category: "Frozen", image: "🫛", prices: { Zepto: { price: 65, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 60, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 62, available: true, url: "https://blinkit.com" } } },
  { id: 92, name: "McCain French Fries 420g", category: "Frozen", image: "🍟", prices: { Zepto: { price: 180, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 170, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 175, available: true, url: "https://blinkit.com" } } },
  { id: 93, name: "Kwality Walls Ice Cream 700ml", category: "Frozen", image: "🍦", prices: { Zepto: { price: 220, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 210, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 215, available: true, url: "https://blinkit.com" } } },
  { id: 94, name: "Cadbury Dairy Milk 150g", category: "Sweets", image: "🍫", prices: { Zepto: { price: 99, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 95, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 98, available: true, url: "https://blinkit.com" } } },
  { id: 95, name: "KitKat 4 Finger 41.5g", category: "Sweets", image: "🍫", prices: { Zepto: { price: 30, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 28, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 30, available: true, url: "https://blinkit.com" } } },
  { id: 96, name: "5 Star Chocolate 40g", category: "Sweets", image: "🍫", prices: { Zepto: { price: 20, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 18, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 20, available: true, url: "https://blinkit.com" } } },
  { id: 97, name: "Hajmola Candy 120 pieces", category: "Sweets", image: "🍬", prices: { Zepto: { price: 55, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 50, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 52, available: true, url: "https://blinkit.com" } } },
  { id: 98, name: "Patanjali Honey 500g", category: "Sweets", image: "🍯", prices: { Zepto: { price: 175, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 165, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 170, available: true, url: "https://blinkit.com" } } },
  { id: 99, name: "Kissan Jam Mixed Fruit 500g", category: "Sweets", image: "🍓", prices: { Zepto: { price: 120, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 115, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 118, available: true, url: "https://blinkit.com" } } },
  { id: 100, name: "Nutella 350g", category: "Sweets", image: "🫙", prices: { Zepto: { price: 380, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 365, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 372, available: true, url: "https://blinkit.com" } } },
  { id: 101, name: "Catch Pepper Powder 50g", category: "Spices", image: "🌶️", prices: { Zepto: { price: 42, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 38, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 40, available: true, url: "https://blinkit.com" } } },
  { id: 102, name: "Sunrise Mustard Seeds 100g", category: "Spices", image: "🌶️", prices: { Zepto: { price: 22, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 20, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 21, available: true, url: "https://blinkit.com" } } },
  { id: 103, name: "Parachute Coconut Oil 200ml", category: "Oils", image: "🫙", prices: { Zepto: { price: 95, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 90, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 92, available: true, url: "https://blinkit.com" } } },
  { id: 104, name: "Dabur Chyawanprash 500g", category: "Health", image: "💊", prices: { Zepto: { price: 265, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 255, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 260, available: true, url: "https://blinkit.com" } } },
  { id: 105, name: "Revital Multivitamin 30 tabs", category: "Health", image: "💊", prices: { Zepto: { price: 199, available: true, url: "https://www.zeptonow.com" }, BigBasket: { price: 190, available: true, url: "https://www.bigbasket.com" }, Blinkit: { price: 195, available: false, url: "https://blinkit.com" } } },
];

const platformColors = {
  Zepto: { bg: "#8b5cf6", light: "#ede9fe", text: "#5b21b6" },
  BigBasket: { bg: "#22c55e", light: "#dcfce7", text: "#15803d" },
  Blinkit: { bg: "#eab308", light: "#fef9c3", text: "#854d0e" },
};

const categories = ["All", ...new Set(groceryData.map((p) => p.category))];

function getCheapest(prices) {
  let min = Infinity, platform = null;
  for (const [p, v] of Object.entries(prices)) {
    if (v.available && v.price < min) { min = v.price; platform = p; }

   
    
  }
  return platform;
}

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = groceryData.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)", color: "white", padding: "24px 0", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <span style={{ fontSize: 36 }}>🛒</span>
            <div>
              <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>GroceryCompare</h1>
              <p style={{ margin: 0, fontSize: 13, opacity: 0.7 }}>Compare prices across Zepto, BigBasket & Blinkit</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
            {Object.entries(platformColors).map(([name, c]) => (
              <span key={name} style={{ background: c.bg, color: "white", padding: "4px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>{name}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px 0" }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍  Search grocery products..."
            style={{ flex: 1, minWidth: 220, padding: "12px 18px", borderRadius: 12, border: "2px solid #e2e8f0", fontSize: 15, outline: "none", background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: "12px 18px", borderRadius: 12, border: "2px solid #e2e8f0", fontSize: 15, background: "white", cursor: "pointer", outline: "none" }}
          >
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <p style={{ color: "#64748b", fontSize: 14, marginBottom: 16 }}>{filtered.length} products found</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20, paddingBottom: 40 }}>
          {filtered.map((product) => {
            const cheapest = getCheapest(product.prices);
            return (
              <div key={product.id} style={{ background: "white", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden", border: "1px solid #f1f5f9", transition: "transform 0.15s, box-shadow 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)"; }}
              >
                <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 36 }}>{product.image}</span>
                    <div>
                      <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1e293b", lineHeight: 1.3 }}>{product.name}</h3>
                      <span style={{ fontSize: 12, color: "#94a3b8", background: "#f1f5f9", padding: "2px 8px", borderRadius: 6, marginTop: 4, display: "inline-block" }}>{product.category}</span>
                    </div>
                  </div>
                </div>

                <div style={{ padding: "14px 20px" }}>
                  {Object.entries(product.prices).map(([platform, data]) => {
                    const isCheap = platform === cheapest;
                    const c = platformColors[platform];
                    return (
                      <div key={platform} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: 10, marginBottom: 8, background: isCheap ? c.light : "#f8fafc", border: isCheap ? `2px solid ${c.bg}` : "2px solid transparent" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ width: 10, height: 10, borderRadius: "50%", background: c.bg, display: "inline-block" }}></span>
                          <span style={{ fontWeight: 600, fontSize: 14, color: "#334155" }}>{platform}</span>
                          {isCheap && <span style={{ fontSize: 11, background: c.bg, color: "white", padding: "1px 7px", borderRadius: 10, fontWeight: 700 }}>CHEAPEST</span>}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          {data.available ? (
                            <>
                              <span style={{ fontWeight: 800, fontSize: 16, color: isCheap ? c.text : "#1e293b" }}>₹{data.price}</span>
                              <a href={data.url} target="_blank" rel="noreferrer" style={{ fontSize: 12, background: c.bg, color: "white", padding: "4px 10px", borderRadius: 8, textDecoration: "none", fontWeight: 600 }}>Buy</a>
                            </>
                          ) : (
                            <span style={{ fontSize: 12, color: "#94a3b8", fontStyle: "italic" }}>Unavailable</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
               
                



                {cheapest && (() => {
                  const prices = Object.values(product.prices).filter(v => v.available).map(v => v.price);
                  const max = Math.max(...prices);
                  const min = Math.min(...prices);
                  const saving = max - min;
                  return saving > 0 ? (
                    <div style={{ margin: "0 20px 16px", padding: "8px 12px", background: "#f0fdf4", borderRadius: 8, textAlign: "center" }}>
                      <span style={{ fontSize: 13, color: "#15803d", fontWeight: 600 }}>💰 Save up to ₹{saving} by choosing {cheapest}</span>
                    </div>
                  ) : null;
                })()}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
            <div style={{ fontSize: 48 }}>🔍</div>
            <p style={{ fontSize: 18, marginTop: 12 }}>No products found for "{search}"</p>
          </div>
        )}
      </div>

      <div style={{ background: "#1e293b", color: "#94a3b8", textAlign: "center", padding: "20px", fontSize: 13 }}>
        <p style={{ margin: 0 }}>🛒 GroceryCompare — IIST Minor Project | Sourabh, Tanisha, Sachin, Sonali</p>
      </div>
    </div>
  );