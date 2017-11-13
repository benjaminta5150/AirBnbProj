# AirBnbProj 

My submission for the Capital One Software Engineering Summit

Given public AirBnb data for San Francisco listings, I set out to find the most efficient way to analyze this enormous amount of data. I discovered the R programming language and taught it to myself just for this project. The main listings.csv file provided had nearly 9000 lines of data and R made its analysis a breeze.

I created several spreadsheets that were subsets of this data that proved useful in my implementation of this project. All of this data is neatly organized in the data folder which contains CSV, JSON, and R studio forms of each spreadsheet.

	1. Frequencies - This table counts the number of listings in each of the neighbourhoods. This helps to avoid outliers that have only a few listings.

	2. Geolocation - I computed the average latitude and longitude for each neighbourhood so that when given a specific geolocation, it would be easy to find the nearest neighbourhood. In my implementation of the project, I used least-square distance as a metric for finding the closest neighbourhood.

	3. Number of Reviews vs. Price/Average Rating vs. Price - These were curiosities of mine. I wondered if listings with many reviews tended to be more expensive and if higher rated listings were more expensive.

	4. Daily Price/Weekly Price - These spreadsheets contained the daily and weekly averages of listings in each particular neighbourhood.

I came into this project with no experience in HTML/JavaScript/R. Coming out of the project, I definitely learned a lot and am incredibly thankful for this opportunity.

