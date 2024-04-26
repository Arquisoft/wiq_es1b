Feature: A registered user goes to see their record

Scenario: The registered user goes to see their record and has no games played
  Given A registered user
  When I log in, go to the record section
  Then There are no games shown as i dont have any

Scenario: The registered user goes to see their record and has some games played
  Given A registered user
  When I log in, go to the record section
  Then The games i played are shown