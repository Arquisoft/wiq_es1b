Feature: Registering a new user with a password with invalid length <8

Scenario: The user is not registered in the site ant tries to register with invalid password letters
  Given An unregistered user
  When I fill the data in the form with an invalid password letters and press submit
  Then A error message should be shown in the screen