import pandas as pd
import random
from datetime import datetime, timedelta

def create_new_dataset(output_csv_path, num_rows):
    user_ids = ['1664a92b-6a53-43c0-88e0-aef242e54c73', 
                'efb92c5a-a65a-4ce4-8e66-f1c3b48049d3',
                '80862ed3-5024-46e6-b7ac-0d5435046a15']

    # Generate product list for the given user_id
    data = {
        'id': list(range(1, num_rows + 1)),
        'user_id': [random.choice(user_ids) for _ in range(num_rows)],
        'productlist': [[random.randint(1, 500) for _ in range(5)] for _ in range(num_rows)]
    }

    # Create a DataFrame from the generated data
    df = pd.DataFrame(data)

    # Generate random 'created_at' timestamps
    start_date = datetime(2023, 1, 1)
    df['created_at'] = [start_date + timedelta(days=random.randint(0, 365)) + 
                        timedelta(seconds=random.randint(0, 86400)) for _ in range(num_rows)]

    # Convert 'created_at' timestamps to YYYY-MM-DD format
    df['created_at'] = df['created_at'].dt.strftime('%Y-%m-%d')

    # Write the DataFrame to a new CSV file
    df.to_csv(output_csv_path, index=False)

# Example usage:
output_csv_path = '../dataset/shopping_list.csv'
num_rows = 500  # Number of rows in the dataset
create_new_dataset(output_csv_path, num_rows)
