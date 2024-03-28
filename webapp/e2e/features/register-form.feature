Feature: Registering a new user

Scenario: The user is not registered in the site
  Given An unregistered user
  When I fill the data in the form and press submit
  Then A confirmation message should be shown in the screen

Scenario: The user is not registered in the site ant tries to register with invalid password letters
  Given An unregistered user
  When I fill the data in the form with an invalid password letters and press submit
  Then A error message should be shown in the screen

Scenario: The user is not registered in the site ant tries to register with invalid password length
  Given An unregistered user
  When I fill the data in the form with an invalid password length and press submit
  Then A error message should be shown in the screen