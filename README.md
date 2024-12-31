#Function: automation.testing(Int Quotes_id)
Overview
This Deluge script is designed to automate the processing and updating of product data within a "Quotes" module in Zoho CRM. It retrieves product details from a specific quote record, handles parent-child product relationships, and updates a custom subform field with the processed data.

Key Functionalities
Retrieve Quote Details:

Fetches a quote record using its Quotes_id and retrieves the Product_Details and other relevant fields.
Process Products:

Loops through the products in the quote, distinguishing between parent and child products.
Extracts and maps details like product name, list price, quantity, and child product status.
Child Product Integration:

For each parent product, fetches associated child products using Zoho's related records API.
Ensures that child products are appended immediately after their respective parent products in the processed list.
Custom Variable Utilization:

Incorporates a custom organizational variable, createdProduct, to limit the number of records with specific id assignments in the subform.
Payload Preparation:

Constructs a payload containing the processed product data to update the "Quoted_Items" subform in the "Quotes" module.
API Call Execution:

Sends a PUT request to update the "Quotes" record with the constructed payload.
Update and Log Subform IDs:

Collects subform IDs for processed products and updates a custom field (SubformIDS) using the crm.set connector.
Logging for Debugging:

Logs key variables, such as retrieved data, constructed payloads, and API responses, for debugging and monitoring.
#Usage
This function is useful for automating complex quote processing tasks in Zoho CRM, particularly for scenarios involving hierarchical product structures. It simplifies data management, ensures consistency, and reduces manual effort in updating quotes with parent-child product relationships.

