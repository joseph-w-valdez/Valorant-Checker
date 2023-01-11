var $checkboxButtons = document.querySelectorAll('.checkbox');
function handleCheckedBox(event) {
  for (let index = 0; index < $checkboxButtons.length; index++) {
    $checkboxButtons[index].classList.remove('checked-box');
  }
  var $checkboxTarget = event.target.parentNode.parentNode.getAttribute('id');
  $checkboxTarget = '.checkbox-' + $checkboxTarget;
  $checkboxTarget = document.querySelector($checkboxTarget);
  $checkboxTarget.classList.add('checked-box');
  useApi('agents');
}

var $noFilter = document.querySelector('#no-filter');
var $controllers = document.querySelector('#controllers');
var $duelists = document.querySelector('#duelists');
var $initiators = document.querySelector('#initiators');
var $sentinels = document.querySelector('#sentinels');

$noFilter.addEventListener('click', handleCheckedBox);
$controllers.addEventListener('click', handleCheckedBox);
$duelists.addEventListener('click', handleCheckedBox);
$initiators.addEventListener('click', handleCheckedBox);
$sentinels.addEventListener('click', handleCheckedBox);

var $checkedBox = document.querySelector('.checked-box');
$checkedBox = $checkedBox.getAttribute('id');

var $viewNodes = document.querySelectorAll('.view');
var $navBar = document.querySelector('.navbar');

$navBar.addEventListener('click', handleViewSwap);

function handleViewSwap(event) {
  if (event.target.matches('.navbar-item') === false) {
    return undefined;
  }
  for (let view = 0; view < $viewNodes.length; view++) {
    $viewNodes[view].classList.add('hidden');
  }
  var $dataViewAttribute = event.target.textContent;
  if ($dataViewAttribute === 'ValoFuze') {
    $dataViewAttribute = 'homepage';
  }
  $dataViewAttribute = $dataViewAttribute.toLowerCase();
  var $apiValue = $dataViewAttribute;
  $dataViewAttribute = '[data-view=' + $dataViewAttribute + ']';
  $dataViewAttribute = document.querySelector($dataViewAttribute);
  $dataViewAttribute.classList.remove('hidden');

  if ($apiValue === 'homepage') {
    return undefined;
  } else if ($apiValue === 'agents') {
    var $allCheckboxes = document.querySelectorAll('.checkbox');
    for (let checkbox = 0; checkbox < $allCheckboxes.length; checkbox++) {
      $allCheckboxes[checkbox].classList.remove('checked-box');
    }
    var $noFilterCheckbox = document.querySelector('.checkbox-no-filter');
    $noFilterCheckbox.classList.add('checked-box');
  }
  useApi($apiValue);

}

var $agentsTable = document.querySelector('.agents-table');

function useApi(value) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://valorant-api.com/v1/' + value);
  xhr.responseType = 'json';
  if (value === 'agents') {
    xhr.addEventListener('load', function () {
      var $tbody = document.querySelector('tbody');
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
          var $newPortraitFrame = document.createElement('div');
          $newPortraitFrame.setAttribute('class', 'table-portrait');

          $newAgentProfileUrl.setAttribute('src', xhr.response.data[agent].killfeedPortrait);
          $newPortraitFrame.appendChild($newAgentProfileUrl);
          $newAgentProfile.appendChild($newPortraitFrame);
          $newAgentName.textContent = xhr.response.data[agent].displayName;
          $newAgent.appendChild($newAgentName);
          $newAgent.appendChild($newAgentProfile);

          $newTbody.appendChild($newAgent);

        } else if (xhr.response.data[agent].isPlayableCharacter === true && xhr.response.data[agent].role.displayName === $checkedBox) {
          $newAgent = document.createElement('tr');
          $newAgentName = document.createElement('td');
          $newAgentProfile = document.createElement('td');
          $newAgentProfileUrl = document.createElement('img');
          $newPortraitFrame = document.createElement('div');
          $newPortraitFrame.setAttribute('class', 'table-portrait');

          $newAgentProfileUrl.setAttribute('src', xhr.response.data[agent].killfeedPortrait);
          $newPortraitFrame.appendChild($newAgentProfileUrl);
          $newAgentProfile.appendChild($newPortraitFrame);
          $newAgentName.textContent = xhr.response.data[agent].displayName;
          $newAgent.appendChild($newAgentName);
          $newAgent.appendChild($newAgentProfile);

          $newTbody.appendChild($newAgent);

        }
      }
      $agentsTable.appendChild($newTbody);
    });
  }

  xhr.send();
}
