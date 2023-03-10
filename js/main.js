var $checkboxButtons = document.querySelectorAll('.checkbox');
function handleAgentCheckedBox(event) {
  $overlay.classList.remove('hidden');
  if (event.target.matches('.filter-option')) {
    var $checkboxTarget = event.target.getAttribute('id');
    var $checkbox = document.querySelector('.checked-box');
    if (event.target.contains($checkbox)) {
      $checkbox.classList.remove('checked-box');
      var $none = document.querySelector('#none');
      $none.classList.add('checked-box');
      $overlay.classList.remove('hidden');
      renderAgentList('agents');
    } else {
      for (let index = 0; index < $checkboxButtons.length; index++) {
        $checkboxButtons[index].classList.remove('checked-box');

      }

      $checkboxTarget = '.checkbox-' + $checkboxTarget;
      $checkboxTarget = document.querySelector($checkboxTarget);
      $checkboxTarget.classList.add('checked-box');
      $overlay.classList.remove('hidden');
      renderAgentList('agents');
    }

  } else {
    $checkboxTarget = event.target.parentNode.parentNode.getAttribute('id');
    $checkbox = document.querySelector('.checked-box');
    if ($checkbox.parentNode.parentNode === event.target.parentNode.parentNode) {
      $checkbox.classList.remove('checked-box');
      $none = document.querySelector('#none');
      $none.classList.add('checked-box');
      $overlay.classList.remove('hidden');
      renderAgentList('agents');
    } else {
      for (let index = 0; index < $checkboxButtons.length; index++) {
        $checkboxButtons[index].classList.remove('checked-box');
      }
      $checkboxTarget = '.checkbox-' + $checkboxTarget;
      $checkboxTarget = document.querySelector($checkboxTarget);
      $checkboxTarget.classList.add('checked-box');
      $overlay.classList.remove('hidden');
      renderAgentList('agents');
    }
  }
}

var $noFilter = document.querySelector('#no-filter');
var $controllers = document.querySelector('#controllers');
var $duelists = document.querySelector('#duelists');
var $initiators = document.querySelector('#initiators');
var $sentinels = document.querySelector('#sentinels');

$noFilter.addEventListener('click', handleAgentCheckedBox);
$controllers.addEventListener('click', handleAgentCheckedBox);
$duelists.addEventListener('click', handleAgentCheckedBox);
$initiators.addEventListener('click', handleAgentCheckedBox);
$sentinels.addEventListener('click', handleAgentCheckedBox);

function handleWeaponCheckedBox(event) {
  $overlay.classList.remove('hidden');
  if (event.target.matches('.filter-option')) {
    var $checkboxTarget = event.target.getAttribute('id');
    var $checkbox = document.querySelector('.checked-box');
    if (event.target.contains($checkbox)) {
      $checkbox.classList.remove('checked-box');
      var $none = document.querySelector('#weapon-none');
      $none.classList.add('checked-box');
      $overlay.classList.remove('hidden');
      renderWeaponList('weapons');
    } else {
      for (let index = 0; index < $checkboxButtons.length; index++) {
        $checkboxButtons[index].classList.remove('checked-box');

      }

      $checkboxTarget = '.checkbox-' + $checkboxTarget;
      $checkboxTarget = document.querySelector($checkboxTarget);
      $checkboxTarget.classList.add('checked-box');
      $overlay.classList.remove('hidden');
      renderWeaponList('weapons');
    }

  } else {
    $checkboxTarget = event.target.parentNode.parentNode.getAttribute('id');
    $checkbox = document.querySelector('.checked-box');
    if ($checkbox.parentNode.parentNode === event.target.parentNode.parentNode) {
      $checkbox.classList.remove('checked-box');
      $none = document.querySelector('#weapon-none');
      $none.classList.add('checked-box');
      $overlay.classList.remove('hidden');
      renderWeaponList('weapons');
    } else {
      for (let index = 0; index < $checkboxButtons.length; index++) {
        $checkboxButtons[index].classList.remove('checked-box');
      }
      $checkboxTarget = '.checkbox-' + $checkboxTarget;
      $checkboxTarget = document.querySelector($checkboxTarget);
      $checkboxTarget.classList.add('checked-box');
      $overlay.classList.remove('hidden');
      renderWeaponList('weapons');
    }
  }
}

