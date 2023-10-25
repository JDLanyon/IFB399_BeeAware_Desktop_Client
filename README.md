# IFB399_BeeAware_Hive_Inspections
This is a hive inspection module for the [base app for BeeAware](https://github.com/tendy0505/BeeAware)
The module provides 4 front end tables that allow for directly interracting with the backend tables.

## Description

Instructions on how to use this as a user are outlined on the landing page.

![image](https://github.com/JDLanyon/IFB399_BeeAware_Hive_Inspections/assets/40357888/a66ad058-7e99-4d5e-83b5-b87950c17384)

Within this module, the two main javascript functions to note are;

**`hip_resyncTable(table)`** which makes get requests to pull all data from the specified table and rewrites the html table with the returned data.

**`hip_uploadTable(table)`** overwrites the existing backend table with information in the html table.

There are no robust checks for datatypes or null entries, so using the "upload table" button may not show a success alert.


## Setup
### Intended method
Using the base app found [here](https://github.com/tendy0505/BeeAware), upload this module's .zip file.

![image](https://github.com/JDLanyon/IFB399_BeeAware_Hive_Inspections/assets/40357888/b3c31cb5-a1bb-40d9-ab08-d544f87ef030)
![image](https://github.com/JDLanyon/IFB399_BeeAware_Hive_Inspections/assets/40357888/34c3bc20-4981-45f0-824d-c088b930b307)

### Manual install
In the event where the upload module functionality isn't working on the base app, you can manually add the module.
#### Editing table entries
For the module to be recognised, it must be referenced within `glb_SecMod`.

![image](https://github.com/JDLanyon/IFB399_BeeAware_Hive_Inspections/assets/40357888/e7cbf8f6-fa78-4579-a6da-4d6d8e017e5b)
```sql
INSERT INTO glb_SecMod VALUES('hip', 'HInspect', 'Hive Inspections Module', 2);
```
Where 2 is the security level needed to access the module.

#### Adding files
From the hip.zip file, move all files to the base app following the file structure below.
```DOM
BeeAware
├───Modules
│   ├───Controllers
│   │   └───hip
│   │           hip_Controller.cs
│   │
│   └───Models
│       └───hip
│               hip_Model.cs
│
└───wwwroot
    └───Modules
        ├───Css
        │       hip.css
        │
        ├───Html
        │       hip.html
        │
        └───Js
                hip.js
```

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

<details>
  <summary><h3>Null entries appear as string "null" upon resync</h3></summary>

No checks for NULL types are made before pushing entries to the html table, resulting in `"null"` rather than `NULL` in tables.
</details>

---
This is a **public** repository, however pull requests may not be accepted as this is a capstone project for QUT.
