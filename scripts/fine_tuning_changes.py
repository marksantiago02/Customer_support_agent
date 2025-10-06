import json

# Read the JSON array from customer_complaints.json
with open('customer_complaints.json', 'r') as file:
    complaints = json.load(file)

# Convert each entry to the desired format and append to customer_complaints_clean.jsonl
with open('customer_complaints_clean.jsonl', 'a') as file:
    for complaint in complaints:
        text = f"{{\"text\": \" <human> : I have an issue with my order ,  {complaint['complaint_description']} : Customer {complaint['customer_name']} with email {complaint['customer_email']} raised a complaint of complaint type {complaint['complaint_type']} on date {complaint['date']} for a product they had purchased. Response: As a customer support executive assessed the complaint and provided a resolution keeping the best interests of customer and company in mind provided a resolution of {complaint['resolution_provided']} under which company {complaint['resolution_description']}\"}}"
        file.write(text + '\n')