var $checkedBox = document.querySelector('.checked-box');
$checkedBox = $checkedBox.getAttribute('id');

var $viewNodes = document.querySelectorAll('.view');
var $navBar = document.querySelector('.navbar');

$navBar.addEventListener('click', handleViewSwap);

function handleViewSwap(event, pageView) {
  var $dataViewAttribute;
  var $apiValue;

  if (pageView) {
    $dataViewAttribute = pageView;
    $apiValue = 'agents';
  } else {
    if (!event.target.matches('.navbar-item')) {
      return undefined;
    } else {
      $dataViewAttribute = event.target.textContent;
      $dataViewAttribute = $dataViewAttribute.toLowerCase();
      $apiValue = $dataViewAttribute;

    }
  }
  for (let view = 0; view < $viewNodes.length; view++) {
    $viewNodes[view].classList.add('hidden');
  }
  if ($dataViewAttribute === 'valochecker') {

    $dataViewAttribute = 'homepage';
  }
  $dataViewAttribute = '[data-view=' + $dataViewAttribute + ']';
  $dataViewAttribute = document.querySelector($dataViewAttribute);
  $dataViewAttribute.classList.remove('hidden');

  if ($dataViewAttribute.getAttribute('data-view') === 'homepage') {
    return undefined;
  } else if ($apiValue === 'agents') {
    var $allCheckboxes = document.querySelectorAll('.checkbox');
    for (let checkbox = 0; checkbox < $allCheckboxes.length; checkbox++) {
      $allCheckboxes[checkbox].classList.remove('checked-box');
    }
    var $noFilterCheckbox = document.querySelector('.checkbox-no-filter');
    $noFilterCheckbox.classList.add('checked-box');
  } else if ($apiValue === 'weapons') {
    $allCheckboxes = document.querySelectorAll('.checkbox');
    for (let checkbox = 0; checkbox < $allCheckboxes.length; checkbox++) {
      $allCheckboxes[checkbox].classList.remove('checked-box');
    }
    var $weaponNoFilterCheckbox = document.querySelector('.checkbox-weapon-no-filter');
    $weaponNoFilterCheckbox.classList.add('checked-box');
  }
  if ($apiValue === 'agents') {
    $overlay.classList.remove('hidden');
    renderAgentList($apiValue);
  } else if ($apiValue === 'weapons') {
    $overlay.classList.remove('hidden');
    renderWeaponList('weapons');
  }

}

var $agentsTable = document.querySelector('.agents-table');

var $tbody = document.querySelector('tbody');

function handleIndividualAgent(event) {
  var $agent = event.target.closest('tr').getAttribute('id');
  $overlay.classList.remove('hidden');
  renderIndividualAgent($agent);
  handleViewSwap('click', 'individual-agent');
}

var $abilities = document.querySelector('.abilities');
$abilities.addEventListener('click', handleIndividualAbility);

function handleIndividualAbility(event) {
  if (!event.target.matches('h3') && !event.target.matches('img')) {
    return undefined;
  }
  var $currentAgent = document.querySelector('[data-view="individual-agent"] .agent-name');
  $currentAgent = $currentAgent.textContent;
  var $clickedAbility = event.target.closest('div');
  $clickedAbility = $clickedAbility.getAttribute('id');
  $overlay.classList.remove('hidden');
  renderIndividualAbility($currentAgent, $clickedAbility);
  handleViewSwap('click', 'individual-ability');
}

