import sqlite3
import pandas as pd
import os

def check_and_create_db():
    try:
        # File paths
        excel_file = '200_medicines_database.xlsx'
        db_file = 'index.db'
        
        # Check if Excel file exists
        if not os.path.exists(excel_file):
            print(f"Error: {excel_file} not found in the current directory.")
            return False
            
        print(f"Loading data from {excel_file}...")
        df = pd.read_excel(excel_file)
        
        # Clean up column names for sqlite (replace spaces with underscores if any)
        df.columns = [c.replace(' ', '_').lower() for c in df.columns]
        
        # Check if stock column exists, if not add it
        if 'stock' not in df.columns:
            print("Adding default 'stock' column with value 50...")
            df['stock'] = 50
            
        print(f"Connecting to SQLite database ({db_file})...")
        # Connect to SQLite database (will create it if it doesn't exist)
        conn = sqlite3.connect(db_file)
        
        # Write the dataframe to a new table named 'medicines'
        print("Writing data to 'medicines' table...")
        df.to_sql('medicines', conn, if_exists='replace', index=False)
        
        print("Validating data insertion...")
        # Verify the data was inserted
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM medicines")
        count = cursor.fetchone()[0]
        
        print(f"Successfully added {count} medicines to {db_file}!")
        
        # Display sample content
        print("\nSample Data:")
        sample_df = pd.read_sql("SELECT * FROM medicines LIMIT 3", conn)
        print(sample_df)
        
        # Close connection
        conn.close()
        return True
        
    except Exception as e:
        print(f"An error occurred: {e}")
        return False

if __name__ == "__main__":
    check_and_create_db()
