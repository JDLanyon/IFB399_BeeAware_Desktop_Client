var locationData = [];

function getDescriptions() {
    const checkedInputs = Array.from(locations.querySelectorAll('input[type="checkbox"]:checked'));
    const selectedLookupCodes = checkedInputs.map(input => input.value);
    var descriptions = [];

    for (let i = 0; i < locationData.length; i++) {
        const item = locationData[i];

        if (selectedLookupCodes.includes(item.LookupCode)) {
            descriptions.push(item.Description);
        }
    }
    const hives = document.getElementById('hives');

    descriptions.forEach(description => {
        const div = document.createElement('div');
        div.className = 'hiveInfo';
        div.textContent = description;
        hives.appendChild(div);
    });
    console.log(descriptions);
}

function SetModalInitContent(isShown) {
    let page_content = `<div class="db_container">
                <div class="sidebar1">
                    <button class="main-nav-btn">Hive Inspection</button>
                </div>

                <div class="subnav">
                    <button onclick="switchInnerPageFlex('About')">About</button>
                    <button onclick="switchInnerPageFlex('setup')">Setup</button>
                    <button id='btn_inspection' onclick="switchInnerPageFlex('inspection'); getLocationInfo();">Inspection</button>
                </div>

                <div id="About" class="innerPages1">
                    <p>Basically put the readme here or something, I don't know.Will there even be an about section?</p>
                </div>

                <div id="setup" class="innerPages1">
                    <button id="btn_hive_config">Hive Config</button>
                    <button id="btn_loc_config">Location Config</button>
                    <button id="btn_note_config">Notation Config</button>
                    <button id="btn_user_config">Admin Config</button>
                    <div class="notice">please note that these are modular and may not be confirmed yet.</div>
                </div>
                <div id="inspection" class="innerPages1">
                    <div id='locations' class="locations">
                        <h1>Locations</h1>
                    </div>
                    <div id="hives" class="hives">
                        <h1>Hives</h1>
                    </div>
                </div>
            </div>`
    var modalContent = document.getElementsByClassName("modal-content")[0];
    if (modalContent !== null && modalContent !== undefined) {
        modalContent.innerHTML = page_content;
        var modal = document.getElementById("myModal");
        if (isShown) {
            modal.style.display = "flex";
        }
        else {
            modal.style.display = "none";
        }
    }

    SetButtonEvent();
}

function OpenConfigPanel() {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    if (btn == null || btn == undefined) {
        return;
    }
    btn.addEventListener('click', function () {
        SetModalInitContent(true);
        switchInnerPageFlex('ShowNone');
    });

    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {

        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // get all button by css
    var buttons = document.querySelectorAll('.subnav button');
    // add event listener to each button
    buttons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            // set background color of buttons to white
            buttons.forEach(function (button) {
                button.style.backgroundColor = 'rgb(255, 214, 53)';
            });
            // button set to orange
            button.style.backgroundColor = "orange";
        });
    });
}


function SetTableContent(table_name) {
    var modalContent = document.getElementsByClassName("modal-content")[0];
    // set the content of the modal to empty
    modalContent.innerHTML = `<div class="modal-content">
        <table id="myTable" class="styled-table"></table>
    </div>`;
    Db_related(table_name);
}

