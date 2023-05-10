import React from 'react'

const AgentsList = () => {
  return (
     <>
        <div class="row wrap">
          <div class="col-full">
            <p class="homepage-header ta-center">Agents</p>
          </div>
          <div class="agent-filter-table">
            <div class="row wrap ai-center">
              <div class="col-50 filter-column">
                <div class="filter-option filter-header-container">
                  <h4 class="filter-header">Filter by Role</h4>
                </div>
                <div class="filter-option row ai-center" id="controllers">
                  <div>
                    <div class="checkbox inline-block checkbox-controllers" id="Controller"></div>
                  </div>
                  <div class="role-icon-frame inline-block"><img src="./images/controller-icon.webp" alt="controller icon"></div>
                  <div><label class="label-controllers">Controllers</label></div>
                </div>
                <div class="filter-option row ai-center" id="initiators">
                  <div>
                    <div class="checkbox inline-block checkbox-initiators" id="Initiator"></div>
                  </div>
                  <div class="role-icon-frame inline-block"><img src="./images/initiator-icon.webp" alt="initiator icon"></div>
                  <div><label class="label-initiators">Initiators</label></div>
                </div>
              </div>
              <div class="col-50 second-filter-col">
                <div class="filter-option row ai-center" id="no-filter">
                  <div>
                    <div class="checkbox checked-box inline-block checkbox-no-filter" id="none"></div>
                  </div>
                  <div><label class="label-no-filter">No Filter</label></div>
                </div>
                <div class="filter-option row ai-center" id="duelists">
                  <div>
                    <div class="checkbox inline-block checkbox-duelists" id="Duelist"></div>
                  </div>
                  <div class="role-icon-frame inline-block"><img src="./images/duelist-icon.webp" alt="duelist icon"></div>
                  <div><label class="label-duelists">Duelists</label></div>
                </div>
                <div class="filter-option row ai-center" id="sentinels">
                  <div>
                    <div class="checkbox inline-block checkbox-sentinels" id="Sentinel"></div>
                  </div>
                  <div class="role-icon-frame inline-block"><img src="./images/sentinel-icon.webp" alt="sentinel icon"></div>
                  <div><label class="label-sentinels">Sentinels</label></div></div>
              </div>
            </div>
          </div>
          <div class="col-full">
            <table class="agents-table col-full">
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Portrait</td>
                </tr>
              </thead>

            </table>
          </div>
        </div>
      </>
  )
}

export default AgentsList
