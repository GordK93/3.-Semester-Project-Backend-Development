# Project Overview

This project is based on the AdventureWorksLT database hosted in Azure.

The assignment is divided into two parts:

• Part 1 -- Microservices web application connected to Azure SQL\
• Part 2 -- ETL process using Azure Data Factory and data visualization
in Power BI

The goal of the project is to demonstrate understanding of:

-   Microservices architecture
-   Azure SQL Database
-   Raw SQL queries using Sequelize
-   Azure Data Factory (ETL process)
-   Data cleaning and visualization in Power BI

------------------------------------------------------------------------

# Technologies Used

-   Node.js
-   Express
-   Sequelize (Raw SQL queries only)
-   Azure SQL Database
-   Azure Data Factory
-   Power BI
-   dotenv

------------------------------------------------------------------------

# How to Install and Run the Project

## 1. Clone the Repository

Clone this repository to your local machine.

## 2. Install Dependencies

Open a terminal inside each of the following folders:

-   gateway
-   customer
-   products
-   management

Run:

npm install

This will install all required dependencies.

## 3. Configure Environment Variables

Create a `.env` file inside each service folder.

Example:

PORT=8001\
DB_HOST=your_server.database.windows.net\
DB_NAME=AdventureWorksLT\
DB_USER=your_username\
DB_PASSWORD=your_password

Note: Database credentials are NOT included in this repository for
security reasons.

## 4. Start the Services

Inside each service folder, run:

npm start

Services run on:

-   Gateway → http://localhost:8000
-   Product → Port 8001
-   Customer → Port 8002
-   Management → Port 8003

Access the system from:

http://localhost:8000

------------------------------------------------------------------------

# Part 1 -- Microservices

The system is built using a microservices pattern:

• Gateway service routes traffic to other services\
• Product service retrieves product data\
• Customer service retrieves customer data\
• Management service runs analytical SQL queries

All database queries are executed using Sequelize.query() with raw SQL.

------------------------------------------------------------------------

# Part 2 -- ETL Process

An ETL process was created in Azure Data Factory.

Steps completed:

• Created Azure Data Factory\
• Created Linked Service to Azure SQL\
• Created datasets for Customer and SalesOrderHeader\
• Created two new cleaned tables: - Customer_Clean -
SalesOrderHeader_Clean • Removed unnecessary columns\
• Renamed Status → Order Status\
• Loaded cleaned data into new tables

------------------------------------------------------------------------

# Power BI Files

All Power BI files are stored inside:

PowerBI_Graphs

Naming format:

Gord_Kverme(F)_SP2_CA_OCT_24FT.pbix
Gord_Kverme(G)_SP2_CA_OCT_24FT.pbix
Gord_Kverme(H)_SP2_CA_OCT_24FT.pbix
Gord_Kverme_Azure_SP2_CA_1_OCT_24FT.docx.pbix

------------------------------------------------------------------------

# Important Notes

• Database credentials are not included\
• .env files are excluded\
• node_modules are not included\
• Run npm install before starting services

------------------------------------------------------------------------

This project demonstrates full-stack backend development using Azure
cloud services and data analytics tools.