function Db_related(table_name) {
    const url = 'https://localhost:7133/api/Module/' + table_name + '_Get';

    fetch(url, {
        method: 'GET',
        referer: 'about:client',
        credentials: 'same-origin',
        headers: new Headers({ 'content-type': 'application/ json' }),
    })
        .then(function (response) {
            response.json().then(function (data) {
                // Get table reference
                const table = document.getElementById('myTable');
                let obj = {};
                for (let key in data[0]) {
                    if (data[0].hasOwnProperty(key)) {
                        obj[key] = "";
                    }
                }
                data.push(obj);

                // Generate headers
                let header = '<tr>';
                for (let key in data[0]) {
                    header += `<th>${key}</th>`;
                }
                header += `<th>Submit Button</th>`;
                header += `<th>Delete Button</th>`;
                header += `<th>Add Button</th>`;
                header += '</tr>';

                // Generate rows
                let rows = '';
                let rowIndex = 1;
                if (table_name == 'note_config') {
                    for (let obj of data) {
                        rows += '<tr>';
                        columnIndex = 0;
                        for (let val in obj) {
                            if (columnIndex == 2) {
                                // image to string 
                                rows += `<td><img class="noteImg" src="data:image/png;base64,${obj[val]}" alt="image" width="100" height="100"></td>`;
                            }
                            else {
                                rows += `<td contenteditable="true">${obj[val]}</td>`;
                            }
                            columnIndex++;
                        }
                        rows += `<td><input type="file" id="inputFile${rowIndex}" class="fileInput" accept="image/*" capture="camera"></td>`;
                        rows += `<td><button class="submit" onclick="submitRow(${rowIndex}, '${table_name}')">Submit</button></td>`;
                        rows += `<td><button class="submit" onclick="delRow(${rowIndex}, '${table_name}')">Delete</button></td>`;
                        if (rowIndex == data.length) {
                            rows += `<td><button class="submit" onclick="addRow(${rowIndex}, '${table_name}')">Add</button></td>`;
                        }
                        else {
                            rows += `<td>😶</td>`;
                        }
                        rows += '</tr>';
                        rowIndex++;
                    }
                }
                else {
                    for (let obj of data) {
                        rows += '<tr>';
                        for (let val in obj) {
                            rows += `<td contenteditable="true">${obj[val]}</td>`;
                        }
                        if (rowIndex == data.length) {
                            rows += `<td></td>`;
                            rows += `<td></td>`;
                            rows += `<td><button class="submit" onclick="addRow(${rowIndex}, '${table_name}')">Add</button></td>`;
                        }
                        else {
                            rows += `<td><button class="submit" onclick="submitRow(${rowIndex}, '${table_name}')">Submit</button></td>`;
                            rows += `<td><button class="submit" onclick="delRow(${rowIndex}, '${table_name}')">Delete</button></td>`;
                            rows += `<td></td>`;
                        }
                        rows += '</tr>';
                        rowIndex++;
                    }
                }
                // Set innerHTML
                table.innerHTML = header + rows;
                if (table_name == 'note_config') {
                    var fileInput = document.getElementsByClassName('fileInput');
                    var images = document.getElementsByClassName('noteImg');
                    // add event listener to all the input file elements
                    for (var i = 0; i < fileInput.length; i++) {
                        // 监听选择文件事件
                        fileInput[i].addEventListener('change', (e) => {
                            // 获取选择的文件
                            const file = e.target.files[0];
                            // 使用FileReader读取文件
                            const reader = new FileReader();
                            reader.onload = (e2) => {
                                // get id 
                                var id = e.target.getAttribute('id');
                                // remove inputFile in string 
                                var index = parseInt(id.replace('inputFile', ''));
                                var images = document.getElementsByClassName('noteImg');
                                const base64String = e2.target.result;
                                images[index - 1].src = base64String;
                            };

                            // 以DataURL的格式读取文件内容
                            reader.readAsDataURL(file);
                        });
                    }
                }
            });
        });
}


function submitRow(t_rowIndex, t_tableName) {
    const table = document.getElementById('myTable');
    const row = table.rows[t_rowIndex];
    const cells = row.cells;
    const infoDict = {
        'hip_HiveInspectionDetails': {
            'keys': ['HiveID', 'Date', 'Time', 'Condition', 'Temperament', 'Population'],
            'index': [0, 3, 5]
        },
        'note_config': {
            'keys': ['HiveInspectionNoteID', 'HiveInspectionID', 'image', 'Notes'],
            'index': [0, 1]
        },
        'hip_users': {
            'keys': ['UserID', 'UserType', 'RegNo', 'PostDate'],
            'index': [0]
        },
        'location_config': {
            'keys': ['LookupID', 'UserType', 'Description', 'Queen_Type', 'LookupCode', 'LookupSrc'],
            'index': [0]
        }
    }
    MatchData = infoDict[t_tableName];
    var data = {};
    for (let i = 0; i < MatchData['keys'].length; i++) {
        value = null;
        if (MatchData['keys'][i] == 'image') {
            value = cells[i].children[0].getAttribute('src').split(',')[1];
        }
        else {
            if (MatchData['index'].includes(i)) {
                value = parseInt(cells[i].innerHTML);
            }
            else {
                value = cells[i].innerHTML;
            }
        }
        data[MatchData['keys'][i]] = value;
    }
    data = JSON.stringify(data);

    const url = 'https://localhost:7133/api/Module/' + t_tableName + '_Post';
    fetch(url, {
        method: 'POST',
        referer: 'about:client',
        credentials: 'same-origin',
        headers: new Headers({ 'content-type': 'application/ json' }),
        body: data
    })
        .then(function (response) {
            response.json().then(function (data) {
                if (response.status == 202) {
                    alert('Data submitted successfully');
                    console.log('Data submitted successfully');
                } else {
                    alert('Data submission failed');
                    console.log('Data submission failed');
                }
            });
        })
}

function delRow(t_rowIndex, t_tableName) {
    const table = document.getElementById('myTable');
    const row = table.rows[t_rowIndex];
    const cells = row.cells;
    const data = JSON.stringify({
        "mID": parseInt(cells[0].innerHTML),
        "table_name": t_tableName
    })
    const url = 'https://localhost:7133/api/Module/DeleteRow';
    fetch(url, {
        method: 'POST',
        referer: 'about:client',
        credentials: 'same-origin',
        headers: new Headers({ 'content-type': 'application/ json' }),
        body: data
    })
        .then(function (response) {
            response.json().then(function (data) {
                if (response.status == 202) {
                    alert('Data delete successfully');
                    console.log('Data delete successfully');
                } else {
                    alert('Data delete failed');
                    console.log('Data delete failed');
                }
            });
        })
}