function renderIndividualAbility(name, ability) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://valorant-api.com/v1/agents');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    for (let agent = 0; agent < xhr.response.data.length; agent++) {
      if (xhr.response.data[agent].isPlayableCharacter === true && xhr.response.data[agent].displayName === name) {
        var $abilityHeader = document.querySelector('[data-view="individual-ability"] p');
        var $abilityIcon = document.querySelector('.individual-ability-icon');
        var $abilityAgentPortrait = document.querySelector('.ability-agent-portrait');
        $abilityAgentPortrait.addEventListener('error', handlePortraitImageError);
        var $abilityAgentBackground = document.querySelector('.ability-agent-background');
        $abilityAgentBackground.addEventListener('error', handleBackgroundImageError);
        var $abilityAgentPortraitUrl = xhr.response.data[agent].fullPortraitV2;
        $abilityAgentPortrait.setAttribute('src', $abilityAgentPortraitUrl);
        var $abilityAgentBackgroundUrl = xhr.response.data[agent].background;
        $abilityAgentBackground.setAttribute('src', $abilityAgentBackgroundUrl);
        for (let singleAbility = 0; singleAbility < xhr.response.data[agent].abilities.length; singleAbility++) {
          if (xhr.response.data[agent].abilities[singleAbility].slot === ability) {
            $abilityHeader.textContent = xhr.response.data[agent].abilities[singleAbility].displayName;
            var $abilityDescription = document.querySelector('.ability-description');
            $abilityDescription.textContent = xhr.response.data[agent].abilities[singleAbility].description;
            if (xhr.response.data[agent].abilities[singleAbility].slot === 'Passive') {
              var $ability1IconUrl = xhr.response.data[agent].displayIcon;
              $abilityIcon.addEventListener('error', handleImageError);
              $abilityIcon.setAttribute('src', $ability1IconUrl);
            } else {
              $ability1IconUrl = xhr.response.data[agent].abilities[singleAbility].displayIcon;
              $abilityIcon.setAttribute('src', $ability1IconUrl);
              $abilityIcon.addEventListener('error', handleImageError);

            }
          }
        }

      }
    }
    $overlay.classList.add('hidden');
  });
  xhr.send();
}

function renderAgentList(value) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://valorant-api.com/v1/' + value);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var $tbody = document.querySelector('.agents-table-body');

    if ($tbody) {
      $tbody.remove();
    }
    var $newTbody = document.createElement('tbody');
    $checkedBox = document.querySelector('.checked-box');
    $checkedBox = $checkedBox.getAttribute('id');

    for (let agent = 0; agent < xhr.response.data.length; agent++) {
      if (xhr.response.data[agent].isPlayableCharacter === true && $checkedBox === 'none') {
        var $newAgent = document.createElement('tr');
        var $newAgentName = document.createElement('td');
        var $newAgentProfile = document.createElement('td');
        var $newAgentProfileUrl = document.createElement('img');
        $newAgentProfileUrl.addEventListener('error', handleImageError);
        var $newPortraitFrame = document.createElement('div');
        $newPortraitFrame.setAttribute('class', 'table-portrait');

        $newAgentProfileUrl.setAttribute('src', xhr.response.data[agent].killfeedPortrait);
        $newAgentProfileUrl.addEventListener('error', handleImageError);
        $newPortraitFrame.appendChild($newAgentProfileUrl);
        $newAgentProfile.appendChild($newPortraitFrame);
        $newAgentName.textContent = xhr.response.data[agent].displayName;
        $newAgent.setAttribute('id', xhr.response.data[agent].displayName);
        $newAgent.appendChild($newAgentName);
        $newAgent.appendChild($newAgentProfile);

        $newTbody.appendChild($newAgent);

      } else if (xhr.response.data[agent].isPlayableCharacter === true && xhr.response.data[agent].role.displayName === $checkedBox) {
        $newAgent = document.createElement('tr');

        $newAgentName = document.createElement('td');
        $newAgentProfile = document.createElement('td');
        $newAgentProfileUrl = document.createElement('img');
        $newAgentProfileUrl.addEventListener('error', handleImageError);
        $newPortraitFrame = document.createElement('div');
        $newPortraitFrame.setAttribute('class', 'table-portrait');

        $newAgentProfileUrl.setAttribute('src', xhr.response.data[agent].killfeedPortrait);
        $newPortraitFrame.appendChild($newAgentProfileUrl);
        $newAgentProfile.appendChild($newPortraitFrame);
        $newAgentName.textContent = xhr.response.data[agent].displayName;
        $newAgent.setAttribute('id', xhr.response.data[agent].displayName);
        $newAgent.appendChild($newAgentName);
        $newAgent.appendChild($newAgentProfile);

        $newTbody.appendChild($newAgent);
      }
    }
    $newTbody.appendChild($newAgent);
    $newTbody.classList.add('agents-table-body');
    $agentsTable.appendChild($newTbody);
    var $agentsTbody = document.querySelector('.agents-table-body');
    $agentsTbody.addEventListener('click', handleIndividualAgent);
    $overlay.classList.add('hidden');
  });

  xhr.send();
}
var $overlay = document.querySelector('.overlay');

