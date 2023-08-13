# GroceWISE

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/7bbf9ee1d71f4bb9b99c41f4cd17ce2a?sid=65fa04c6-4592-428f-89d1-7d5eab33a1c0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

### 👉 **Description**

GroceWISE is a smart grocery companion, leveraging cutting-edge AI and machine learning. Log day to day purchases, and GroceWISE optimizes personalized recommendations for according to the shopping list. Anticipate future needs, discover popular items, and shop efficiently.

### Motivation
Many individuals struggle with organizing their grocery shopping, leading to inefficient trips, wasted time, and overlooked essential items. Users often lack personalized recommendations and real-time insights to optimize their shopping lists. Additionally, the challenge of tracking perishable items' shelf life and predicting future needs adds to the complexity of the shopping process. There is a need for a user-friendly grocery shopping app that leverages advanced AI and machine learning to offer personalized recommendations, track shelf life, and proactively suggest future purchases based on individual buying patterns. The app aims to streamline the grocery shopping experience, reduce waste, and empower users to make informed decisions, ensuring a seamless, efficient, and enjoyable shopping journey.

## Features
### 1\. User Registration and Authentication

-   Users can securely register an account or log in using their email or social media accounts.

### 2\. Add Items to Shopping List

-   Browse or search for grocery items in the app's extensive database.
-   Add items to your shopping list, indicating the quantity and optionally the price.

### 3\. Personalized Recommendations

-   AI and machine learning analyze your purchase history to provide tailored recommendations for frequently purchased items.

### 4\. Shopping List Management

-   View, edit, and remove items from your shopping list as needed.

### 5\. Price Customization

-   Adjust listed item prices or enter your own prices to accommodate variations in pricing.

### 6\. Shopping List Submission

-   Submit your finalized shopping lists for future reference or sharing with others.

How Supabase Supports These Features
------------------------------------

We've chosen Supabase as our backend to help us implement these features seamlessly:

-   User Registration and Authentication: Supabase provides secure authentication out of the box, making it easy for users to sign up and log in.

-   Data Storage: Supabase's Postgres database allows us to store user profiles, shopping lists, item details, and other relevant data.

-   Backend Logic: By utilizing Postgres functions, we can implement complex business logic directly within the database.

-   Real-time Updates: Supabase offers real-time functionality through websockets, ensuring users receive instant updates on their shopping lists, notifications, and recommendations.

-   Data Analysis: We can use Supabase's querying and analytics features to extract insights about user behavior and item popularity.

-   Scalability: As our user base grows, Supabase's scalable infrastructure ensures a smooth experience for all users.

-   Customization: Supabase allows us to tailor the database schema to our app's needs, enabling features like personalized recommendations and item customization.

Supabase empowers us to create a robust and feature-rich grocery shopping app that caters to our users' needs.
## How to setup grocewise in your local machine

1. Clone the repo
```bash
 git clone https://github.com/mirsahib/GroceWise.git
```
2. Make sure you have nodejs and npm installed
```
node -v
npm -v 
```
If you don't have nodejs install it from `https://nodejs.org/en`

3. Nextjs setup
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Demo
- [Video](https://www.loom.com/share/7bbf9ee1d71f4bb9b99c41f4cd17ce2a?sid=102373b3-4c7e-4591-95ce-a908098b91d6)
- [Webapp](https://groce-wise.vercel.app/)
## Team
- [mirsahib]()
- [Juan Carlos Manzanero Domínguez
](https://github.com/juancmandev)
- [Daniel Cunha](https://github.com/danicunhac)