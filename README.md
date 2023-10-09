# IFB399_BeeAware_Hive_Inspections
This readme file will be expanded upon later contain a lot more relevant information.

## Description
Currently there are 3 tabs that allow navigation within the module.
Of the 3, locations shows a table which should interact with the `mms_Address` table directly.

two javascript functions of note are;

**`hip_resyncTable(table)`** which accesses **`getLocations`**. This pulls all data from the `mms_Address` table and rewrites the html table with said data.

**`hip_uploadTable(table)`** uses **`postLocations`** which should delete the entire `mms_Address` table and write what is found within the html table.

There are no checks for datatypes or null entries, so using the "upload table" button may not show a success alert.


## Setup

---
This is a **private** repository, meaning only the contributers can view this project.
