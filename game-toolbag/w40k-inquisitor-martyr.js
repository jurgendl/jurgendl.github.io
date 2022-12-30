// https://developer.mozilla.org/en-US/docs/Web/API/Response/json
(() => {

  const emptyImage = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
  const defaultSelectedId = 'Phosphoenic Psalm + Technomartyr Psalm + Neuralis Psalm + Binharic Psalm';

  function setupPageData(data) {

    /*
    <select data-live-search="true" _data-header="Select a Psalm Doctrine" style="width: 90%;" id="selectDoctrine" name="selectDoctrine" _class="custom-select custom-select-sm" _class="selectpicker" data-style="btn-primary">
    </select>
    */

    $('#selectDoctrineContainer').html('').append(
      $('<select/>')
        .attr('id', 'selectDoctrine')
        .attr('name', 'selectDoctrine')
        .attr('data-live-search', 'true')
        .attr('data-style', 'btn-light')
        .append($('<option>', {})
          .text(""))
    );

    function levelForPsalm(psalm_name) {
      var lvl = '';
      $.each(data.psalms, function (key, psalm) {
        if (psalm.name == psalm_name) {
          lvl = psalm.level;
        }
      });
      return lvl;
    }

    $.each(data.doctrines, function (key, doctrine) {

      var canBeEnabled = true;
      var psalmList = '';

      $.each(doctrine.psalms, function (key, psalm_name) {
        psalmList += '<span class="psalm_list ' + psalm_name.replace(' ', '_') + ' ' + levelForPsalm(psalm_name) + '">' + psalm_name + '</span>';

        $.each(data.psalms, function (key, psalm) {
          if (psalm.name == psalm_name) {
            if ('Archeotech' == psalm.level) {
              if (window.localStorage.getItem(psalm_name) == 'true') {
                console.log(doctrine.id + ' / ' + psalm_name + ' YES');
              } else {
                console.log(doctrine.id + ' / ' + psalm_name + ' NO');
                canBeEnabled = false;
              }
            }
          }
        });

      });

      console.log('-- ' + doctrine.id + ' / ' + canBeEnabled);

      if (canBeEnabled) {

        $('#selectDoctrine')
          .append($('<option>', {
            //'disabled': 'disabled',
            'value': doctrine.id //
            //, 'data-subtext': doctrine.id//
            , 'data-content': //
              '<div style="font-weight: bold;">' + doctrine.description + '</div>' +//
              '<div style="font-weight: bold; font-size: smaller;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + psalmList + '</div>'
          })
            .text(doctrine.description));

      } else {

        $('#selectDoctrine')
          .append($('<option>', {
            'value': doctrine.id //
            //, 'data-subtext': doctrine.id//
            , 'data-content': //
              '<div style="font-weight: bold;">' + doctrine.description + '</div>' +//
              '<div style="font-weight: bold; font-size: smaller;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + psalmList + '</div>'
          })
            .text(doctrine.description));

      }

    });

    let is_idx = 1;
    $.each(data.psalms, function (key, psalm) {
      if ('Archeotech' === psalm.level) {
        //console.log(psalm);
        let idddd = '#is' + is_idx;
        $(idddd).attr('src', "data:image/png;base64," + psalm.image);
        idddd = '#check' + is_idx;
        $(idddd).attr('value', psalm.name);
        if (window.localStorage.getItem(psalm.name) == true) {
          $(idddd).attr('checked', 'checked');
        }
        idddd = '#lbl' + is_idx;
        $(idddd).text(psalm.name);
        is_idx++;
      }
    });

    function checkChange(evt) {
      // console.log(evt.target);
      // console.log(evt.target.checked);
      window.localStorage.setItem($(evt.target).attr('value'), evt.target.checked);
    }
    $("#check1").change(evt => checkChange(evt));
    $("#check2").change(evt => checkChange(evt));
    $("#check3").change(evt => checkChange(evt));
    $("#check4").change(evt => checkChange(evt));
    $("#check5").change(evt => checkChange(evt));

    document.querySelector('#selectDoctrine').value = defaultSelectedId;

    // https://developer.snapappointments.com/bootstrap-select/
    $('#selectDoctrine').selectpicker();

    function selectDoctrineChange() {
      let choiceDoctrine = $("#selectDoctrine").find('option:selected').val();
      //console.log(choiceDoctrine);
      $.each(data.doctrines, function (key, doctrine) {
        //console.log(doctrine.id);
        if (doctrine.id == choiceDoctrine) {
          //console.log(doctrine);
          $("#description").html(doctrine.description);
          for (let i = 0; i < 6; i++) {
            let pi = $("#p" + i);
            pi.attr("src", emptyImage);
            pi.attr("title", "");
            let di = $("#description" + i);
            di.text(" ");
            di.attr("class", "");
          }

          doctrine.psalms.forEach((element, index) => {
            //console.log(index + ": " + element);
            let psalm = data.psalms.find(pe => pe.name == element);
            //console.log(psalm.name);
            $("#p" + (index + 1)).attr("src", "data:image/png;base64," + psalm.image);
            $("#p" + (index + 1)).attr("title", psalm.name);
            $("#description" + (index + 1)).html('<u><b>' + psalm.name + '</b></u>: ' + psalm.description);
            $("#description" + (index + 1)).attr("class", psalm.level);
          });
          //console.log("---------------");
        }
      });
    };

    $("#selectDoctrine").change(selectDoctrineChange);

    selectDoctrineChange();
  }

  fetch('https://jurgendl.github.io/game-toolbag/w40k-inquisitor-martyr-code.json')
    .then((response) => response.json())
    .then((data) => setupPageData(data));

})();