function SetButtonEvent() {
    var btn = document.getElementById("btn_hive_config");
    if (btn == null || btn == undefined) {
        return;
    }

    btn.onclick = function () {
        SetTableContent('hip_HiveInspectionDetails');
    }

    var btn = document.getElementById("btn_note_config");
    btn.onclick = function () {
        SetTableContent('note_config');
    }

    var btn = document.getElementById("btn_user_config");
    btn.onclick = function () {
        SetTableContent('hip_users');
    }

    var btn = document.getElementById("btn_loc_config");
    btn.onclick = function () {
        SetTableContent('location_config');
    }
}


window.onload = function () {
    ModuleCheck();
    ModuleList();
    switchPage('loginPage')
}

document.getElementById("login-form").addEventListener("submit", function (event) {
    login(event);
})

document.getElementById("register-form").addEventListener("submit", function (event) {
    register(event);
})

function login(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    var email = document.getElementById("login-email")
    var password = document.getElementById("login-password")

    const data = JSON.stringify({
        'id': parseInt(0),
        "email": email.value,
        "group": email.value,
        "password": password.value,
    })
    fetch("/api/User/login", {
        method: 'POST',
        referer: 'about:client',
        credentials: 'same-origin',
        headers: new Headers({ 'content-type': 'application/ json' }),
        body: data,
    })
        .then((response) => {
            if (response.status == 202) {
                switchPage('mainPage')
                switchInnerPage('mainInnerPage')

            } else if (response.status == 404) {
                alert("user not found");
            } else {
                alert("wrong password")
            }
        }
        ).catch(function (err) {

        })
};

function register(event) {
    event.preventDefault();
    var email = document.getElementById("register-email")
    var password = document.getElementById("register-password")


    const data = JSON.stringify({
        'id': parseInt(0),

        "email": email.value,
        "group": "",

        "password": password.value,
    })
    fetch("/api/User/register", {
        method: 'POST',
        referer: 'about:client',
        credentials: 'same-origin',
        headers: new Headers({ 'content-type': 'application/ json' }),
        body: data,
    })
        .then(function (response) {
            if (response.status == 201) {
                switchPage("loginPage")
            } else {

            }

        }
        ).catch(function (err) {

        })
};

function ModuleCheck() {
    fetch("/api/Module/Check", {
        referer: 'about:client',
        credentials: 'same-origin',
        headers: new Headers({ 'content-type': 'application/ json' }),
    })
        .then(function (response) {
            if (response.status == 200) {
                response.json()
                    .then(data => {
                        var innerPagesDiv = document.getElementById("innerPagesDiv");
                        var switchInnerPageButtons = document.getElementById("switchInnerPageButtons")


                        for (var i = 0; i < data.length; i++) {
                            innerPagesDiv.insertAdjacentHTML("beforeend", data[i]);
                            var newInnerPage = document.getElementsByClassName("innerPages")
                            switchInnerPageButtons.insertAdjacentHTML("beforeend", " <a onclick=" + '"' + "switchInnerPage('" + newInnerPage[newInnerPage.length - 1].id + "')" + '"' + " >" + newInnerPage[newInnerPage.length - 1].id + "</a>")
                        }


                        var scripts = document.getElementsByTagName("script")

                        for (i = 0; i < scripts.length; i++) {
                            const importScript = document.createElement("script")
                            importScript.setAttribute("src", scripts[i].src);
                            scripts[i].remove();
                            document.head.appendChild(importScript)
                        }

                        var scripts = document.getElementsByTagName("script")
                        for (i = 0; i < scripts.length; i++) {
                            const importScript = document.createElement("script")
                            importScript.setAttribute("src", scripts[i].src);
                            scripts[i].remove();
                            document.head.appendChild(importScript)
                        }
                    })
            } else {

            }

        }
        ).catch(function (err) {

        })
}


function ModuleList() {
    fetch("/api/Module/List", {

        referer: 'about:client',
        credentials: 'same-origin',
        headers: new Headers({ 'content-type': 'application/ json' }),
    })
        .then(function (response) {
            if (response.status == 200) {
                response.json()
                    .then(data => {
                        moduleList = document.getElementById("moduleList")
                        for (var i = 0; i < data.length; i++) {
                            moduleList.insertAdjacentHTML("beforeend", "<div class= 'card' ><div class='card-header'>" + data[i].Name + "<button type = 'button' class='btn btn-danger float-end' onclick =" + '"ModuleDelete(' + "'" + data[i].Name + "'" + ')"' + ">Delete</button> </div><div class='card-body'>" + data[i].Description + "</div> </div> ")
                        }
                    })
            } else {

            }

        }
        ).catch(function (err) {

        })
}