function renderIndividualAgent(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://valorant-api.com/v1/agents');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (let agent = 0; agent < xhr.response.data.length; agent++) {
      if (xhr.response.data[agent].isPlayableCharacter === true && xhr.response.data[agent].displayName === name) {
        var $agentName = document.querySelector('.agent-name');
        $agentName.textContent = xhr.response.data[agent].displayName;
        var $agentBio = document.querySelector('.bio');
        $agentBio.textContent = xhr.response.data[agent].description;
        var $agentRole = document.querySelector('.agent-role');
        $agentRole.addEventListener('error', handleImageError);
        var $agentRoleIcon = xhr.response.data[agent].role.displayIcon;
        $agentRole.setAttribute('src', $agentRoleIcon);
        var $agentPortrait = document.querySelector('.agent-portrait');
        $agentPortrait.addEventListener('error', handlePortraitImageError);
        var $agentPortraitUrl = xhr.response.data[agent].fullPortraitV2;
        $agentPortrait.setAttribute('src', $agentPortraitUrl);
        var $agentBackground = document.querySelector('.agent-background');
        $agentBackground.addEventListener('error', handleBackgroundImageError);
        var $agentBackgroundUrl = xhr.response.data[agent].background;
        $agentBackground.setAttribute('src', $agentBackgroundUrl);
        var $ability1Text = document.querySelector('.ability-1-text');
        $ability1Text.textContent = xhr.response.data[agent].abilities[0].displayName;
        var $ability1Icon = document.querySelector('.ability-1-icon');
        $ability1Icon.addEventListener('error', handleImageError);
        var $ability1IconUrl = xhr.response.data[agent].abilities[0].displayIcon;
        $ability1Icon.setAttribute('src', $ability1IconUrl);
        var $ability2Text = document.querySelector('.ability-2-text');
        $ability2Text.textContent = xhr.response.data[agent].abilities[1].displayName;
        var $ability2Icon = document.querySelector('.ability-2-icon');
        $ability2Icon.addEventListener('error', handleImageError);
        var $ability2IconUrl = xhr.response.data[agent].abilities[1].displayIcon;
        $ability2Icon.setAttribute('src', $ability2IconUrl);
        var $grenadeText = document.querySelector('.grenade-text');
        $grenadeText.textContent = xhr.response.data[agent].abilities[2].displayName;
        var $grenadeIcon = document.querySelector('.grenade-icon');
        $grenadeIcon.addEventListener('error', handleImageError);
        var $grenadeIconUrl = xhr.response.data[agent].abilities[2].displayIcon;
        $grenadeIcon.setAttribute('src', $grenadeIconUrl);
        var $ultimateText = document.querySelector('.ultimate-text');
        $ultimateText.textContent = xhr.response.data[agent].abilities[3].displayName;
        var $ultimateIcon = document.querySelector('.ultimate-icon');
        $ultimateIcon.addEventListener('error', handleImageError);
        var $ultimateIconUrl = xhr.response.data[agent].abilities[3].displayIcon;
        $ultimateIcon.setAttribute('src', $ultimateIconUrl);
        var $passiveContainer = document.querySelector('.passive-container');
        if (xhr.response.data[agent].abilities[4]) {
          $passiveContainer.classList.remove('hidden');
          var $passiveIcon = document.querySelector('.passive-icon');
          var $passiveIconUrl = xhr.response.data[agent].displayIcon;
          $passiveIcon.setAttribute('src', $passiveIconUrl);
        } else {

          $passiveContainer.classList.add('hidden');
        }
      }
    }
    $overlay.classList.add('hidden');
  });
  xhr.send();
}

