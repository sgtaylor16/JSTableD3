from faker import Faker
import json

fake = Faker()

rowlist = []

for i in range(10):
    
    #Create find
    find = fake.bothify(text='?####',letters='ABCDE')
    pn = fake.bothify(text='AAE####')
    rowlist.append({'fn':find,'pn':pn})
    
# Convert the list of dictionaries to a JSON-formatted string
final_json = json.dumps(rowlist, indent=2)

# Write the JSON string to a file (e.g., "mydata.json")
with open("mydata.json", "w") as json_file:
    json_file.write(final_json)
    