function ModuleDelete(name) {
    const data = JSON.stringify({
        'description': "",
        "id": 0,
        "name": name,
        "tableUse": "",
    })
    console.log(data)
    fetch("/api/Module/Delete", {
        method: 'POST',
        referer: 'about:client',
        credentials: 'same-origin',
        headers: new Headers({ 'content-type': 'application/ json' }),
        body: data,
    })
        .then(function (response) {
            if (response.status == 200) {
                response.json()
                    .then(() => {
                        moduleList = document.getElementById("moduleList")
                        moduleList.innerHTML = '<h1 class="text-center pb-4"><img src="images/Bee.png" width="100" height="100" alt="Bee Aware Platform">Delete Plugins</h1>'
                        ModuleList()
                    })
            } else {

            }

        }
        ).catch(function (err) {

        })
}

function addRow(t_rowIndex, t_tableName) {
    const table = document.getElementById('myTable');
    const row = table.rows[t_rowIndex];
    const cells = row.cells;
    const infoDict = {
        'hip_HiveInspectionDetails': {
            'keys': ['HiveInspectionID', 'HiveID', 'Date', 'Time', 'Condition', 'Temperament', 'Population'],
            'index': [0, 1, 4, 6]
        },
        'note_config': {
            'keys': ['HiveInspectionNoteID', 'HiveInspectionID', 'image', 'Notes'],
            'index': [0, 1]
        },
        'hip_users': {
            'keys': ['UserID', 'UserType', 'RegNo', 'PostDate'],
            'index': [0]
        },
        'location_config': {
            'keys': ['LookupID', 'UserType', 'Description', 'Queen_Type', 'LookupCode', 'LookupSrc'],
            'index': [0]
        }
    }
    var data = {};

    for (let tn in infoDict) {
        MatchData = infoDict[tn];
        for (let i = 0; i < MatchData['keys'].length; i++) {
            value = null;
            if (MatchData['keys'][i] == 'image' && tn == t_tableName) {
                value = cells[i].children[0].getAttribute('src').split(',')[1];
            }
            else {
                if (MatchData['index'].includes(i)) {
                    if (tn == t_tableName) {
                        value = parseInt(cells[i].innerHTML);
                    }
                    else {
                        value = -1;
                    }
                }
                else {
                    if (tn == t_tableName) {
                        value = cells[i].innerHTML;
                    }
                    else {
                        value = '';
                    }
                }
            }
            data[MatchData['keys'][i]] = value;
        }
    }

    data = JSON.stringify(data);

    const url = 'https://localhost:7133/api/Module/AddRow';
    fetch(url, {
        method: 'POST',
        referer: 'about:client',
        credentials: 'same-origin',
        headers: new Headers({ 'content-type': 'application/ json' }),
        body: data
    })
        .then(function (response) {
            response.json().then(function (data) {
                if (response.status == 202) {
                    alert('Data submitted successfully');
                    console.log('Data submitted successfully');
                } else {
                    alert('Data submission failed');
                    console.log('Data submission failed');
                }
            });
        })
}

function getLocationInfo() {
    const url = 'https://localhost:7133/api/Module/location_config_GET';
    fetch(url, {
        method: 'GET',
        referer: 'about:client',
        credentials: 'same-origin',
        headers: new Headers({ 'content-type': 'application/ json' }),
    })
        .then(function (response) {
            response.json().then(function (data) {
                // Array to store LookupCodes
                const lookupCodes = [];
                locationData = data;

                // Iterate over each dictionary in the array
                locationData.forEach(dict => {
                    // Get the LookupCode from each dictionary
                    const lookupCode = dict.LookupCode;

                    // Append the LookupCode to the new array if it doesn't already exist
                    if (lookupCode && lookupCode.trim() !== '' && !lookupCodes.includes(lookupCode)) {
                        lookupCodes.push(lookupCode);
                    }
                });

                var locations = document.getElementById('locations');

                lookupCodes.forEach(lookupCode => {
                    // Create the div element
                    const div = document.createElement('div');
                    div.className = 'row';

                    // Create the checkbox element
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.value = lookupCode;
                    checkbox.addEventListener('change', getDescriptions);

                    // Create the p element
                    const p = document.createElement('p');
                    p.textContent = lookupCode;

                    // Append the checkbox and p elements to the div element
                    div.appendChild(checkbox);
                    div.appendChild(p);

                    // Append the div element to the locations parent element
                    locations.appendChild(div);
                });
            });
        });
}

SetModalInitContent(false);
OpenConfigPanel();