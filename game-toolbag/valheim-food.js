function app($$data) {
    const _this = this;
    this.tierColors = {
        1: '#f7f781',
        2: '#bbe33d',
        3: '#b4c7dc',
        4: '#dddddd',
        5: '#ffdbb6',
        6: '#ffc2c2',
    };
    this.resources = [];
    this.tabledata = [];
    this.resourceCols = [];
    this.table = null;
    // ==========================================================================================
    {
        window.localStorage.setItem('valheim-food', JSON.stringify($$data));
        buildResources($$data);
        buildResourceCols($$data);
        buildResourceChecks($$data);
        $(function () { setTimeout(() => { buildResourceStyles($$data); }, 3 * 1000); });
        buildTableDate($$data);
        buildTableFilters($$data);
        buildTable($$data);
        buildDataReset($$data);
        $('[data-toggle="popover"]').popover({ trigger: 'focus' });
    }
    // ==========================================================================================
    function buildResources(data) {
        for (let resourceTier of data.resourceTiers) {
            for (let _resource of resourceTier) {
                _this.resources.push(_resource);
            }
        }
    }
    // ==========================================================================================
    function buildResourceCols(data) {
        for (let resource of _this.resources) {
            let colorClass = '';
            data.resourceTiers.forEach(function (resourceTier, i) {
                for (let rt of resourceTier) {
                    if (resource == rt) {
                        colorClass = data.tiers[i];
                    }
                }
            });
            if (colorClass == '') {
                data.resourceTiers.forEach(function (resourceTier, i) {
                    for (let rt of resourceTier) {
                        if (resource == rt) {
                            colorClass = data.tiers[i];
                        }
                    }
                });
            }
            _this.resourceCols.push({ title: resource, field: resource, sorter: "number", headerVertical: true, hozAlign: "center", cssClass: colorClass.replace(' ', '-') });
        }
    }
    // ==========================================================================================
    function buildResourceChecks(data) {
        for (let resource of _this.resources) {
            let fixedName = resource.replace(' ', '_');
            let template = '<div class="col-2"><div style="width:unset;display:inline;" class="imgcheck input-group input-group-sm"><label class="checkbox-inline" for="check_' + fixedName + '"><input checked="checked" value="' + resource + '" style="display: none;" type="checkbox" id="check_' + fixedName + '"><img id="is_' + fixedName + '" width="32" height="32" src="images/' + resource + '.png">&nbsp;<span style="font-size:11px" id="lbl_' + fixedName + '">' + resource + '</span></label></div></div>'
            //
            $('#resourceChecks').append(template);
            //
            $('#check_' + fixedName).click(function () {
                let checked = $(this).is(':checked');
                document.getElementById("style-" + resource).disabled = checked;
            });
        }
    }
    // ==========================================================================================
    function buildResourceStyles(data) {
        for (let resource of _this.resources) {
            let style = document.createElement("style");
            style.id = "style-" + resource;
            style.innerHTML = "[tabulator-field='" + resource + "'] { display: none !important; }";
            document.body.appendChild(style);
            document.getElementById("style-" + resource).disabled = true;
        }
    }
    // ==========================================================================================
    function buildTableFilters(data) {
        _this.nameFilter = $('#filter-name');
        _this.tierFilter = $('#filter-tier');
        _this.starredFilter = $('#filter-starred');
        _this.typeFilter = $('#filter-type');
        _this.hpFilter = $('#filter-hp');
        _this.staminaFilter = $('#filter-stamina');
        _this.eitrFilter = $('#filter-eitr');
        _this.hpsFilter = $('#filter-hps');
        _this.durationFilter = $('#filter-duration');
        //
        function clearFiltering() {
            _this.table.clearFilter();
            for (let i = 0; i < Object.keys(data.food).length; i++) {
                _this.table.deselectRow(i);
            }
            $('#totalPoints').val('');
            for (let resource of _this.resources) {
                $("#check_" + resource.replace(' ', '_')).prop('checked', true);
            }
        }
        //
        function updateFilter() {
            clearFiltering();
            //
            let f = [];
            if (nameFilter.val()) {
                f.push(_this.nameFilter.val().split(',')
                    .map(str => str.trim())
                    .map(filterStr => { return { field: "name", type: "like", value: filterStr }; })
                );
            }
            if (tierFilter.val()) {
                f.push({
                    field: "tier", type: "in", value: _this.tierFilter.val().map(str => parseInt(str))
                });
            }
            if (_this.starredFilter.val()) {
                if (_this.starredFilter.val().length == 1) {
                    if (_this.starredFilter.val()[0] == "y") {
                        f.push({ field: "starred", type: "=", value: true });
                    } else {
                        f.push({ field: "starred", type: "=", value: false });
                    }
                }
            }
            if (_this.hpFilter.val()) {
                f.push({ field: "hp", type: ">=", value: _this.hpFilter.val() });
            }
            if (_this.staminaFilter.val()) {
                f.push({ field: "stamina", type: ">=", value: _this.staminaFilter.val() });
            }
            if (_this.eitrFilter.val()) {
                f.push({ field: "eitr", type: ">=", value: _this.eitrFilter.val() });
            }
            if (_this.typeFilter.val()) {
                f.push({ field: "type", type: "in", value: _this.typeFilter.val() });
            }
            if (_this.hpsFilter.val()) {
                f.push({ field: "hpPerSecond", type: ">=", value: _this.hpsFilter.val() });
            }
            if (_this.durationFilter.val()) {
                f.push({ field: "durationInMinutes", type: ">=", value: _this.durationFilter.val() });
            }
            if (f.length) {
                _this.table.setFilter(f);
            }
        }
        //
        document.getElementById("filter").addEventListener("click", function () {
            updateFilter();
        });
        //
        document.getElementById("filter-clear").addEventListener("click", function () {
            nameFilter.val('');
            tierFilter.selectpicker('val', ['1', '2', '3', '4', '5', '6']);
            starredFilter.selectpicker('val', ['y', 'n']);
            hpFilter.val('');
            staminaFilter.val('');
            eitrFilter.val('');
            typeFilter.selectpicker('val', ['W', 'Y', 'R', 'B']);
            hpsFilter.selectpicker('val', '');
            durationFilter.selectpicker('val', '');
            //
            clearFiltering();
        });
    }
    // ==========================================================================================
    function buildTableDate(data) {
        for (let [name, food] of Object.entries(data.food)) {
            let row = {
                id: food.id,
                name: food.name,
                tier: food.tier,
                starred: food.starred,// ? '★' : '',
                hp: food.hp,
                stamina: food.stamina,
                eitr: food.eitr,
                type: food.type.replace("white", "W").replace("yellow", "Y").replace("red", "R").replace("blue", "B"),
                hpPerSecond: food.hpPerSecond,
                durationInMinutes: food.durationInMinutes
            };
            for (let resource of _this.resources) {
                if (food.resources[resource]) {
                    row[resource] = food.resources[resource];
                } else {
                    row[resource] = '';
                }
            }
            _this.tabledata.push(row);
        }
    }
    // ==========================================================================================
    function buildTable(data) {
        _this.table = new Tabulator("#valheim-food-table", {
            //placeholder: "Awaiting Data",
            height: '700', // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
            data: _this.tabledata, //assign data to table
            //layout: "fitColumns", //fit columns to width of table (optional)
            //layout: "fitDataTable",
            //layoutColumnsOnNewData: true,
            // responsiveLayout:"hide", // hide rows that no longer fit
            // responsiveLayout:"collapse", // collapse columns that no longer fit on the table into a list under the row
            //resizableRows: true, // this option takes a boolean value (default = false)
            selectable: true, //make rows selectable
            columns: [
                {
                    title: "Name", field: "name", frozen: true, /*headerFilter: "input",*/ formatter: function (cell, formatterParams) {
                        let dat = cell.getData();
                        let value = cell.getValue();
                        let color = _this.tierColors[dat.tier];
                        let tt = "";
                        //console.log("data", dat, "value", value, "color", color);
                        for (let [n, c] of Object.entries(data.food[value].resources)) {
                            if (tt == "") {
                                tt = tt + c + " " + n;
                            } else {
                                tt = tt + "\n" + c + " " + n;
                            }
                        }
                        return '<div style="background-color:' + color + '" title="' + tt + '"><img width=32 height=32 src="images/' + value + '.png">&nbsp;' + value + '</div>';
                    }
                },
                {//create column group
                    title: "Info", frozen: true,
                    columns: [
                        {
                            title: "Tier", field: "tier", sorter: "number", headerVertical: true, hozAlign: "center" /*, headerFilter: "list", headerFilterParams: { valuesLookup: true, clearable: true }*/, formatter: function (cell, formatterParams) {
                                let dat = cell.getData();
                                let value = cell.getValue();
                                return "<span style='background-color:" + _this.tierColors[dat.tier] + ";display:block;width:100%;height:100%' title='meadows'>" + value + "</span>";
                            }
                        },
                        { title: "Starred", field: "starred", sorter: "boolean", headerVertical: true, hozAlign: "center", formatter: "tickCross"              /*, headerFilter: "tickCross", headerFilterParams: { "tristate": true }*/ },
                        { title: "HP", field: "hp", sorter: "number", headerVertical: true, hozAlign: "center"/*, headerFilter: "number" */ },
                        { title: "Stamina", field: "stamina", sorter: "number", headerVertical: true, hozAlign: "center"/*, headerFilter: "number"*/ },
                        { title: "Eitr", field: "eitr", sorter: "number", headerVertical: true, hozAlign: "center"/*, headerFilter: "number"*/ },
                        {
                            title: "Type", field: "type", headerVertical: true, hozAlign: "center"/*, headerFilter: "list", headerFilterParams: { valuesLookup: true, clearable: true }*/, formatter: function (cell, formatterParams) {
                                let value = cell.getValue();
                                if (value == "Y") {
                                    return "<span title='yellow' style='background-color:#ffff84;display:block;width:100%;height:100%'>Y</span>";
                                } else if (value == "R") {
                                    return "<span title='red' style='background-color:#ffc2c2;display:block;width:100%;height:100%'>R</span>";
                                } else if (value == "B") {
                                    return "<span title='blue' style='background-color:#b4c7dc;display:block;width:100%;height:100%'>B</span>";
                                } else if (value == "W") {
                                    return "<span title='white' style='background-color:#ddd;display:block;width:100%;height:100%'>W</span>";
                                } else {
                                    return value;
                                }
                            }
                        },
                        { title: "HP/s", field: "hpPerSecond", sorter: "number", headerVertical: true, hozAlign: "center", /*headerFilter: "list", headerFilterParams: { valuesLookup: true, clearable: true }*/ },
                        { title: "Duration (m)", field: "durationInMinutes", sorter: "number", headerVertical: true, hozAlign: "center"/*, headerFilter: "number"*/ },
                        {
                            title: "Score", field: "score", sorter: "number", headerVertical: true, mutator: (value, dat, type, params, component) => {
                                let score = (dat.hp + dat.stamina + dat.eitr) * dat.durationInMinutes;
                                return score;
                            }
                        }
                    ]
                },
                {//create column group
                    title: "Resources",
                    columns: resourceCols
                }
            ],
        });
        //
        _this.table.on("rowSelectionChanged", function (x, rows) {
            if (rows.length == 0) {
                $('#totalPoints').val('');
            } else if (rows.length > 3) {
                $('#totalPoints').val('TOO MANY ROWS SELECTED');
            } else {
                let totalHP = 0;
                let totalStamina = 0;
                let totalEitr = 0;
                let totalHPs = 0;
                let totalScore = 0;
                let dur = [];
                for (let row of rows) {
                    let dat = row.getData();
                    totalHP += dat.hp;
                    totalStamina += dat.stamina;
                    totalEitr += dat.eitr;
                    totalHPs += dat.hpPerSecond;
                    dur.push(dat.durationInMinutes);
                    totalScore += (dat.hp + dat.stamina + dat.eitr) * dat.durationInMinutes;
                }
                if (Math.min.apply(Math, dur) == Math.max.apply(Math, dur)) {
                    $('#totalPoints').val('SELECTED TOTAL: HP=' + totalHP + ' +' + totalHPs + '/s, Stamina=' + totalStamina + ', Eitr=' + totalEitr + ' [' + Math.min.apply(Math, dur) + 'm] > ' + totalScore + ' score');
                } else {
                    $('#totalPoints').val('SELECTED TOTAL: HP=' + totalHP + ' +' + totalHPs + '/s, Stamina=' + totalStamina + ', Eitr=' + totalEitr + ' [' + Math.min.apply(Math, dur) + '-' + Math.max.apply(Math, dur) + 'm] > ' + totalScore + ' score');
                }
            }
        });
        //
        _this.table.on("dataFiltered", function (filters, rows) {
            //filters - array of filters currently applied
            //rows - array of row components that pass the filters
            for (let resource of _this.resources) {
                let styleTag = document.getElementById("style-" + resource);
                if (styleTag) {
                    styleTag.disabled = true;
                }
            }
            if (filters.length > 0) {
                let keep = [];
                for (let row of rows) {
                    let dat = row.getData();
                    for (let resource of _this.resources) {
                        if (dat[resource]) {
                            keep.push(resource);
                        }
                    }
                }
                for (let resource of _this.resources) {
                    let styleTag = document.getElementById("style-" + resource);
                    if (styleTag) {
                        let styleTagDisabled = keep.indexOf(resource) != -1;
                        $('#check_' + resource.replace(' ', '_')).prop('checked', styleTagDisabled);
                        styleTag.disabled = styleTagDisabled;
                    }
                }
            }
        });
    }
    // ==========================================================================================
    function buildDataReset(data) {
        document.getElementById("json-clear").addEventListener("click", function () {
            window.localStorage.removeItem('valheim-food');
            location.reload();
        });
    }
    // ==========================================================================================
}
// ==========================================================================================
// ==========================================================================================
function fetchDataAgain() {
    fetch('valheim-food.json')
        .then((response) => response.json())
        .then((__data) => app(__data));
}
(() => {
    // ==========================================================================================
    $('.selectpicker').selectpicker();
    // ==========================================================================================
    try {
        let valheimFood = window.localStorage.getItem('valheim-food');
        if (valheimFood && valheimFood != undefined && valheimFood != null) {
            let __data = JSON.parse(valheimFood);
            let test = __data.headers;
            app(__data);
        } else {
            fetchDataAgain();
        }
    } catch (e) {
        console.error(e);
        fetchDataAgain();
    }
    // ==========================================================================================
})();
// ==========================================================================================
// ==========================================================================================