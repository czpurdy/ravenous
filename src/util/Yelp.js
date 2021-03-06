const apiKey = "hxUPCigoYa7rPEhZQoNIX4SKZTEgB3k3n8asYU3MjEHfWbwfgrqXI6VUYWa1xamCzUkbJthBTWvukEuPldGTzEHEIjq4I4AL3CpyOhJw2u6q7GhvtIcG0FpKlcx7WnYx";
const Yelp = {
    search(term, location, sortBy) {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => ({
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories[0].title,
                    rating: business.rating,
                    reviewCount: business.review_count,
                    url: business.url
                })); // this is the code that super messed me up
            }
            throw new Error("Request failed!");
        }, networkError => console.log(networkError.messgage));
    }
};

export default Yelp;