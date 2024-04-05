Feature: A registered user plays

Scenario: The registered user answers the questions right
  Given A registered user
  When I log in, start a new game and answer all questions right
  Then The congratulation message is shown in each question and the end message is shown

Scenario: The registered user answers the questions wrong
  Given A registered user
  When I log in, start a new game and answer all questions wrong
  Then The sorry message is shown in each question and the end message is shown

Scenario: The registered user doesnt answer a question in time
  Given A registered user
  When I log in, start a new game and dont answer a question in time
  Then The time lost message is shown

Scenario: The registered user answers some questions right and some wrong
  Given A registered user
  When I log in, start a new game and answer some questions right and some wrong
  Then The congratulation and sorry messages are shown in each question and the end message is shown