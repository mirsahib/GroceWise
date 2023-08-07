import pandas as pd
import random

def create_new_csv(input_csv_path, output_csv_path):
    # Read the given CSV data into a DataFrame
    df = pd.read_csv(input_csv_path)

    # Extract unique category names
    unique_categories = df['Category'].drop_duplicates()
    # Add a new 'shelf_life' column based on category values
    df['shelf_life'] = df['Category'].apply(lambda category: {
        'Fruits & Vegetables': 7,
        'Eggs, Meat & Fish': 60,
        'Foodgrains, Oil & Masala': 180,
        'Cleaning & Household': 730,
        'Beverages':180,
        'Bakery, Cakes & Dairy':30,
        'Beauty & Hygiene': 520,
        'Baby Care': 365
    }.get(category, None))

    df['id'] = range(1, len(df) + 1)

    # Select the desired columns
    new_df = df[['ProductName', 'Brand', 'Price', 'Image_Url', 'Category', 'shelf_life', 'id']]

    # Rename the columns as per the new CSV file requirements
    new_df.columns = ['title', 'brand', 'price', 'img_url', 'category', 'shelf_life', 'id']
    
    

    # Write the modified DataFrame to a new CSV file
    new_df.to_csv(output_csv_path, index=False)



def create_new_csv_rand_sample(input_csv_path, output_csv_path):
    # Read the given CSV data into a DataFrame
    df = pd.read_csv(input_csv_path)

    # Randomly select 500 rows
    random_rows = random.sample(range(len(df)), 500)
    df = df.iloc[random_rows]

    # Extract unique category names
    unique_categories = df['Category'].drop_duplicates()

    # Add a new 'shelf_life' column based on category values
    df['shelf_life'] = df['Category'].apply(lambda category: {
        'Fruits & Vegetables': 7,
        'Eggs, Meat & Fish': 60,
        'Foodgrains, Oil & Masala': 180,
        'Cleaning & Household': 730,
        'Beverages':180,
        'Bakery, Cakes & Dairy':30,
        'Beauty & Hygiene': 520,
        'Baby Care': 365
    }.get(category, None))

    # Add 'id' column with integer values
    df['id'] = range(1, len(df) + 1)

    # Select the desired columns
    new_df = df[['ProductName', 'Brand', 'Price', 'Image_Url', 'Category', 'shelf_life', 'id']]

    # Rename the columns as per the new CSV file requirements
    new_df.columns = ['title', 'brand', 'price', 'img_url', 'category', 'shelf_life', 'id']

    # Write the modified DataFrame to a new CSV file
    new_df.to_csv(output_csv_path, index=False)


# Example usage:
input_csv_path = '../dataset/BigBasket.csv'
output_csv_path = 'Update_BigBasket.csv'
#create_new_csv(input_csv_path, output_csv_path)
create_new_csv_rand_sample(input_csv_path, output_csv_path)