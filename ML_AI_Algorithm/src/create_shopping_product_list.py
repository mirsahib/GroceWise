import pandas as pd
import random

def generate_csv(filename, num_rows):
    data = []
    
    for id in range(1, num_rows + 1):
        shoppinglist_id = random.randint(1, 500)
        product_id = random.randint(1, 500)
        
        data.append({
            'id': id,
            'shopping_list_id': shoppinglist_id,
            'product_id': product_id
        })
    
    df = pd.DataFrame(data)
    df.to_csv(filename, index=False)

# Generate a CSV file with 100 rows
input_path = '../dataset/shopping_product_list.csv'
generate_csv(input_path, 150)