var $buttonBackAbility = document.querySelector('.individual-agent');
var $buttonBackAgent = document.querySelector('.agents');
var $buttonBackWeapons = document.querySelector('.weapons');
function handleButton(event) {
  var $viewBackSwap = event.target.className;
  handleViewSwap('click', $viewBackSwap);
}
$buttonBackAbility.addEventListener('click', handleButton);
$buttonBackAgent.addEventListener('click', handleButton);
$buttonBackWeapons.addEventListener('click', handleButton);

var $weaponNoFilter = document.querySelector('#weapon-no-filter');
var $sidearms = document.querySelector('#sidearms');
var $smgs = document.querySelector('#smgs');
var $shotguns = document.querySelector('#shotguns');
var $rifles = document.querySelector('#rifles');
var $sniperRifles = document.querySelector('#sniper-rifles');
var $machineGuns = document.querySelector('#machine-guns');
var $melee = document.querySelector('#knife');

$weaponNoFilter.addEventListener('click', handleWeaponCheckedBox);
$sidearms.addEventListener('click', handleWeaponCheckedBox);
$smgs.addEventListener('click', handleWeaponCheckedBox);
$shotguns.addEventListener('click', handleWeaponCheckedBox);
$rifles.addEventListener('click', handleWeaponCheckedBox);
$sniperRifles.addEventListener('click', handleWeaponCheckedBox);
$machineGuns.addEventListener('click', handleWeaponCheckedBox);
$melee.addEventListener('click', handleWeaponCheckedBox);

function renderWeaponList(value) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://valorant-api.com/v1/' + value);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $tbody = document.querySelector('[data-view="weapons"] tbody');
    if ($tbody) {
      $tbody.remove();
    }
    $checkedBox = document.querySelector('.checked-box');
    $checkedBox = $checkedBox.getAttribute('id');

    var $newTbody = document.createElement('tbody');

    if ($checkedBox === 'none' || $checkedBox === 'weapon-none') {
      for (let weapon = 0; weapon < xhr.response.data.length; weapon++) {
        var $newWeapon = document.createElement('tr');
        var $newWeaponName = document.createElement('td');
        var $newWeaponIcon = document.createElement('td');
        var $newWeaponIconUrl = document.createElement('img');
        $newWeaponIconUrl.addEventListener('error', handleImageError);
        var $newPortraitFrame = document.createElement('div');
        $newPortraitFrame.setAttribute('class', 'table-portrait');

        $newWeaponIconUrl.setAttribute('src', xhr.response.data[weapon].displayIcon);
        $newPortraitFrame.appendChild($newWeaponIconUrl);
        $newWeaponIcon.appendChild($newPortraitFrame);
        $newWeaponName.textContent = xhr.response.data[weapon].displayName;
        $newWeapon.setAttribute('id', xhr.response.data[weapon].displayName);
        $newWeapon.appendChild($newWeaponName);
        $newWeapon.appendChild($newWeaponIcon);

        $newTbody.appendChild($newWeapon);
        $newTbody.classList.add('weapons-table-body');
      }
    } else {
      $checkedBox = 'EEquippableCategory::' + $checkedBox;
      for (let weapon = 0; weapon < xhr.response.data.length; weapon++) {
        if (xhr.response.data[weapon].category === $checkedBox) {

          $newWeapon = document.createElement('tr');
          $newWeaponName = document.createElement('td');
          $newWeaponIcon = document.createElement('td');
          $newWeaponIconUrl = document.createElement('img');
          $newWeaponIconUrl.addEventListener('error', handleImageError);
          $newPortraitFrame = document.createElement('div');
          $newPortraitFrame.setAttribute('class', 'table-portrait');

          $newWeaponIconUrl.setAttribute('src', xhr.response.data[weapon].displayIcon);
          $newPortraitFrame.appendChild($newWeaponIconUrl);
          $newWeaponIcon.appendChild($newPortraitFrame);
          $newWeaponName.textContent = xhr.response.data[weapon].displayName;
          $newWeapon.setAttribute('id', xhr.response.data[weapon].displayName);
          $newWeapon.appendChild($newWeaponName);
          $newWeapon.appendChild($newWeaponIcon);

          $newTbody.appendChild($newWeapon);
          $newTbody.classList.add('weapons-table-body');
        }

      }
    }

    var $weaponsTable = document.querySelector('.weapons-table');

    $weaponsTable.appendChild($newTbody);
    var $weaponsTbody = document.querySelector('.weapons-table-body');
    $weaponsTbody.addEventListener('click', handleIndividualWeapon);
    $overlay.classList.add('hidden');
  });

  xhr.send();
}

