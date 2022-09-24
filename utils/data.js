export default {
    location: "745 Lincoln PI",
    creditCard: "5491",
    categories: [
        {
            id: 1,
            slug: "hot-dogs",
            label: "Hot Dogs",
            icon: require("../assets/images/catgories/hot-dog.png"),
        },
        {
            id: 2,
            slug: "salads",
            label: "Salads",
            icon: require("../assets/images/catgories/green-salad.png"),
        },
        {
            id: 3,
            slug: "burgers",
            label: "Burgers",
            icon: require("../assets/images/catgories/hamburger.png"),
        },
        {
            id: 4,
            slug: "pizza",
            label: "Pizza",
            icon: require("../assets/images/catgories/pizza.png"),
        },
        {
            id: 5,
            slug: "snacks",
            label: "Snacks",
            icon: require("../assets/images/catgories/popcorn.png"),
        },
        {
            id: 6,
            slug: "sushi",
            label: "Sushi",
            icon: require("../assets/images/catgories/sushi.png"),
        },
        {
            id: 7,
            slug: "donuts",
            label: "Donuts",
            icon: require("../assets/images/catgories/doughnut.png"),
        },
        {
            id: 8,
            slug: "drinks",
            label: "Drinks",
            icon: require("../assets/images/catgories/cup-with-straw.png"),
        },
    ],
    restaurant: [
        {
            id: 1,
            image: require("../assets/images/restaurants/restaurant1.jpg"),
            name: "Burger Story",
            minTime: 20,
            maxTime: 30,
            rating: 4.7,
            tags: [
                {
                    slug: "burgers",
                    label: "Burgers",
                },
                {
                    slug: "salads",
                    label: "Salads",
                },
                {
                    slug: "hot-dogs",
                    label: "Hot Dogs",
                },
            ],
        },
        {
            id: 2,
            image: require("../assets/images/restaurants/restaurant2.jpg"),
            name: "Hollywood Café",
            minTime: 15,
            maxTime: 25,
            rating: 4.5,
            tags: [
                {
                    slug: "burgers",
                    label: "Burgers",
                },
                {
                    slug: "drinks",
                    label: "Drinks",
                },
                {
                    slug: "hot-dogs",
                    label: "Hot-Dogs",
                },
            ],
        },
        {
            id: 3,
            image: require("../assets/images/restaurants/restaurant3.jpg"),
            name: "The Salad Life",
            minTime: 25,
            maxTime: 45,
            rating: 3.7,
            tags: [
                {
                    slug: "pizza",
                    label: "Pizza",
                },
                {
                    slug: "salads",
                    label: "Salads",
                },
                {
                    slug: "sushi",
                    label: "Sushi",
                },
            ],
        },
    ],
    foods: [
        {
            id: 1,
            image: require("../assets/images/foods/food1.png"),
            title: "Tomato Pasta",
            price: 12.35,
            description: "Italian pastas with tomatoes, provencal, herbs and basil",
            calories: 380.13,
        },
        {
            id: 2,
            image: require("../assets/images/foods/food2.png"),
            title: "Waldorf Salad",
            price: 22.35,
            description: "Made with leaves from ancient Greece",
            calories: 210.13,
        },
        {
            id: 3,
            image: require("../assets/images/foods/food3.png"),
            title: "Ramen noodles",
            price: 56.15,
            description: "Ichiraku-san sends his love with this Beatiful Noodles",
            calories: 516.13,
        },
        {
            id: 4,
            image: require("../assets/images/foods/food4.png"),
            title: "Poke",
            price: 156.15,
            description: "Hawaiian Poke is most likely the most nutritious meal on Earth",
            calories: 741.34,
        },
        {
            id: 5,
            image: require("../assets/images/foods/food5.png"),
            title: "Cilantro Salmon",
            price: 115.89,
            description: "Hawaiian Cilantro Salmon is so delicious, it can make you levitate!",
            calories: 741.34,
        },
    ],
};
