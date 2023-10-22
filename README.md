# IFB399_BeeAware_Hive_Inspections
This readme file will be expanded upon later contain a lot more relevant information.

## Description
This is a hive inspection module for the [base app for BeeAware](https://github.com/tendy0505/BeeAware)
The module provides 5 front end tables that allow for directly interracting with the backend tables.



Javascript functions to note are;

**`hip_resyncTable(table)`** which makes get requests to pull all data from the specified table and rewrites the html table with the returned data.

**`hip_uploadTable(table)`** overwrites the existing backend table with information in the html table.

There are no robust checks for datatypes or null entries, so using the "upload table" button may not show a success alert.


## Setup
Using the base app found [here](https://github.com/tendy0505/BeeAware), upload this module's .zip file.


## Known Issues
These will be explored further within the report.

<details>
  <summary><h3>onload event</h3></summary>
  
Since the modules are added dynamically, `window.onload()` does not execute.
This prevents loading relevant data once leaving tables to be updated everytime the user switches screens.

</details>

<details>
  <summary><h3>User IDs</h3></summary>
  
When adding a row, the UserID is always set to 1
```js
    ...
    <th>1</th> <!-- UserID -->
    ...
```
Rather than writing a GET request for the user id, it is already provided on the base app upon login
```js
function login(event) {
    ...
        .then(response => {
            response.json().then(data => {
                if (response.status == 202) {
                    currentUser = data // <-- here
                    updateUserTab(currentUser)
                    switchPage('mainPage')
                    switchInnerPage('mainInnerPage')
                    ModuleCheck();
                    ModuleList();
    ...
```
currentUser should be accessed across modules for cases like updating the rows to have the correct userID, when uploading to the backend tables, security checks, etc.
</details>

<details>
  <summary><h3>Entries can be edited with devtools</h3></summary>

There are only front-end preventions from users adding whatever data they desire.
All datachecks and column restrictions are made via html but should also be checked before posting to tables.

This is quite an urgent issue as anyone can provide whatever data they wish.
</details>

<details>
  <summary><h3>Lack of security checks</h3></summary>

The security level values aren't utilized within this module, allowing for users with any security level to add and remove any entires in the 5 provided tables.
</details>

<details>
  <summary><h3>SQLBinary</h3></summary>

There is no front-end handling of this datatype. Ideally the user would be able to upload and preview images.

As a result a "Not available" is displayed under image columns and sections for this are commented out.
The HiveInspectionNotes table has also been removed as a result of this as the table proves useless without handling the SQLBinary datatype.
</details>

---
This is a **public** repository, however pull requests may not be accepted as this is a capstone project for QUT.