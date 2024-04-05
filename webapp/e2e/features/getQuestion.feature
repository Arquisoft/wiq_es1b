Feature: A registered user plays

Scenario: The registered user answers one question right
  Given A registered user
  When I log in, start a new game and answer one question right
  Then The congratulation message is shown after answering question

Scenario: The registered user answers one question wrong
  Given A registered user
  When I log in, start a new game and answer one question wrong
  Then The you lost message is shown after answering question

Scenario: The registered user doesnt answer a question in time
  Given A registered user
  When I log in, start a new game and dont answer a question in time
  Then The time lost message is shown

Scenario: The registered user answers one question right and one wrong
  Given A registered user
  When I log in, start a new game and answer one question right and one wrong
  Then The congratulation and you lost messages are shown after answering each question