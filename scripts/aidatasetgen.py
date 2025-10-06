import json
import requests

url = "https://api.together.xyz/v1/chat/completions"

payload = {
    "messages": [
        {
            "role": "system",
            "content":  "  the output should only contain json and no other text , Generate a customer complaint record with the following details:\n"
        "1. Customer Name\n"
        "2. Customer Email\n"
        "3. Complaint Description\n"
        "4. Complaint Type (e.g., Product Defect, Quality Issues, etc.)\n"
        "5. Resolution Provided (e.g., Refund, Replacement, etc.)\n"
        "6. Resolution Description\n"
        "7. Date (in YYYY-MM-DD format)\n\n" 
        "Provide the details in JSON format. email id should be example it can be any other words among gmail ,yahoo , outlook etc, complaint type should be among these Product Defects Quality Issues Incorrect Item Service Issues Product Not as Described Price Issues Safety Concerns Packaging Issues Functionality Problems and resolution provided should be among Refund Replacement Repair Discount Apology Store Credit Return Exchange Compensation  , the output should only contain json and no other text"
        },
        {
            "role": "user",
            "content": "generate a authentic customer complaint dataset for an ecommerce platform where users are facing issues using your keyboard and the order has been delivered, generate 10 such entries "
        }
    ],
    "model": "meta-llama/Meta-Llama-3-8B-Instruct-Lite"
}
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": "Bearer 38591770c13ba299590012087d9e6bd481577d04e426cc45a26aa9591838105e"
}

response = requests.post(url, json=payload, headers=headers)


response = response.json()["choices"][0]["message"]["content"]

response = response[response.index("["):]
response = response.replace("\n", "").replace("\\", "")

# Load existing data from customer_complaints.json
with open("customer_complaints.json", "r") as file:
    existing_data = json.load(file)

# Append new complaint to existing data
existing_data.extend(json.loads(response))

# Write updated data back to customer_complaints.json
with open("customer_complaints.json", "w") as file:
    json.dump(existing_data, file)
    print("Data appended to customer_complaints.json")