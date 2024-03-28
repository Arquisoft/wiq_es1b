Feature: A registered user logs in

Scenario: The user is registered in the site
  Given A registered user
  When I fill the data in the form and press submit
  Then The Home is shown in the screen