function handleIndividualWeapon(event) {
  var $weapon = event.target.closest('tr').getAttribute('id');
  $overlay.classList.remove('hidden');
  renderIndividualWeapon($weapon);
  handleViewSwap('click', 'individual-weapon');
}

function renderIndividualWeapon(weapon) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://valorant-api.com/v1/weapons');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $tbody = document.querySelector('.individual-weapons-table tbody');
    if ($tbody) {
      $tbody.remove();
    }
    for (let singleWeapon = 0; singleWeapon < xhr.response.data.length; singleWeapon++) {

      if (xhr.response.data[singleWeapon].displayName === weapon) {
        var $weaponName = document.querySelector('.weapon-name');
        $weaponName.textContent = xhr.response.data[singleWeapon].displayName;
        var $individualWeaponIcon = document.querySelector('.individual-weapon-icon');
        $individualWeaponIcon.addEventListener('error', handleImageError);
        var $individualWeaponIconUrl = xhr.response.data[singleWeapon].displayIcon;
        $individualWeaponIcon.setAttribute('src', $individualWeaponIconUrl);

        var $newTbody = document.createElement('tbody');
        if (xhr.response.data[singleWeapon].displayName === 'Melee') {
          var meleeStats = {
            Range: '0-8 meters',
            'Primary Fire Front Stab': 50,
            'Primary Fire Back Stab': 100,
            'Alt Fire Front Stab': 75,
            'Alt Fire Back Stab': 150
          };
          for (const singleStat in meleeStats) {
            var $newWeaponStatRow = document.createElement('tr');
            var $newWeaponStat = document.createElement('td');
            var $newWeaponValue = document.createElement('td');
            $newWeaponStat.textContent = singleStat;
            $newWeaponValue.textContent = meleeStats[singleStat];
            $newWeaponStatRow.appendChild($newWeaponStat);
            $newWeaponStatRow.appendChild($newWeaponValue);

            $newTbody.appendChild($newWeaponStatRow);
          }
          $newTbody.classList.add('weapons-tbody');

        } else {
          $newWeaponStatRow = document.createElement('tr');
          $newWeaponStat = document.createElement('td');
          $newWeaponValue = document.createElement('td');
          $newWeaponStat.textContent = 'Cost';
          $newWeaponValue.textContent = xhr.response.data[singleWeapon].shopData.cost;
          $newWeaponStatRow.appendChild($newWeaponStat);
          $newWeaponStatRow.appendChild($newWeaponValue);
          $newTbody.appendChild($newWeaponStatRow);
          for (const singleStat in xhr.response.data[singleWeapon].weaponStats) {

            if (typeof xhr.response.data[singleWeapon].weaponStats[singleStat] === typeof '' || typeof xhr.response.data[singleWeapon].weaponStats[singleStat] === typeof 1) {
              if (xhr.response.data[singleWeapon].shopData.category === 'Shotguns' || xhr.response.data[singleWeapon].displayName === 'Shorty') {
                $newWeaponStatRow = document.createElement('tr');
                $newWeaponStat = document.createElement('td');
                var $fixedSingleStat = '';
                $fixedSingleStat += singleStat[0].toUpperCase();
                for (let index = 1; index < singleStat.length; index++) {
                  if (singleStat[index].toLowerCase() === singleStat[index]) {
                    $fixedSingleStat += singleStat[index];
                  } else {
                    $fixedSingleStat += ' ' + singleStat[index].toUpperCase();
                  }
                }
                $newWeaponStat.textContent = $fixedSingleStat;
                $newWeaponValue = document.createElement('td');
                var $weaponStatValue = xhr.response.data[singleWeapon].weaponStats[singleStat];
                if (typeof $weaponStatValue !== typeof '') {
                  if (singleStat === 'firstBulletAccuracy') {
                    var $fixedWeaponStatValue = 100 - $weaponStatValue + '%';
                    $newWeaponValue.textContent = $fixedWeaponStatValue;

                    $newWeaponStatRow.appendChild($newWeaponStat);
                    $newWeaponStatRow.appendChild($newWeaponValue);
                    $newTbody.appendChild($newWeaponStatRow);
                  } else {

                    $newWeaponValue.textContent = $weaponStatValue;
                    $newWeaponStatRow.appendChild($newWeaponStat);
                    $newWeaponStatRow.appendChild($newWeaponValue);
                    $newTbody.appendChild($newWeaponStatRow);
                  }

                } else {
                  $fixedWeaponStatValue = '';
                  for (let index = 0; index < $weaponStatValue.length; index++) {
                    if ($weaponStatValue[index] === ':') {
                      $fixedWeaponStatValue = '';
                    } else {
                      $fixedWeaponStatValue += $weaponStatValue[index];
                    }
                  }
                  $weaponStatValue = $fixedWeaponStatValue[0];
                  for (let index = 1; index < $fixedWeaponStatValue.length; index++) {
                    if ($fixedWeaponStatValue[index] === $fixedWeaponStatValue[index].toUpperCase() && $fixedWeaponStatValue[index - 1] === $fixedWeaponStatValue[index - 1].toLowerCase()) {
                      $weaponStatValue += ' ' + $fixedWeaponStatValue[index];
                    } else {
                      $weaponStatValue += $fixedWeaponStatValue[index];
                    }
                  }

                  $newWeaponValue.textContent = $weaponStatValue;
                  $newWeaponStatRow.appendChild($newWeaponStat);
                  $newWeaponStatRow.appendChild($newWeaponValue);
                  $newTbody.appendChild($newWeaponStatRow);

                }
              } else if (singleStat !== 'shotgunPelletCount') {
                $newWeaponStatRow = document.createElement('tr');
                $newWeaponStat = document.createElement('td');
                $fixedSingleStat = '';
                $fixedSingleStat += singleStat[0].toUpperCase();
                for (let index = 1; index < singleStat.length; index++) {
                  if (singleStat[index].toLowerCase() === singleStat[index]) {
                    $fixedSingleStat += singleStat[index];
                  } else {
                    $fixedSingleStat += ' ' + singleStat[index].toUpperCase();
                  }
                }
                $newWeaponStat.textContent = $fixedSingleStat;

                $newWeaponValue = document.createElement('td');
                $weaponStatValue = xhr.response.data[singleWeapon].weaponStats[singleStat];
                if (typeof $weaponStatValue !== typeof '') {
                  if (singleStat === 'firstBulletAccuracy') {
                    $fixedWeaponStatValue = 100 - $weaponStatValue + '%';
                    $newWeaponValue.textContent = $fixedWeaponStatValue;

                    $newWeaponStatRow.appendChild($newWeaponStat);
                    $newWeaponStatRow.appendChild($newWeaponValue);
                    $newTbody.appendChild($newWeaponStatRow);
                  } else {
                    $newWeaponValue.textContent = $weaponStatValue;
                    $newWeaponStatRow.appendChild($newWeaponStat);
                    $newWeaponStatRow.appendChild($newWeaponValue);
                    $newTbody.appendChild($newWeaponStatRow);
                  }
                } else {
                  $fixedWeaponStatValue = '';
                  for (let index = 0; index < $weaponStatValue.length; index++) {
                    if ($weaponStatValue[index] === ':') {
                      $fixedWeaponStatValue = '';
                    } else {
                      $fixedWeaponStatValue += $weaponStatValue[index];
                    }
                  }
                  $weaponStatValue = $fixedWeaponStatValue[0];
                  for (let index = 1; index < $fixedWeaponStatValue.length; index++) {
                    if ($fixedWeaponStatValue[index] === $fixedWeaponStatValue[index].toUpperCase() && $fixedWeaponStatValue[index - 1] === $fixedWeaponStatValue[index - 1].toLowerCase()) {
                      $weaponStatValue += ' ' + $fixedWeaponStatValue[index];
                    } else if ($fixedWeaponStatValue[index] === $fixedWeaponStatValue[index].toUpperCase() && $fixedWeaponStatValue[index - 1] === $fixedWeaponStatValue[index - 1].toUpperCase() && $fixedWeaponStatValue[index + 1] && $fixedWeaponStatValue[index + 1] === $fixedWeaponStatValue[index + 1].toLowerCase()) {
                      $weaponStatValue += ' ' + $fixedWeaponStatValue[index];
                    } else {
                      $weaponStatValue += $fixedWeaponStatValue[index];
                    }
                  }

                  $newWeaponValue.textContent = $weaponStatValue;
                  $newWeaponStatRow.appendChild($newWeaponStat);
                  $newWeaponStatRow.appendChild($newWeaponValue);
                  $newTbody.appendChild($newWeaponStatRow);
                }

              }

            }

          }
          if (xhr.response.data[singleWeapon].weaponStats.damageRanges) {
            var damageRanges = xhr.response.data[singleWeapon].weaponStats.damageRanges;
            for (let index = 0; index < damageRanges.length; index++) {
              for (const damageRange in damageRanges[index]) {
                if (damageRange.includes('Start')) {
                  var rangeStart = damageRanges[index][damageRange];
                } else if (damageRange.includes('End')) {
                  var rangeEnd = damageRanges[index][damageRange];
                }
                if (!damageRange.includes('range')) {
                  $newWeaponStatRow = document.createElement('tr');
                  $newWeaponStat = document.createElement('td');
                  $newWeaponValue = document.createElement('td');
                  var $fixedDamageStat = '';
                  $fixedDamageStat += damageRange[0].toUpperCase();
                  for (let index = 1; index < damageRange.length; index++) {
                    if (damageRange[index].toLowerCase() === damageRange[index]) {
                      $fixedDamageStat += damageRange[index];
                    } else {
                      $fixedDamageStat += ' ' + damageRange[index].toUpperCase();
                    }
                  }
                  $newWeaponStat.textContent = $fixedDamageStat + ' (' + rangeStart + '-' + rangeEnd + ' meters)';
                  var damageRangeValue = damageRanges[index][damageRange];
                  var damageRangeValueString = damageRangeValue + '';
                  if (damageRangeValueString.length > 5) {
                    var flattenedDamageRangeValue = '';
                    for (let index = 0; index < 5; index++) {
                      flattenedDamageRangeValue += damageRangeValueString[index];
                    }
                    damageRangeValue = flattenedDamageRangeValue * 1;
                  }
                  $newWeaponValue.textContent = damageRangeValue;
                  $newWeaponStatRow.appendChild($newWeaponStat);
                  $newWeaponStatRow.appendChild($newWeaponValue);
                  $newTbody.appendChild($newWeaponStatRow);
                  $newTbody.classList.add('weapons-tbody');
                }

              }
            }
          }

        }

        var $individualWeaponTable = document.querySelector('.individual-weapons-table');
        $individualWeaponTable.appendChild($newTbody);
      }
    }
    $overlay.classList.add('hidden');
  });
  xhr.send();
}

function handleImageError(event) {
  event.target.setAttribute('src', './images/error.webp');
}

function handlePortraitImageError(event) {
  event.target.setAttribute('src', './images/portrait-error.webp');

}

function handleBackgroundImageError(event) {
  event.target.setAttribute('src', './images/background-error.webp');

}
