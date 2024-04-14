Feature: A registered user logs in

Scenario: The user is registered in the site
  Given A registered user
  When I fill the data in the form and press submit
  Then The Home is shown in the screen

Scenario: The user is registered in the site, uses wrong password
  Given A registered user
  When I fill the data in the form with invalid password and press submit
  Then A error message should be shown in the screen
