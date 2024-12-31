# Deluge Script: `automation.testing(Int Quotes_id)`

## Overview
This Deluge script automates the processing and updating of product data within a "Quotes" module in Zoho CRM. It retrieves product details, processes hierarchical relationships, and updates the "Quoted_Items" subform for a specific quote OnCreate.

---

## Key Functionalities

### 1. **Retrieve Quote Details**
- Fetches a quote record using the provided `Quotes_id`.
- Retrieves `Product_Details`, `Subject`, and other relevant fields.

### 2. **Process Parent and Child Products**
- Loops through the parent products in the quote.
- Extracts details like:
  - Product Name
  - List Price
  - Quantity
  - Child Product Status
- Fetches child products and appends them immediately after their respective parent products.

### 3. **Utilize Custom Variables**
- Leverages a custom organization variable `createdProduct` to limit the number of subform records with specific IDs.

### 4. **Construct and Update Payload**
- Builds a payload containing processed product data.
- Updates the "Quoted_Items" subform in the Quotes module using a PUT API request.

### 5. **Log and Debug**
- Logs key variables and responses for debugging purposes, including:
  - Retrieved data
  - Constructed payloads
  - API responses

---

## Function Parameters
- **`Quotes_id`**: The unique ID of the quote record to be processed.

---

## Steps Performed by the Function

1. **Fetch Quote Record**
   - Retrieve quote details and initialize lists for processing product data.

2. **Loop Through Parent Products**
   - Extract details for each product in the quote.
   - Fetch related child products using Zoho's API.

3. **Prepare Processed Data**
   - Create a list of parent and child products with their relevant details.
   - Ensure child products are associated correctly with their parent.

4. **Construct Payload**
   - Build a payload for the "Quoted_Items" subform with fields such as:
     - `Product_Name`
     - `Quantity`
     - `List_Price`
     - `Child_Product`

5. **API Request to Update Quote**
   - Send a PUT request to update the quote with the constructed payload.

6. **Update Custom Field**
   - Update a custom field (`SubformIDS`) with the processed subform product IDs using the `crm.set` connector.

7. **Log Results**
   - Debug and log information about the processed data, payload, and API responses.

---

## Example Usage
```deluge
// Example call to the function
automation.testing(1234567890);
```

- This would process the quote with ID `1234567890` and update the "Quoted_Items" subform based on the parent and child product relationships.

---

## API Dependencies
- **Zoho CRM APIs**
  - `getRecordById`: To fetch quote details.
  - `getRelatedRecords`: To fetch child products related to a parent product.
  - `crm.set`: To update custom fields.

---

## Debugging and Logging
- The script logs key details at each step:
  - Retrieved quote details.
  - Constructed subform data.
  - Final payload for the API request.
  - Responses from Zoho CRM API calls.

---

## Notes
- Ensure the custom variable `createdProduct` is defined in your Zoho CRM organization settings.
- This script is designed for Zoho CRM's Deluge environment and requires appropriate API permissions.

---

## Contribution
Feel free to contribute enhancements or suggest improvements to this script. Open an issue or submit a pull request!
